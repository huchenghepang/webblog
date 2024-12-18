const path = require("path")
const pool = require("../db/mysqlpool")
const fs = require("fs");
const SparkMD5 = require("spark-md5");
const { getFileInfo } = require("../utils/getFileInfo");
const moment = require("moment");
const generateSummaryAndTOC = require("../utils/markdown");


// 指定文件存放目录
const fileSaveToc = path.join(__dirname, "../files/notes/")

/**
 * 将文本内容保存到文件中
 * @param {string} text - 要保存的文本内容
 * @returns {Promise<Object>} - 包含文件信息的对象，如果保存失败则抛出错误
 */
function saveTextToFile(text) {
    if (!text) return Promise.resolve(null);
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        try {
            // 使用 SparkMD5 得到文本的唯一 ID
            const hash = SparkMD5.hash(text);

            // 得到文本的存储位置，储存为 md 格式
            const noteSaveLocation = path.join(fileSaveToc, `${hash}.md`);

            // 写入文件
            fs.writeFile(noteSaveLocation, text, 'utf8', async (err) => {
                if (err) {
                    reject(new Error(`写入文件出错：${err.message}`));
                    return;
                }

                try {
                    // 获取文件信息
                    const fileInfo = await getFileInfo(noteSaveLocation);
                    fileInfo.file_id = hash; // 添加唯一 ID
                    resolve(fileInfo); // 返回文件信息
                } catch (fileError) {
                    reject(new Error(`获取文件信息失败：${fileError.message}`));
                }
            });
        } catch (error) {
            reject(new Error(`无法处理文本：${error.message}`));
        }
    });
}


/* 添加笔记 */
async function addNoteHandler({ name, summary, text, categoryId, isArchived, tags }, res) {
    try {
        const fileInfo = await saveTextToFile(text);
        const {
            file_path,
            file_ext,
            file_createtime,
            file_type,
            file_size,
            file_id
        } = fileInfo
        // 创建连接
        const connection = await pool.getConnection();
        let sql = `
                    INSERT INTO files_info 
                    (file_name, file_id, file_path, file_ext, file_createtime, file_type, file_fullname, file_size) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    file_path = VALUES(file_path),
                    file_ext = VALUES(file_ext),
                    file_createtime = VALUES(file_createtime),
                    file_type = VALUES(file_type),
                    file_fullname = VALUES(file_fullname),
                    file_size = VALUES(file_size)
                `;

        /* 储存相对路径 */
        const relativePath = path.relative(process.cwd(),file_path);            
        const [result] = await connection.execute(sql, [
            name,
            file_id,
            relativePath,
            file_ext,
            file_createtime,
            file_type,
            name + file_ext,
            file_size
        ]);
        if (result.affectedRows > 0) {
            // 保存笔记的信息
            // 构建SQL查询
            const sql = 'Call addNoteWithInfo(?,?,?,?,?,?,?,?);'
            // 将毫秒级别的时间戳转换为YYYY-MM-DD HH:mm:ss
            const dateTime = moment(file_createtime).format('YYYY-MM-DD HH:mm:ss');
            const { toc } = await generateSummaryAndTOC({ filePath: file_path, content: text });
            const tagString = tags.join(",")
            const [result] = await connection.execute(sql, [name, categoryId, file_id, dateTime, tagString, isArchived, summary, toc]);
            if (result.affectedRows > 0) {
                res.sendResponse('保存笔记成功', { fileId: file_id, fileName: name, noteId: result.insertId })
                connection.release()
            } else {
                connection.release()
                res.sendError("保存笔记失败")
            }
        } else {
            connection.release()
            res.sendError("保存笔记失败")
        }
    } catch (error) {
        console.log(error)
        if (error.code == "ER_DUP_ENTRY" && error.errno == 1062) {
            return res.sendError("该文章已存在");
        }
        res.sendError("保存笔记失败")
    }

}



