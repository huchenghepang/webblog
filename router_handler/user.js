const pool = require("../db/mysqlpool");
const { v5: uuidv5 } = require("uuid");
// const MY_NAMESPACE = uuidv5.URL; // 使用URL作为命名空间
const MY_NAMESPACE = uuidv5("huchenghedezidingyi", uuidv5.DNS);
const moment = require("moment-timezone");
// 加密bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const config = require("../config");
const { getRolePermissions, getRolePermissionsById } = require("./role");

// 注册用户
async function registerHandler(account, password, res) {
  // 创建连接
  const connection = await pool.getConnection();
  let sql = "select * from `user_info` where `account` =" + account;
  const [rows] = await connection.query(sql);
  if (rows.length > 0) {
    res.sendError("账号已经注册了", 409);
    connection.release();
  } else {
    sql =
      "INSERT INTO `user_info`(`user_id`,`account`,`password`,`register_datetime`) VALUES (?,?,?,?)";
    try {
      const user_id = uuidv5(account, MY_NAMESPACE);
      // 第二个参数 saltRounds 加密的精度 越高越精确 消耗性能 慢
      password = bcrypt.hashSync(password, 10);
      const register_datetime = moment()
        .tz("Asia/Shanghai")
        .format("YYYY-MM-DD HH:mm:ss");
      // 进行连接
      const values = [user_id, account, password, register_datetime];
      const [result, fields] = await connection.execute(sql, values);
      if (result.changedRows === 0) {
        res.sendResponse("成功注册账号");
        // 释放连接
        connection.release();
      }
    } catch (err) {
      res.sendError(err, 400);
    }
  }
}

// 用户登录
async function loginHandler(account, password, res) {
  // 创建连接
  const connection = await pool.getConnection();
  // 因为用来软删除 还需要判断用户有没有被删除
  let sql = "select user_id,account,password from `user_info` where is_delete = 0  AND `account` =" + account;
  const [rows] = await connection.query(sql);
  if (rows.length > 0) {
    let result = bcrypt.compareSync(password, rows[0].password);
    if (result) {
      // 2. 获取该用户拥有的角色
      const [roles] = await connection.query(
        `SELECT r.role_id as roleId, r.role_name as roleName
        FROM Roles r
        JOIN UserRoles ur ON r.role_id = ur.role_id
        WHERE ur.user_id = ?`, [rows[0].user_id]
      );

      let currentRole, permissions;
      if (roles && roles[0]) {
        currentRole = roles.find((role,index)=>{
          return role.roleId > 39 || role.roleId === 39;
        });
        if (currentRole) {
          getRolePermissionsById(currentRole.role_id)
        }
      }
      let user = {user_id:rows[0].user_id,
        account:rows[0].account, roles, currentRole, permissions }
      const token_str = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
      res.sendResponse("成功登录了账户", { token: "Bearer " + token_str }) //注意空格
    } else {
      res.sendError("密码不正确，请重试");
    }

  } else {
    connection.release();
    res.sendError("用户不存在,请先注册");
  }
}


/* 获取多个用户的信息 */
async function getUsersInfoHandler({ page, limit }, res) {
  const offset = (page - 1) * limit; // 偏移量
  try {
    // 查询当前页的角色数据
    const [users] = await pool.query("SELECT `user_id`,`account`,`register_datetime`,`is_delete`,`username` FROM `user_info` LIMIT ? OFFSET ?",
      [limit, offset]);
    // 查询总记录数
    const [countResult] = await pool.execute('SELECT COUNT(*) AS total FROM user_info');
    const total = countResult[0].total;
    // 计算总页数
    const totalPages = Math.ceil(total / limit);
    // 返回分页信息和角色数据
    res.sendResponse("成功获取角色信息", {
      total,
      totalPages,
      page,
      limit,
      users
    })
  } catch (err) {
    // console.log(err)
    res.sendError("获取角色信息失败")
  }
}

/* 重置用户密码 */
async function resetUserPasswordHandler(userId, res) {
  try {
    // 默认密码 @Aa12345678
    const defaultPassword = bcrypt.hashSync('@Aa12345678', 10);
    const sql = "UPDATE `user_info` SET password = ? WHERE user_id = ?;";
    const [result] = await pool.query(sql, [defaultPassword, userId])
    if (result.affectedRows > 0) {
      return res.sendResponse('成功重置了密码')
    }
  } catch (error) {
    res.sendError("重置失败")
  }


}

/* 删除用户 */
/* 软删除好呢？还是硬删除好呢？这貌似争论很大... */
async function deleteUserHandler(userId, res) {
  try {
    const sql = "UPDATE `user_info` SET is_delete = ? WHERE user_id = ?;";
    const [result] = await pool.query(sql, [1, userId])
    if (result.affectedRows > 0) {
      return res.sendResponse('成功删除了用户')
    }
  } catch (error) {
    res.sendError("删除失败")
  }
}

