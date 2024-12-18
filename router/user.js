const express = require("express")
const { register_add_schema, manageRolesSchema, updateSchema } = require("../schema/user")
const { registerHandler, getUserInfoHandler, resetUserPasswordHandler, deleteUserHandler, manageRolesForUserHandler, getUserRolesHandler, updateUserInfo, findUserByNameHandler, getUsersInfoHandler } = require("../router_handler/user")
const { paginationSchema } = require("../schema/normal")
const { getRolePermissionsById } = require("../router_handler/role")
const jwt = require("jsonwebtoken")
const config = require("../config");
const router = express.Router()

// 获取用户信息 单个用户
router.get("/userinfo", async (req, res) => {
    /*  
    */
    try {
        const { type, roleId } = req.query;
        let userInfo = req.auth;
        if (userInfo) {
            const newUserInfo = await getUserInfoHandler(userInfo.account)
            if (newUserInfo) {
                userInfo = { ...userInfo, ...newUserInfo[0] }
            }
            const roleID = roleId ? roleId : (userInfo.currentRole.roleId || 39);
            let roleName = ''
            userInfo.roles && userInfo.roles.some((item => {
                const exist = item.roleId == roleID
                if (exist) {
                    roleName = item.roleName
                }
                return exist
            }));
            const permissions = await getRolePermissionsById(roleID);
            userInfo.permissions = permissions;
            userInfo.currentRole = {
                roleId: roleID,
                roleName
            }
            /* 重新签发JWT */
            let { iat, exp, ...user } = req.auth;
            user.currentRole = {
                roleId: roleID,
                roleName
            };
            const token_str = jwt.sign({ ...user }, config.jwtSecretKey, { expiresIn: config.expiresIn });
            
            res.sendResponse("成功获取了用户信息", { userInfo, token:"Bearer "+token_str })
        } else {
            res.sendError("获取个人信息失败")
        }
    } catch (error) {
        console.log(error)
        res.sendError("获取个人信息失败")
    }
})

/* 添加用户 */

router.post("/admin/add", async (req, res) => {
    const { value: { account, password }, error } = register_add_schema.validate(req.body);
    if (error) {
        return res.sendError('添加失败', error.details[0])
    }
    await registerHandler(account, password, res)
})


/* 分页获取多个用户 */
/* 因为JWT登录模式，无法控制用户的登录状态 */
router.get("/admin/users", async (req, res) => {
    try {
        const { value: { page, limit }, error } = paginationSchema.validate(req.query)
        if (error) {
            return res.sendError(error.details[0])
        }
        await getUsersInfoHandler({ page, limit }, res)
    } catch (error) {
        res.sendError("错误")
    }

})


/* 编辑更新用户 软删除 管理员不能修改用户的密码，只能去重置其密码，也不能查看密码 */
/* 重置密码 */
router.put("/admin/reset/:userId", async (req, res) => {
    const { userId } = req.params
    await resetUserPasswordHandler(userId, res)
})


/* 删除用户 */

/* 编辑更新用户 软删除 管理员不能修改用户的密码，只能去重置其密码，也不能查看密码 */
/* 重置密码 */
router.put("/admin/delete/:userId", async (req, res) => {
    const { userId } = req.params
    await deleteUserHandler(userId, res)
})


/* 分配用户角色 */
router.post('/admin/manageRoles', async (req, res) => {

    const { value: { userId, roleIds }, error } = manageRolesSchema.validate(req.body)
    // 确保传入了有效的权限数组
    if (error) {
        return res.sendError("参数错误", error.details[0]);
    }
    await manageRolesForUserHandler(userId, roleIds, res);
});


/* 获取用户所有的角色情况 根据用户ID  */
router.get('/userrole/:userId', async (req, res) => {
    const { userId } = req.params;
    await getUserRolesHandler(userId, res);
});

/* 个人用户修改信息 */
router.post("/update/userinfo", async (req, res) => {
    const { user_id } = req.auth;
    const { value: { username, avatar, email, signature }, error } = updateSchema.validate(req.body);
    if (error) {
        res.sendError(error.details[0])
    }
    await updateUserInfo({ user_id, username, avatar, email, signature }, res)
})

/* 根据用户名查找用户 */
router.get('/admin/getuser', async (req, res) => {
    const { userName } = req.query;
    await findUserByNameHandler(userName, res);
})

module.exports = router