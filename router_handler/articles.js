const fs = require('fs-extra')
const pool = require("../db/mysqlpool");
const generateSummaryAndTOC = require('../utils/markdown');
const path = require('path');


/**
 * 添加文章的处理器
 * @date 2024-11-04 04:29:52
 * @author jeff-护城河
 *
 * @async
 * @param {{ noteName: any; Tags: any; datetime: any; category: any; fileId: any; isArchive: any; }} param0
 * @param {*} param0.noteName
 * @param {*} param0.Tags
 * @param {*} param0.datetime
 * @param {*} param0.category
 * @param {*} param0.fileId
 * @param {*} param0.isArchive
 * @param {*} res
 * @returns {unknown}
 * @example 示例
 */
async function addarticleHandler({ noteName, Tags, datetime, category, fileId, isArchive }, res) {
    // 连接数据库
    try {
        const connection = await pool.getConnection();
        /* 读取文件的摘要和目录 */
        const filePath = path.join(__dirname,`../files/notes/${fileId}.md`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const {toc,summary} =  generateSummaryAndTOC({content: fileContent});
        // console.log(toc)
        // console.log(summary)
        // 构建SQL查询
        const sql = 'Call addNoteWithInfo(?,?,?,?,?,?,?,?);'
        const [result] = await connection.execute(sql, [noteName, category, fileId, datetime, Tags, isArchive,summary,toc]);
        res.sendResponse('添加文章成功');
        connection.release();
        return true
    } catch (error) {
        
        if (error.errno == 1062) {
            res.sendResponse('文章已存在');
            return
        } else {
            res.sendError('添加文章失败', 500);
            return 
        }

    }
}

async function getArticleListHandler({ page, pageSize, keyword, tagName, datetimeStart, datetimeEnd, categoryName }, res) {
    try {
        const connection = await pool.getConnection();
        let sql = null;
        if (keyword) {
            // 关键字 标题查询
            sql = 'SELECT getNotesWithTagsByName_JSON(?,?,?) as artcileList;';
            const [result] = await connection.execute(sql, [keyword,page, pageSize]);
            res.sendResponse('获取文章成功', result[0].artcileList);
        } else if (tagName) {
            // 标签查询
            sql = 'SELECT getNotesWithTagsByTag_JSON(?,?,?) as artcileList;';
            const [result] = await connection.execute(sql, [tagName,page,pageSize]);
            res.sendResponse('获取文章成功', result[0].artcileList);
        } else if (datetimeStart && datetimeEnd) {
            // 时间范围查询
            sql = 'SELECT getNotesWithTagsByDateRange_JSON(?,?,?,?) as artcileList;';
            const [result] = await connection.execute(sql, [datetimeStart,datetimeEnd,page, pageSize]);
            res.sendResponse('获取文章成功', result[0].artcileList);
        } else if (categoryName) {
            // 分类查询
            sql = 'SELECT getNotesWithTagsByCategory_JSON(?,?,?) as artcileList;';
            const [result] = await connection.execute(sql, [categoryName,page, pageSize]);

            res.sendResponse('获取文章成功', result[0].artcileList);
        } else if (page && pageSize) {
            // 分页查询
            sql = 'SELECT getNotesWithTags_JSONByPageLimit(?,?) as artcileList;';
            const [result] = await connection.execute(sql, [pageSize, page]);
            res.sendResponse('获取文章成功', result[0].artcileList);
        }
        connection.release();
        return
    }
    catch (error) {
        // console.log(error)
        res.sendError('获取文章失败', 500);
    }
}


async function getArticleAnalyzeDataHandler(req, res) {
    // 获取连接
    try {
        const connection = await pool.getConnection();
        // 构建SQL查询
        const sql = 'Call getNoteCounts_JSON();'
        const [result] = await connection.execute(sql);
        const {tagCounts,noteCounts,categoryCounts} = result[0][0].NoteCounts;
        res.sendResponse('获取文章分析数据成功', { tagCounts, categoryCounts,noteCounts });
        connection.release();
    } catch (error) {
        res.sendError('获取文章分析数据失败', 500);
    }
}

/* 增加阅读量 */
async function addReading(noteId){
    try {
        const sql = "UPDATE notes SET reading = reading + 1 WHERE id = ?";
        const [result] = await pool.query(sql,noteId);
        if(result.affectedRows > 0){
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}


/**
 * 根据文件id读取笔记的内容
 * @date 2024-11-05 01:09:54
 * @author jeff-护城河
 *
 * @async
 * @param {*} fileId - 文件id
 * @returns {string} content -- 笔记的内容
 * @example 示例
 */
async function readContentNoteMDHandler(fileId){
    try {
        // 找到从数据库中找到文件
        const connection = await pool.getConnection();
        const sql = `
        SELECT 
          f.file_name,
          f.file_id,
          f.file_path,
          f.file_ext,
          f.file_createtime,
          f.file_type,
          f.file_fullname,
          n.name,
          n.created_at,
          n.create_time,
          n.updated_time as updatedtime,
          n.id as noteId,
          n.reading
        FROM 
          files_info f
        LEFT JOIN 
          notes n 
        ON 
          f.file_id = n.file_id
        WHERE 
          f.file_id = ? 
          AND n.is_archive = 1;
      `;
        const [rows] = await connection.query(sql,[fileId]);
        // 释放连接
        connection.release();
        if(rows.length>0){
            const {'file_path':path,file_id,file_fullname,file_ext,name,file_createtime,created_at,create_time,updatedtime,reading,noteId} = rows[0];
            /* 转换时间格式 */
            // 读取md格式的笔记
            const content = fs.readFileSync(path, 'utf8');
            return {
                file_id,file_fullname,file_ext,content,name,file_createtime,
                created_at,create_time,
                updatedtime,reading,
                noteId
            };
        }else{
            return {
                name:"文章不存在",
                content:"文章不存在,或者被删除"
            }
        }
    } catch (error) {
        return 
    }
}




module.exports = {
    addarticleHandler,
    getArticleListHandler,
    getArticleAnalyzeDataHandler,
    readContentNoteMDHandler,
    addReading
}