/* 批量删除用户 ？ 这种不太安全 */



/* 管理用户角色 */
async function manageRolesForUserHandler(userId, roleIds, res) {
  try {
    // 获取用户当前拥有的角色
    const [currentRoles] = await pool.execute(
      "SELECT role_id FROM UserRoles WHERE user_id = ?",
      [userId]
    );

    // 提取当前角色的 ID
    const currentRoleIds = currentRoles.map(row => row.role_id);

    // 找出需要添加的角色（即当前不在数据库中的角色）
    const roleIdsToAdd = roleIds.filter(roleId => !currentRoleIds.includes(roleId));

    // 找出需要删除的角色（即当前存在但不在新角色数组中的角色）
    const roleIdsToDelete = currentRoleIds.filter(roleId => !roleIds.includes(roleId));

    // 执行角色分配：插入角色
    if (roleIdsToAdd.length > 0) {
      const valuesToAdd = roleIdsToAdd.map(roleId => [userId, roleId]);
      const sqlAdd = "INSERT INTO UserRoles (user_id, role_id) VALUES ?";
      await pool.query(sqlAdd, [valuesToAdd]);
    }

    // 执行权限取消：删除权限
    if (roleIdsToDelete.length > 0) {
      const sqlDelete = "DELETE FROM UserRoles WHERE user_id = ? AND role_id IN (?)";
      await pool.query(sqlDelete, [userId, roleIdsToDelete]);
    }

    return res.sendResponse("角色分配/取消成功");
  } catch (err) {
    console.error("Error managing roles:", err);
    res.sendError("操作角色时出错");
  }
}




async function getUserRolesHandler(userId, res) {
  try {
    // 1. 获取所有角色
    const [roles] = await pool.query('SELECT role_id, role_name FROM Roles');
    if (roles.length === 0) {
      return res.sendError('没有可用的角色', 404);
    }

    // 2. 获取该用户拥有的角色
    const [userRoles] = await pool.query(
      `SELECT r.role_id, r.role_name
        FROM Roles r
        JOIN UserRoles ur ON r.role_id = ur.role_id
        WHERE ur.user_id = ?`, [userId]
    );

    // 将用户拥有的角色存入一个集合
    const Roles = new Set(userRoles.map(item => item.role_id));

    // 3. 列出所有角色并标明是否拥有
    const rolesWithStatus = roles.map(role => ({
      id: role.role_id,
      name: role.role_name,
      hasRole: Roles.has(role.role_id),  // 判断该角色是否有该权限
    }));

    // 4. 返回结果
    return res.sendResponse('获取角色成功', { roles: rolesWithStatus });
  } catch (error) {
    return res.sendError('获取用户角色失败', 500);
  }
}

/* 更新个人信息 */
async function updateUserInfo({ user_id, username, avatar, email, signature }, res) {
  try {
    const sql = "UPDATE `user_info` SET username = ?, avatar = ?,email = ?, signature = ? WHERE user_id =? ";
    const [result] = await pool.query(sql, [username, avatar, email, signature, user_id]);
    if (result.affectedRows > 0) {
      return res.sendResponse("更新成功")
    }
    res.sendError("更新失败")
  } catch (error) {
    res.sendError("更新失败")
  }
}

/* 获取个人的信息 */
async function getUserInfoHandler(account) {
  // 创建连接
  const connection = await pool.getConnection();
  try {
    // 因为用来软删除 还需要判断用户有没有被删除
    let sql = "select username,avatar,email,signature  from `user_info` where is_delete = 0  AND `account` =" + account;

    const [rows] = await connection.query(sql);

    if (rows.length > 0) {
      return rows
    }
    return
  } catch (error) {
    return
  } finally {
    connection.release(); // 一定要注意释放连接
  }
}

/* 根据用户名查找用户 */
async function findUserByNameHandler(userName, res) {
  try {
    const userNamePattern = `%${userName}%`; // 包含的匹配模式
    const [users] = await pool.query(
      "SELECT `user_id`, `account`, `register_datetime`, `is_delete`, `username` FROM `user_info` WHERE `username` LIKE ?",
      [userNamePattern]
    );

    if (users.length === 0) {
      return res.sendError("没有找到角色", 404);
    }
    return res.sendResponse("找到了角色", users);
  } catch (err) {
    res.sendError("查找出错")
  }
}

module.exports = {
  registerHandler,
  loginHandler,
  getUsersInfoHandler,
  resetUserPasswordHandler,
  deleteUserHandler,
  manageRolesForUserHandler,
  getUserRolesHandler,
  updateUserInfo,
  getUserInfoHandler,
  findUserByNameHandler
};
