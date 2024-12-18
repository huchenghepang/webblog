
/* 验证权限的局部中间件 */

const config = require("../config");
const pool = require("../db/mysqlpool");
const redisClient = require("../db/redis");


async function getPermissionsByRoleId(roleId) {
    try {
        const sql = `SELECT p.permission_value AS PermissionValue
                    FROM RolePermissions rp
                    LEFT JOIN Permissions p ON rp.permission_id = p.permission_id
                    WHERE rp.role_id = ?;
                    `
        const [rows] = await pool.query(sql, [roleId])
        if (rows.length > 0) {
            let permissionValueList = [];
            rows.forEach(row => {
                permissionValueList.push(row.PermissionValue)
            });
            return permissionValueList
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

function isValidatePath(originalUrl) {
    let isValid = false;
    config.excludePermissionVerification.forEach(pathRegex => {
        let isExcludePath = pathRegex.test(originalUrl)
        if (isExcludePath) {
            isValid = true
        }
    })

    return isValid
}

/**
 * 将权限值转换为正则表达式，用于匹配 URL 路径
 * @param {string} permissionValue - 权限值，包含动态参数的 URL 路径
 * @returns {RegExp} - 转换后的正则表达式
 */
function permissionToRegex(permissionValue) {
    // 将动态参数 ":param" 替换为正则匹配规则
    return new RegExp(`^${permissionValue.replace(/:[^/]+/g, '[^/]+')}$`);
}




async function validatePermission(req, res, next) {
    const originalUrl = req.path;
    // console.log(originalUrl);
    
    try {
        const roleId = req.auth.currentRole.roleId;
        const RedisKeyName = `role:${roleId}:permissions:${originalUrl}`;

        // 尝试从 Redis 获取权限验证状态
        let success = false;
        let exists = false;

        try {
            // 检查 Redis 中是否存在该权限数据
            const result = await redisClient.existsKey(RedisKeyName);
            success = result.success;
            exists = result.exists;
        } catch (redisError) {
            if (redisError.message === 'Redis connection timeout or refused') {
                // 如果是 Redis 超时或连接拒绝错误，跳过 Redis 验证，直接使用 MySQL
                // console.log('Redis 错误，跳过 Redis 验证，进行 MySQL 验证');
                return checkPermissionsInMySQL(req, res, next, roleId, originalUrl);
            }
            // 其他 Redis 错误可以继续处理
            throw redisError;  // 重新抛出 Redis 其他错误
        }

        if (success && exists) {
            // console.log("从 Redis 中验证成功");
            return next();
        } else {
            return checkPermissionsInMySQL(req, res, next, roleId, originalUrl);
        }

    } catch (error) {
        // 验证是否是无需验证的路径
        const isValidate = isValidatePath(originalUrl);
        if (isValidate) {
            return next();
        } else {
            console.log("发生错误:", error);
            throw error;
        }
    }
}

/**
 * 从 MySQL 验证权限
 */
async function checkPermissionsInMySQL(req, res, next, roleId, originalUrl) {
    try {
        const permissionValueList = await getPermissionsByRoleId(roleId);

        const hasPermission = permissionValueList.some(permissionValue => {
            if (!permissionValue) return false;
            const regex = permissionToRegex(permissionValue); // 转换为正则
            return regex.test(originalUrl); // 匹配实际路径
        });

        if (hasPermission) {
            // 将权限存入 Redis 以便下次使用
            const RedisKeyName = `role:${roleId}:permissions:${originalUrl}`;
            redisClient.setKey(RedisKeyName, originalUrl, 3600); // 设置过期时间
            next();
        } else {
            res.sendError("您并没有这个权限，请不要越过权限验证", 403);
        }
    } catch (error) {
        console.log("MySQL 权限验证失败:", error);
        res.sendError("权限验证失败", 500);
    }
}


module.exports = {
    validatePermission
}