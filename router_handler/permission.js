const pool = require("../db/mysqlpool");
const {buildTreeFromList}= require("../utils/buildTreeFromList");
const redisClient = require("../db/redis");



// 构建权限树 这个很有意思
const buildPermissionTree = (permissions) => {
    const permissionMap = new Map();

    // 创建一个 ID -> 权限对象的映射
    permissions.forEach(permission => {
        permissionMap.set(permission.permission_id, { ...permission, children: [] });
    });

    // 处理层级关系
    const permissionTree = [];
    permissions.forEach(permission => {
        if (permission.parent_id === null) {
            permissionTree.push(permissionMap.get(permission.permission_id));
        } else {
            const parent = permissionMap.get(permission.parent_id);
            if (parent) {
                parent.children.push(permissionMap.get(permission.permission_id));
            }
        }
    });

    return permissionTree;
};

/* 查询处理处理器 */
async function getPermissionsHandler(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Permissions');
        const permissionTree = buildTreeFromList(rows,'permission_id','parent_id','children')
        res.sendResponse("成功获取到了权限信息", permissionTree);
    } catch (err) {
        console.error(err);
        res.sendError('无法获取到权限信息', 500);
    }
}

/* 插入权限 */

async function addPermissionHandler({ permissionName, description, type, parentId,permissionValue }, res) {
    try {
        const [result] = await pool.query(
            'INSERT INTO Permissions (permission_name, description, type, parent_id,permission_value) VALUES (?, ?, ?, ?,?)',
            [permissionName, description, type, parentId || null,permissionValue]
        );
        res.sendResponse("成功添加权限", { success: true, message: '权限创建成功', insertId: result.insertId });
    } catch (err) {
        console.log(err)
        res.sendError("添加权限失败");
    }
}

/* 更新权限 */
async function updatePermissionHandler(value, id, res) {
    const { permissionName, description, type, parentId, permissionValue } = value;
    const connection = await pool.getConnection(); // 获取数据库连接
    await connection.beginTransaction(); // 开启事务
    try {
        // 1. 获取旧的 permissionValue
        const [rows] = await connection.query(
            'SELECT permission_value FROM Permissions WHERE permission_id = ? FOR UPDATE',
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback();
            return res.sendError('没有找到指定的权限', 404);
        }

        const oldPermissionValue = rows[0].permission_value;

        // 2. 更新权限信息
        const [result] = await connection.query(
            'UPDATE Permissions SET permission_name = ?, description = ?, type = ?, parent_id = ?, permission_value = ? WHERE permission_id = ?',
            [permissionName, description, type, parentId || null, permissionValue, id]
        );

        if (result.affectedRows > 0) {
            // 3. 删除 Redis 中旧的键
            const pattern = `role:*:permissions:${oldPermissionValue}`;
            const deleteResult = await redisClient.deleteKeysByPattern(pattern);

            console.log(deleteResult);

            // 4. 提交事务
            await connection.commit();
            res.sendResponse('更新成功');
        } else {
            await connection.rollback();
            res.sendError('没有找到指定的权限', 404);
        }
    } catch (err) {
        await connection.rollback(); // 回滚事务
        console.error(err);
        res.status(500).json({ success: false, message: '更新失败' });
    } finally {
        connection.release(); // 释放连接
    }
}


/* 删除权限 */
async function deletePermissionHanlder(id, res) {
    const connection = await pool.getConnection(); // 获取 MySQL 事务连接

    try {
        // 开启事务
        await connection.beginTransaction();

        // 1. 查询被删除权限的详细信息
        const [rows] = await connection.query(
            'SELECT permission_value FROM Permissions WHERE permission_id = ? AND can_delete = 1',
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback(); // 回滚事务
            return res.sendError("未找到指定的权限或权限不可删除", 404);
        }

        const permissionValue = rows[0].permission_value;

        // 2. 删除数据库中的权限记录
        const [result] = await connection.query(
            'DELETE FROM Permissions WHERE permission_id = ? AND can_delete = 1',
            [id]
        );

        if (result.affectedRows === 0) {
            await connection.rollback(); // 回滚事务
            return res.sendError("未找到指定的权限或权限不可删除", 404);
        }

        // 提交事务（确保数据库操作完成）
        await connection.commit();

        // 3. 删除 Redis 缓存数据
        try {
            const pattern = `role:*:permissions:${permissionValue}`;
            const deletedCount = await redisClient.deleteKeysByPattern(pattern);

            if (deletedCount < 0) {
                console.warn("Redis 缓存清除失败，但数据库已成功更新");
            }
        } catch (redisErr) {
            console.error("Redis 操作失败", redisErr);
        }

        // 返回成功响应
        res.sendResponse("删除权限成功");
    } catch (err) {
        console.error(err);

        // 回滚事务
        if (connection) {
            await connection.rollback();
        }

        res.sendError("删除权限失败");
    } finally {
        // 释放数据库连接
        if (connection) {
            connection.release();
        }
    }
}




module.exports = {
    getPermissionsHandler,
    addPermissionHandler,
    updatePermissionHandler,
    deletePermissionHanlder
}