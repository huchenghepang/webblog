const express = require("express");
const { roleSchema, manageSchema } = require("../schema/role");
const { addRoleHandler, getRoleInfoHandler, findRoleByNameHandler, updateRoleByIdHandler, deleteRoleHandler, deleteRolesHandler, managePermissionsForRole, getRolePermissionsHandler } = require("../router_handler/role");
const { paginationSchema } = require("../schema/normal");
const roleRouter = express.Router()

// 添加角色（POST）
roleRouter.post('/add', async (req, res) => {
    const { roleName, description } = req.body;
    // 验证数据
    const { error } = roleSchema.validate({ roleName, description });
    if (error) {
        return res.sendResponse("数据验证错误", error.details[0].message);
    }
    await addRoleHandler({ roleName, description }, res)
});

// 获取所有角色（GET）
roleRouter.get('/', async (req, res) => {

    const { value: { page, limit }, error } = paginationSchema.validate(req.query);
    if (error) {
        res.sendError("获取角色信息失败")
        return
    }

    await getRoleInfoHandler({ page, limit }, res)


});

// 获取单个角色（GET）
roleRouter.get('/get/:roleName', async (req, res) => {
    const { roleName } = req.params;
    await findRoleByNameHandler(roleName, res)
});

// 更新角色（PUT）
roleRouter.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { roleName, description } = req.body;
    // 验证数据
    const { error } = roleSchema.validate({ roleName, description });
    if (error) {
        return res.sendError('参数错误', error.details[0].message);
    }
    await updateRoleByIdHandler({ id, roleName, description }, res)

});

// 删除角色（DELETE）
roleRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    await deleteRoleHandler(id, res);
});

// 批量删除角色（DELETE）
roleRouter.delete('/batch', async (req, res) => {
    try {
        const ids = req.body.ids;  // 接收角色ID数组
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.sendError('必须是一个数组')
        }
        await deleteRolesHandler(ids, res);
    } catch (error) {
        res.sendError('必须是一个数组')
    }

});

// 分配或取消权限
roleRouter.post('/managePermissions', async (req, res) => {
    const { roleId, permissionIds } = JSON.parse(JSON.stringify(req.body))
    const { error } = manageSchema.validate({ roleId, permissionIds })
    // 确保传入了有效的权限数组
    if (error) {
        return res.sendError("参数错误", error.details[0]);
    }
    await managePermissionsForRole(roleId, permissionIds, res);
});

/* 获取权限 */

// 根据角色ID获取该角色的所有权限
roleRouter.get('/permissions/:roleId', async (req, res) => {
    const { roleId } = req.params;
    await getRolePermissionsHandler(roleId, res);
});
module.exports = roleRouter