/* 更新完成需要找到旧的文件，然后删除旧文件 */
function findFileAndDeleteFileSync(fileId) {
    try {
        // 拼接文件路径
        const filePath = path.join(fileSaveToc, `${fileId}.md`);
        // console.log(`尝试删除文件: ${filePath}`);

        // 同步删除文件
        fs.unlinkSync(filePath);
        // console.log(`文件已删除: ${filePath}`);
        return { success: true };
    } catch (error) {
        if (error.code === "ENOENT") {
            // console.log(`文件不存在: ${filePath}`);
            return { success: true, reason: "文件不存在" };
        }
        // console.error(`删除文件失败: ${filePath}`, error);
        return { success: false, reason: `删除失败: ${error.message}` };
    }
}
/* 移除数据库中的旧文件数据 */
async function removeFileInfo(fileId, connection) {
    try {
        const sql = `DELETE FROM files_info WHERE file_id = ?`
        const [result] = await connection.query(sql, [fileId]);
        if (result.affectedRows > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new Error('移除失败')
    }
}

/* 更新标签信息 */
async function updateNoteTags(noteId, newTags, connection) {
    const tagsJson = JSON.stringify(newTags);
    // const connection = await pool.getConnection()
    try {
        // 开启事务
        await connection.beginTransaction();

        // 插入新标签:对于新的数据插入，对于重复的数据不会插入 
        await connection.query(`
            INSERT INTO tags (name)
            SELECT tag_name
            FROM JSON_TABLE(?, '$[*]' COLUMNS(tag_name VARCHAR(255) PATH '$')) AS tag_data
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
        `, [tagsJson]);

        //  获取标签 ID
        const [tags] = await connection.query(`
            SELECT id
            FROM tags
            WHERE name COLLATE utf8mb4_unicode_ci IN (
                SELECT tag_name COLLATE utf8mb4_unicode_ci
                FROM JSON_TABLE(?, '$[*]' COLUMNS(tag_name VARCHAR(255) PATH '$')) AS tag_data
            );
        `, [tagsJson]);

        const tagIds = tags.map(tag => tag.id);

        // Step 3: 删除旧关系
        await connection.query(`
            DELETE FROM note_tags
            WHERE note_id = ?
              AND tag_id NOT IN (?);
        `, [noteId, tagIds]);

        // Step 4: 插入新关系
        const values = tagIds.map(tagId => [noteId, tagId]);
        await connection.query(`
            INSERT INTO note_tags (note_id, tag_id)
            VALUES ?
            ON DUPLICATE KEY UPDATE note_id = note_id;
        `, [values]);

        // 提交事务
        await connection.commit();
        return true
    } catch (error) {
        console.log(error)
        // 如果出现错误，回滚事务
        await connection.rollback();
        throw error; // 将错误抛出
    }
};

/* 编辑更新笔记内容 */
async function updateNoteHandler({ noteId, fileId, name, summary, text, categoryId, isArchived, tags }, res) {
    // 创建连接
    const connection = await pool.getConnection();
    try {
        const fileInfo = await saveTextToFile(text);
        const {
            file_path,
            file_ext,
            file_createtime,
            file_type,
            file_size,
            file_id
        } = fileInfo;
        const isfileChange = fileId !== file_id ? true : false;



        if (isfileChange) {
            let sql = `
                    INSERT INTO files_info 
                    (file_name, file_id, file_path, file_ext, file_createtime, file_type, file_fullname, file_size) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    file_path = VALUES(file_path),
                    file_ext = VALUES(file_ext),
                    file_createtime = VALUES(file_createtime),
                    file_type = VALUES(file_type),
                    file_fullname = VALUES(file_fullname),
                    file_size = VALUES(file_size)
             `;
            /* 如果新旧内容变化了 */
            const [result] = await connection.execute(sql, [
                name,
                file_id,
                file_path,
                file_ext,
                file_createtime,
                file_type,
                name + file_ext,
                file_size
            ]);
            if (result.affectedRows > 0) {
                // 更新笔记的信息
                // 构建SQL查询
                const sql = `UPDATE notes 
                SET name = ?,
                category_id = ?,
                file_id = ?,
                is_archive = ?,
                summary = ?,
                toc = ?
                WHERE id = ?`
                const { toc } = generateSummaryAndTOC({ filePath: file_path, content: text })
                const [result] = await connection.execute(sql, [name, categoryId, file_id, isArchived, summary, toc, noteId]);
                const isChangeTags = await updateNoteTags(noteId, tags, connection)
                if (result.affectedRows > 0 && isChangeTags) {
                    res.sendResponse('更新笔记成功', { fileId: file_id, fileName: name, noteId });
                    /* 删除旧的笔记数据 */
                    try {
                        findFileAndDeleteFileSync(fileId);
                        await removeFileInfo(fileId, connection)
                    } catch (error) {
                    }

                } else {
                    res.sendError("更新笔记失败")
                }
            } else {
                res.sendError("更新笔记时处理内容失败")
            }
        } else {
            /* 如果新旧内容没有变化，只保存更新笔记信息 */
            // 更新笔记的信息
            // 构建SQL查询
            const sql = `UPDATE notes 
                SET name = ?,
                category_id = ?,
                file_id = ?,
                is_archive = ?,
                summary = ?,
                toc = ?
                WHERE id = ?`
            const { toc } = generateSummaryAndTOC({ filePath: file_path, content: text })
            const [result] = await connection.execute(sql, [name, categoryId, file_id, isArchived, summary, toc, noteId]);
            const isChangeTags = await updateNoteTags(noteId, tags, connection)
            if (result.affectedRows > 0 && isChangeTags) {
                res.sendResponse('更新笔记成功', { fileId: file_id, fileName: name, noteId });

            } else {
                res.sendError("更新笔记失败")
            }
        }
    } catch (error) {
        console.log(error)
        if (error.code == "ER_DUP_ENTRY" && error.errno == 1062) {
            return res.sendError("该文章已存在");
        }
        res.sendError("保存笔记失败")
    } finally {
        connection.release()
    }
}

/* 删除笔记 */
async function deleteNoteHandler({ noteId, fileId }, res) {
    const connection = await pool.getConnection()
    try {
        /* 根据笔记的ID删除笔记 */
        const sql = `DELETE FROM notes WHERE id = ?`
        const [result] = await connection.execute(sql, [noteId])
        if (result.affectedRows > 0) {
            /* 根据文件的ID删除文件 */
            removeFileInfo(fileId, connection);
            const { success } = findFileAndDeleteFileSync(fileId);
            if (success) {
                res.sendResponse("删除文章成功")
            } else {
                res.sendError("删除文章失败", 500)
            }
        } else {
            res.sendError("删除文章失败", 500)
        }
    } catch (error) {
        res.sendError("删除文章失败", 500)
    } finally {
        connection.release();
    }

}

/* 切换归档状态 */
async function toggleNoteAechiveHandler({ noteId, isArchived }, res) {
    try {
        const sql = `UPDATE notes SET is_archive = ? WHERE id = ? `;
        const isArchiveStatus = isArchived?1:0;
        // console.log(isArchiveStatus)
        // console.log(noteId)
        const [result] = await pool.query(sql, [isArchiveStatus, noteId])
        if (result.affectedRows > 0) {
            res.sendResponse(isArchived ? "已归档，成功" : "取消归档，成功")
        } else {
            res.sendError("操作失败", 500)
        }
    } catch (error) {
        console.log(error)
        res.sendError("操作失败，出现错误", 500)
    }
}




/* 获取文章列表 */
async function getNotesByPageLimitHandler({ page, limit }, res) {
    const connection = await pool.getConnection();
    try {
        const [totalRows] = await connection.query(`SELECT count(*) as total FROM notes`);
        const totalRecords = totalRows[0]['total'];
        // 计算总页数
        const totalPages = Math.ceil(totalRecords / limit);
        // 计算偏移量
        let offset = (page - 1) * limit;
        if (page > totalPages) {
            page = 1;
            offset = 0
        }
        const sql = `SELECT 
        n.id as id,
        n.name as name,
        n.category_id as categoryId,
        n.file_id as fileId,
        n.create_time as createTime,
        n.is_archive as isArchive,
        n.reading,
        n.updated_time as updatedTime,
        a.name as categoryName
        FROM notes n LEFT JOIN article_categories a ON n.category_id = a.id 
        ORDER BY n.updated_time DESC 
        LIMIT ?
        OFFSET ?
        `;
        const [rows] = await connection.query(sql, [limit, offset]);
        res.sendResponse("成功获取数据", {
            notes: rows,
            currentPage: page,
            totalPages,
            totalRecords
        })

    } catch (error) {
        console.log(error)
        res.sendError("发生错误")
    } finally {
        connection.release()
    }
}



/* 根据文章的id获取文章的标签信息 */
async function getNoteTagsByNoteIdHandler(noteId, res) {
    try {
        const sql = ` SELECT n.note_id as noteId,n.tag_id as tagId,t.name as tagName 
        FROM note_tags n LEFT JOIN tags t ON n.tag_id = t.id WHERE n.note_id = ?`;
        const [rows] = await pool.query(sql, noteId);
        res.sendResponse("成功获取数据", rows)
    } catch(error) {
        console.log(error)
        res.sendError("发生错误")
    }
}

/* 根据文章的noteId获取文档的内容 管理员权限*/
/**
 * 根据noteId读取笔记的内容
 * @date 2024-11-05 01:09:54
 * @author jeff-护城河
 *
 * @async
 * @param {*} fileId - 文件id
 * @returns {string} content -- 笔记的内容
 * @example 示例
 */
async function readContentNoteHandler(noteId){
    try {
        // 找到从数据库中找到文件
        const connection = await pool.getConnection();
        const sql = `
        SELECT 
          f.file_name as fileName,
          f.file_id as fileId,
          f.file_path as filePath,
          f.file_ext as fileExt,
          f.file_createtime as fileCreatetime,
          f.file_type as fileType,
          f.file_fullname as fileFullname,
          n.name,
          n.is_archive as isArchive,
          n.summary,
          n.create_time as createTime,
          n.updated_time as updatedtime,
          n.id as noteId,
          n.reading,
          c.id as categoryId,
          c.name as categoryName
        FROM 
            notes n 
        LEFT JOIN 
            files_info f
        ON 
          f.file_id = n.file_id
         LEFT JOIN 
            article_categories c
        ON 
          n.category_id = c.id
        WHERE 
          n.id = ?;
      `;
        const [rows] = await connection.query(sql,[noteId]);
        // 释放连接
        connection.release();
        if(rows.length>0){
            const data = rows[0];
            /* 转换时间格式 */
            // 读取md格式的笔记
            const content = fs.readFileSync(data.filePath, 'utf8');
            return {
                ...data,
                content
            };
        }else{
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports = {
    addNoteHandler,
    updateNoteHandler,
    deleteNoteHandler,
    toggleNoteAechiveHandler,
    getNotesByPageLimitHandler,
    getNoteTagsByNoteIdHandler,
    readContentNoteHandler
}