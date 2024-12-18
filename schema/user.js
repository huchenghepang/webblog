const Joi = require("joi")

const register_login_schema = Joi.object({
    // 账号
    account: Joi.string().pattern(/^1[3-9]\d{9}$/).required(),
    // 密码
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).required(),
    captcha: Joi.string()
})

const register_add_schema = Joi.object({
    // 账号
    account: Joi.string().pattern(/^1[3-9]\d{9}$/).required(),
    // 密码
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).required(),
})


const manageRolesSchema = Joi.object({
    userId: Joi.string().min(1),
    roleIds: Joi.array().items(Joi.number().integer()).required().messages({
        'array.base': 'permissionIds 必须是一个数组',
        'any.required': 'permissionIds 是必填字段',
        'number.base': '每个权限ID必须是一个整数'
    })
})


const updateSchema = Joi.object({
    username: Joi.string()
        .min(2)
        .max(20)
        .required()
        .messages({
            'string.base': '用户名必须是字符串类型',
            'string.empty': '用户名不能为空',
            'string.min': '用户名长度至少为 {#limit} 个字符',
            'string.max': '用户名长度不能超过 {#limit} 个字符',
            'any.required': '用户名是必填项',
        }),

    avatar: Joi.string()
        .regex(/^(https?:\/\/|localhost)/) // 允许 http, https 和 localhost
        .required()
        .messages({
            'string.base': '头像链接必须是字符串类型',
            'string.uri': '头像链接必须是一个有效的 URL',
            'string.empty': '头像链接不能为空',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': '邮箱必须是字符串类型',
            'string.empty': '邮箱不能为空',
            'string.email': '邮箱格式无效',
            'any.required': '邮箱是必填项',
        }),

    signature: Joi.string()
        .max(100)
        .optional()
        .allow('')
        .messages({
            'string.base': '个性签名必须是字符串类型',
            'string.empty': '个性签名不能为空',
            'string.max': '个性签名长度不能超过 {#limit} 个字符',
        }),
});


module.exports = {
    register_login_schema,
    register_add_schema,
    manageRolesSchema,
    updateSchema
}