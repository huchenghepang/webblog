const pool = require("../db/mysqlpool");
const { buildTreeFromList } = require("../utils/buildTreeFromList");



/* 获取文章的分类 */

async function getArticleCategoriesInfo(res) {
    try {
        const connection = await pool.getConnection();
        const sql = "SELECT `id`,`name`,`parent_id`,`level`,`slug` FROM article_categories";
        const [rows] = await connection.query(sql);
        if (rows.length > 0) {
            res.sendResponse("获取分类信息成功", rows);
        }
        connection.release();
    } catch (error) {
        console.log(error);
        res.sendError('获取分类数据失败', 500);
    }
}

/* 添加文章的分类 */
async function addCategoriesHanlder({ name, parentId, level }, res) {
    try {
        const connection = await pool.getConnection();
        const sql = "INSERT INTO article_categories(`name`,`parent_id`,`level`) VALUES (?,?,?)";
        const [result] = await connection.execute(sql, [name, parentId, level]);
        res.sendResponse("添加分类成功");
        connection.release()
        return true
    } catch (error) {
        if (error.errno == 1062) {
            res.sendResponse('分类已存在');
            return
        } else {
            res.sendError('添加分类失败', 500);
            return
        }
    }
}

/* 删除文件的分类 */
async function removeCategory(id, res) {
    try {
        const connection = await pool.getConnection();
        const sql = 'DELETE FROM `article_categories` WHERE id = ?';
        const [result] = await connection.execute(sql, [id]); // affectedRows 删除或者添加时受影响的行 大于0表示删除或添加成功
        if (result?.affectedRows > 0) {
            res.sendResponse("删除分类成功");
                connection.release()
                return true
        }else{
            res.sendError('删除分类失败', 500);
            return
        }
    } catch (error) {
        console.log(error)
        if (error.errno == 1062) {
            res.sendResponse('分类已存在');
            return
        } else {
            res.sendError('删除分类失败', 500);
            return
        }
    }
}

/* 更新文章的分类 */
async function updateCategoryHandler({id,name,parentId,level},res){
    try {
        const connection = await pool.getConnection();
        const sql = "UPDATE `article_categories` SET name = ?,parent_id = ?,level = ? WHERE id = ? ";
        const [result] = await connection.execute(sql,[name,parentId,level,id]);
        if (result.affectedRows > 0) {
            res.sendResponse("修改分类成功");
        }
        connection.release();
    } catch (error) {
        console.log(error);
        res.sendError('修改分类失败', 500);
    }
}

module.exports = {
    addCategoriesHanlder,
    getArticleCategoriesInfo,
    removeCategory,
    updateCategoryHandler
}