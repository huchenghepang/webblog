const pool = require("../db/mysqlpool");
const { addCommentSchema, deleteCommentSchema, editCommentSchema, auditCommentSchema, queryCommentSchema, deleteCommentsSchema, auditCommentsSchema, likeCommentSchema, adminGetCommentsSchema } = require("../schema/comment");



// 新增评论接口
async function addCommentHandler(req, res) {
    const { articleId, userId, parentId, content } = req.body;
    // 数据验证
    const { error } = addCommentSchema.validate({
        articleId,
        userId,
        parentId,
        content,
    });
    if (error) {
        return res.sendError(error.details[0].message)
    }
    try {
        // 插入评论数据
        const result = await pool.query(
            `INSERT INTO comments (article_id, user_id, parent_id, content, status) 
         VALUES (?, ?, ?, ?, ?)`,
            [articleId, userId, parentId, content, 'pending']
        );
        res.sendResponse("添加评论成功");
    } catch (error) {
        console.error(error);
        res.sendError("添加评论失败", 500)
    }
};


/* 删除评论  递归删除评论和子评论*/

async function deleteCommentAndChildren(commentId, connection) {
    try {
        // 删除该评论的所有子评论
        await connection.query('DELETE FROM comments WHERE parent_id = ?', [commentId]);

        // 获取该评论的所有子评论的 comment_id
        const [rows] = await connection.query('SELECT comment_id FROM comments WHERE parent_id = ?', [commentId]);

        // 递归删除每个子评论
        for (let row of rows) {
            await deleteCommentAndChildren(row.comment_id, connection);
        }

        // 删除该评论本身
        await connection.query('DELETE FROM comments WHERE comment_id = ?', [commentId]);

    } catch (error) {
        console.error('递归删除评论出错:', error);
        throw error;
    }
}


async function deleteCommentHandler(req, res) {
    const { commentId, userId } = req.body;
    const { error } = deleteCommentSchema.validate({ commentId, userId });
    if (error) {
        return res.sendError(error.details[0].message);
    }

    const connection = await pool.getConnection(); // 获取一个连接

    try {
        // 开始事务
        await connection.beginTransaction();

        // 检查用户是否是评论的作者
        const [existingComment] = await connection.query(
            `SELECT * FROM comments WHERE comment_id = ? AND user_id = ?`,
            [commentId, userId]
        );

        if (existingComment.length === 0) {
            return res.sendError('没有找到评论或者你没有删除该评论的权限', 404);
        }

        // 递归删除评论及其所有子评论
        await deleteCommentAndChildren(commentId, connection);

        // 提交事务
        await connection.commit();

        res.sendResponse("删除评论成功");
    } catch (error) {
        console.error(error);
        // 回滚事务
        await connection.rollback();
        res.sendError('删除评论出错', 500);
    } finally {
        // 释放连接
        connection.release();
    }
}



// 编辑评论接口
async function editCommentHandler(req, res) {
    const { commentId, userId, content } = req.body;

    const { error } = editCommentSchema.validate({ commentId, userId, content })
    if (error) {
        return res.sendError(error.details[0].message)
    }
    try {
        // 检查用户是否是评论的作者
        const [existingComment] = await pool.query(
            `SELECT * FROM comments WHERE comment_id = ? AND user_id = ?`,
            [commentId, userId]
        );

        if (existingComment.length === 0) {
            return res.sendError('没有找到评论或者你没有删除该评论的权限', 404);
        }

        // 更新评论内容
        await pool.query(
            `UPDATE comments SET content = ? WHERE comment_id = ?`,
            [content, commentId]
        );

        res.sendResponse("更新评论成功")
    } catch (error) {
        console.error(error);
        res.sendError('更新评论出错', 500);
    }
};


// 审核评论接口
async function auditCommentHandler(req, res) {
    /* 审核的权限 */
    const { commentId, status } = req.body;

    const { error } = auditCommentSchema.validate({ commentId, status })
    if (error) {
        return res.sendError(error.details[0].message)
    }
    try {

        // 更新评论状态
        await pool.query(
            `UPDATE comments SET status = ? WHERE comment_id = ?`,
            [status, commentId]
        );

        res.sendResponse("审核评论成功")
    } catch (error) {
        console.error(error);
        res.sendError("审核出错", 500)
    }
};


