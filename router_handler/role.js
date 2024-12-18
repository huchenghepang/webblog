const pool = require("../db/mysqlpool");
const redisClient = require("../db/redis");
const { buildTreeFromList } = require("../utils/buildTreeFromList");

/* 添加角色 */

async function addRoleHandler({ roleName, description }, res) {
    try {
        const [result] = await pool.execute(
            'INSERT INTO Roles (role_name, description) VALUES (?, ?)',
            [roleName, description]
        );
        res.sendResponse('成功添加角色')
    } catch (err) {
        if (err.errno == 1062) {
            res.sendError("已经存在在角色")
        }
        res.sendError("添加失败")
    }
}

/* 获取多个角色的信息 */
async function getRoleInfoHandler({ page, limit }, res) {
    const offset = (page - 1) * limit; // 偏移量
    try {
        // console.log(offset)
        // 查询当前页的角色数据
        const [roles] = await pool.query("SELECT * FROM `Roles` LIMIT ? OFFSET ?",
            [limit, offset]);
        // 查询总记录数
        const [countResult] = await pool.execute('SELECT COUNT(*) AS total FROM Roles');
        const total = countResult[0].total;
        // 计算总页数
        const totalPages = Math.ceil(total / limit);

        // 返回分页信息和角色数据
        res.sendResponse("成功获取角色信息", {
            total,
            totalPages,
            page,
            limit,
            roles
        })
    } catch (err) {
        res.sendError("获取角色信息失败")
    }
}


/* 查找角色根据名字 */

async function findRoleByNameHandler(roleName, res) {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM `Roles` WHERE role_name = ?',
            [roleName]
        );
        if (rows.length === 0) {
            return res.sendError("没有找到角色", 404);
        }
        return res.sendResponse("找到了角色", rows[0]);
    } catch (err) {
        res.sendError("查找出错")
    }
}

/* 更新角色 */
async function updateRoleByIdHandler({ id, roleName, description }, res) {
    // console.log(typeof id)
    // console.log(roleName, description)
    try {
        const sql = "UPDATE Roles SET `role_name` = ?,`description`= ? WHERE `role_id` = ?;"
        const [result] = await pool.execute(sql, [roleName, description, id]);
        // console.log(result)

        if (result.affectedRows === 0) {
            return res.sendError("无法更新");
        }

        return res.sendResponse("更新成功")
    } catch (err) {
        // console.log(err)
        res.sendError("更新错误")
    }
}

/* 删除角色 */

async function deleteRoleHandler(id, res) {
    try {
        const [result] = await pool.execute(
            'DELETE FROM `Roles` WHERE `role_id` = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.sendError("删除失败")
        }
        res.sendResponse("删除成功")
        // 清除对应的roleId的redis数据
        const pattern = `role:${id}:permissions:*`;
        redisClient.deleteKeysByPattern(pattern)
    } catch (err) {
        res.sendError("删除出错")
    }
}

/* 批量删除角色 */

async function deleteRolesHandler(ids, res) {
    try {
        const [result] = await pool.query(`DELETE FROM Roles WHERE role_id IN (?)`, [ids]);
        if (result.affectedRows === 0) {
            return res.sendError("无法删除，删除出错")
        }

        res.sendResponse("批量删除成功")
        ids.array.forEach(async (id, index) => {
            const pattern = `role:${id}:permissions:*`;
            await redisClient.deleteKeysByPattern(pattern)
        });
    } catch (err) {
        res.sendError("删除出错")
    }
}


/* 管理角色权限 */
// 管理角色的权限
async function managePermissionsForRole(roleId, permissionIds, res) {
    try {

        // 获取角色当前拥有的权限
        const [currentPermissions] = await pool.execute(
            "SELECT permission_id FROM RolePermissions WHERE role_id = ?",
            [roleId]
        );

        // 提取当前权限的 ID
        const currentPermissionIds = currentPermissions.map(row => row.permission_id);

        // 找出需要添加的权限（即当前不在数据库中的权限）
        const permissionsToAdd = permissionIds.filter(permissionId => !currentPermissionIds.includes(permissionId));

        // 找出需要删除的权限（即当前存在但不在新权限数组中的权限）
        const permissionsToDelete = currentPermissionIds.filter(permissionId => !permissionIds.includes(permissionId));

        // 执行权限分配：插入权限
        if (permissionsToAdd.length > 0) {
            const valuesToAdd = permissionsToAdd.map(permissionId => [roleId, permissionId]);
            const sqlAdd = "INSERT INTO RolePermissions (role_id, permission_id) VALUES ?";
            await pool.query(sqlAdd, [valuesToAdd]);
        }

        // 执行权限取消：删除权限
        if (permissionsToDelete.length > 0) {
            const sqlDelete = "DELETE FROM RolePermissions WHERE role_id = ? AND permission_id IN (?)";
            await pool.query(sqlDelete, [roleId, permissionsToDelete]);
        }

        res.sendResponse("权限分配/取消成功");
        // 清除对应的roleId的redis数据
        const pattern = `role:${roleId}:permissions:*`;
        redisClient.deleteKeysByPattern(pattern);
    } catch (err) {
        console.error("Error managing permissions:", err);
        res.sendError("操作权限时出错");
    }
}





/**
 * 根据角色ID获取该角色的所有权限
 */
const getRolePermissionsHandler = async (roleId, res) => {
    try {
        // 1. 获取所有权限
        const [permissions] = await pool.query('SELECT permission_id, permission_name,type,parent_id FROM Permissions');
        if (permissions.length === 0) {
            return res.sendError('没有可用的权限', 404);
        }

        // 2. 获取该角色拥有的权限
        const [rolePermissions] = await pool.query(
            `SELECT p.permission_id, p.permission_name,p.type,p.parent_id
            FROM Permissions p
            JOIN RolePermissions rp ON p.permission_id = rp.permission_id
            WHERE rp.role_id = ?`, [roleId]
        );

        // 将角色拥有的权限存入一个集合
        const userPermissions = new Set(rolePermissions.map(item => item.permission_id));

        // 3. 列出所有权限并标明是否拥有
        const permissionsWithStatus = permissions.map(permission => ({
            id: permission.permission_id,
            name: permission.permission_name,
            type: permission.type,
            parentId: permission.parent_id,
            hasPermission: userPermissions.has(permission.permission_id),  // 判断该角色是否有该权限
        }));
        const newPermissions = buildTreeFromList(permissionsWithStatus, `id`, `parentId`, 'children')
        // 4. 返回结果
        return res.sendResponse('获取权限成功', { permissions: newPermissions });
    } catch (error) {
        console.error(error);
        return res.sendError('获取角色权限失败', 500);
    }
};
/* 根据角色的Id获取角色的可用权限 */

async function getRolePermissionsById(roleId) {
    try {
        if (roleId) {
            // 2. 获取该角色拥有的权限
            const [rolePermissions] = await pool.query(
                `SELECT p.permission_id as permissionId, p.permission_name as permissionName,
                p.parent_id as parentId,p.type,p.description FROM Permissions p JOIN RolePermissions rp ON p.permission_id = rp.permission_id
            WHERE rp.role_id = ?`, [roleId]
            );
            const newPermissions = new buildTreeFromList(rolePermissions, 'permissionId', 'parentId');
            return newPermissions;

        }
    } catch (error) {
        return
    }

}


module.exports = {
    addRoleHandler,
    getRoleInfoHandler,
    findRoleByNameHandler,
    updateRoleByIdHandler,
    deleteRoleHandler,
    deleteRolesHandler,
    managePermissionsForRole,
    getRolePermissionsHandler,
    getRolePermissionsById
}