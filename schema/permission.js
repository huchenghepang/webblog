const Joi = require("@hapi/joi");

const permissionSchema = Joi.object({
    permissionName: Joi.string().min(1).max(100).required().messages({
        'string.base': `"permissionName" should be a string`,
        'string.empty': `"permissionName" cannot be empty`,
        'string.min': `"permissionName" should have a minimum length of {#limit}`,
        'any.required': `"permissionName" is required`
    }),
    description: Joi.string().max(255).optional(),
    type: Joi.string().valid('route', 'button').required(),
    parentId: Joi.number().integer().optional().allow(null),
    permissionValue:Joi.string().max(40).optional()
});

module.exports = {
    permissionSchema
}