// 根据文章查询评论接口
async function getCommentsByArticleHandler(req, res) {
    const { articleId, status = 'approved' } = req.body;
    const { error } = queryCommentSchema.validate({ articleId, status })
    if (error) {
        return res.sendError(error.details[0].message)
    }
    try {
        const [comments] = await pool.query(
            `SELECT 
                c.comment_id AS commentId,
                c.article_id AS articleId,
                c.user_id AS userId,
                u.username AS userName,
                c.parent_id AS parentId,
                c.content AS content,
                c.created_at AS createdDateTime,
                c.updated_at AS updatedDateTime,
                c.status AS status,
                c.like_count AS likeCount,
                c.reply_count AS replyCount,
                n.name AS articleTitle,
                n.file_id AS articleFileId,
                parent_user.username AS parentUserName,  -- 获取父评论的用户名
                parent_user.user_id AS parentUserId  -- 获取父评论的用户ID
            FROM comments c  
            LEFT JOIN notes n 
                ON c.article_id = n.id 
            LEFT JOIN user_info u 
                ON c.user_id = u.user_id
            LEFT JOIN comments parent_comment 
                ON c.parent_id = parent_comment.comment_id  -- 自连接，获取父评论信息
            LEFT JOIN user_info parent_user 
                ON parent_comment.user_id = parent_user.user_id  -- 获取父评论用户的用户名
            WHERE c.article_id = ? 
                AND c.status in (?,?) 
            ORDER BY c.created_at DESC;

            `,
            [articleId, status, 'pending']
        );

        res.sendResponse("获取评论成功", comments);
    } catch (error) {
        console.error(error);
        res.sendError("获取评论出错", 500)
    }
};

// 查询用户所有评论接口
async function getCommentsByUserHandler(req, res) {
    const { userId } = req.body;
    if (!userId || typeof userId !== "string") {
        return res.sendError("userId是必须的", 400);  // 400是常见的请求参数错误码
    }
    try {
        const [comments] = await pool.query(
            `SELECT 
                c.comment_id AS commentId,
                c.article_id AS articleId,
                c.user_id AS userId,
                u.username AS userName,
                c.parent_id AS parentId,
                c.content AS content,
                c.created_at AS createdDateTime,
                c.updated_at AS updatedDateTime,
                c.status AS status,
                c.like_count AS likeCount,
                c.reply_count AS replyCount,
                n.name AS articleTitle,
                n.file_id AS articleFileId,
                parent_user.username AS parentUserName,  -- 获取父评论的用户名
                parent_user.user_id AS parentUserId  -- 获取父评论的用户ID
            FROM comments c  
            LEFT JOIN notes n 
                ON c.article_id = n.id 
            LEFT JOIN user_info u 
                ON c.user_id = u.user_id
            LEFT JOIN comments parent_comment 
                ON c.parent_id = parent_comment.comment_id  -- 自连接，获取父评论信息
            LEFT JOIN user_info parent_user 
                ON parent_comment.user_id = parent_user.user_id  -- 获取父评论用户的用户名
            WHERE c.user_id = ?  -- 你自己的评论
            OR c.parent_id IN (SELECT comment_id FROM comments WHERE user_id = ?)  -- 别人评论你的评论
            ORDER BY c.created_at DESC;`,
            [userId, userId]
        );
        res.sendResponse("获取评论成功", comments);
    } catch (error) {
        console.error(error);
        res.sendError("获取评论出错", 500);
    }
};



async function getCommentsByAdminHandler(req, res) {
    // 数据验证
    const { value: { page, limit, status }, error } = adminGetCommentsSchema.validate(req.body) ;

    if (error) {
        return res.sendError(error.details[0].message);
    }

    try {
        const offset = (page - 1) * limit;

        // 动态拼接状态过滤条件
        let statusCondition = "";
        const queryParams = [];
        if (status && status.length > 0) {
            statusCondition = `WHERE c.status IN (${status.map(() => "?").join(", ")})`;
            queryParams.push(...status);
        }

        // 添加分页参数
        queryParams.push(limit, offset);

        // 查询评论数据
        const [data] = await pool.query(
            `SELECT SQL_CALC_FOUND_ROWS 
                c.comment_id AS commentId,
                c.article_id AS articleId,
                c.user_id AS userId,
                u.username AS userName,
                c.parent_id AS parentId,
                c.content AS content,
                c.created_at AS createdDateTime,
                c.updated_at AS updatedDateTime,
                c.status AS status,
                c.like_count AS likeCount,
                c.reply_count AS replyCount,
                n.name AS articleTitle,
                n.file_id AS articleFileId,
                parent_user.username AS parentUserName,  -- 获取父评论的用户名
                parent_user.user_id AS parentUserId  -- 获取父评论的用户ID
            FROM comments c  
            LEFT JOIN notes n 
                ON c.article_id = n.id
            LEFT JOIN user_info u 
                ON c.user_id = u.user_id
            LEFT JOIN comments parent_comment 
                ON c.parent_id = parent_comment.comment_id  -- 自连接，获取父评论信息
            LEFT JOIN user_info parent_user 
                ON parent_comment.user_id = parent_user.user_id  -- 获取父评论用户的用户名
            ${statusCondition}
            ORDER BY c.created_at DESC
            LIMIT ? OFFSET ?;`,
            queryParams
        );

        // 查询总记录数
        const [[{ total }]] = await pool.query(`SELECT FOUND_ROWS() AS total;`);

        // 返回响应
        res.sendResponse("获取评论成功", {
            totalRecords: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data,
        });
    } catch (error) {
        console.log(error);
        res.sendError("获取评论数据出错", 500);
    }
}

