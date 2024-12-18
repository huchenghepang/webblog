const Joi = require("@hapi/joi");

const roleSchema = Joi.object({
    roleName: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(0).max(500)
});

const manageSchema = Joi.object({
    roleId: Joi.number().integer().required().messages({
        'number.base': 'roleId 必须是一个整数',
        'number.empty': 'roleId 不能为空',
        'any.required': 'roleId 是必填字段'
    }),
    permissionIds: Joi.array().items(Joi.number().integer()).required().messages({
        'array.base': 'permissionIds 必须是一个数组',
        'array.min': 'permissionIds 至少需要一个权限ID',
        'any.required': 'permissionIds 是必填字段',
        'number.base': '每个权限ID必须是一个整数'
    })
});





module.exports = {
    roleSchema,
    manageSchema
}