/* 管理员删除评论 */
async function deleteCommentsAdminHandler(req, res) {


    // 确保传递的是一个非空数组
    const { value: { commentIds }, error } = deleteCommentsSchema.validate(req.body);
    if (error) {
        return res.sendError(error.details[0].message)
    }

    // 验证管理员权限
    try {
        // SQL 查询：批量删除评论
        const [result] = await pool.query(
            'DELETE FROM comments WHERE comment_id IN (?)',
            [commentIds]
        );
        // console.log(commentIds)
        if (result.affectedRows === 0) {
            // 如果没有评论被删除，返回错误
            return res.sendError("删除失败");
        }

        // 返回删除成功的响应
        return res.sendResponse(`成功删除了${result.affectedRows}评论`, { affectedRows: result.affectedRows });
    } catch (error) {
        // 捕获 SQL 错误
        console.error(error);
        return res.sendError('删除出错')
    }
}


/* 批量审核评论 */

async function auditCommentsAdminHandler(req, res) {
    const { commentIds, status } = req.body;

    // 校验传入的参数 commentIds 和 status
    const { error } = auditCommentsSchema.validate({ commentIds, status });
    if (error) {
        return res.sendError(error.details[0].message);
    }

    try {
        // 更新评论状态
        const [result] = await pool.query(
            `UPDATE comments SET status = ? WHERE comment_id IN (?)`,
            [status, commentIds]
        );

        if (result.affectedRows === 0) {
            return res.sendError("没有找到需要审核的评论", 404);
        }

        if (status === 'approved') {
            res.sendResponse(`成功审核了 ${result.affectedRows} 条评论`, { affectedRows: result.affectedRows });
        } else if (status === 'rejected') {
            res.sendResponse(`${result.affectedRows} 条评论审核不通过`, { affectedRows: result.affectedRows });
        } else {
            res.sendResponse(`${result.affectedRows} 条评论设置为了待审核`, { affectedRows: result.affectedRows });
        }

    } catch (error) {
        console.error(error);
        res.sendError("批量审核出错", 500);
    }
}



// 点赞或取消点赞处理函数
async function toggleCommentLike(req, res) {

    const { value: { commentId, userId }, error } = likeCommentSchema.validate(req.body)

    // 校验传入的 commentId 是否存在
    if (error) {
        return res.sendError(error.details[0].message);
    }
    const connection = await pool.getConnection()
    try {
        // 检查用户是否已经对该评论点赞
        const [existingLike] = await connection.query(
            'SELECT * FROM comment_likes WHERE user_id = ? AND comment_id = ?',
            [userId, commentId]
        );

        if (existingLike.length > 0) {
            // 如果已经点赞，则取消点赞
            await connection.query(
                'DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?',
                [userId, commentId]
            );

            // 更新评论的 like_count
            await connection.query(
                'UPDATE comments SET like_count = like_count - 1 WHERE comment_id = ?',
                [commentId]
            );

            return res.sendResponse('取消点赞成功', { action: 'unlike' });
        } else {
            // 如果未点赞，则添加点赞记录
            await connection.query(
                'INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)',
                [userId, commentId]
            );

            // 更新评论的 like_count
            await connection.query(
                'UPDATE comments SET like_count = like_count + 1 WHERE comment_id = ?',
                [commentId]
            );

            return res.sendResponse('点赞成功', { action: 'like' });
        }
    } catch (error) {
        console.error(error);
        return res.sendError('操作失败', 500);
    } finally {
        connection.destroy()
    }
}


/* 查询多少条评论还没有审核 */
async function getPendingCommentsCount(req,res){
    try {
        // 查询数据库
        const sql = "SELECT COUNT(*) AS pendingCount FROM comments WHERE status = 'pending'";
        const [rows] = await pool.query(sql);

        // 返回查询结果
        res.sendResponse("获取未审核评论数量成功",rows[0].pendingCount)
    } catch (error) {
        // 错误处理
        res.sendError( "查询未审核评论数量失败",500);
    }
};

module.exports = {
    addCommentHandler,
    deleteCommentHandler,
    editCommentHandler,
    getCommentsByArticleHandler,
    getCommentsByUserHandler,
    auditCommentHandler,
    getCommentsByAdminHandler,
    deleteCommentsAdminHandler,
    auditCommentsAdminHandler,
    toggleCommentLike,
    getPendingCommentsCount
}

