const Joi = require("@hapi/joi");

/* 添加 */
const addCommentSchema = Joi.object({
    articleId: Joi.number().integer().positive().required().messages({
        'number.base': '文章 ID 必须是一个数字',
        'number.integer': '文章 ID 必须是一个整数',
        'number.positive': '文章 ID 必须是一个正数',
        'any.required': '文章 ID 是必填项'
    }),

    userId: Joi.string().min(1).max(255).required().messages({
        'string.base': '用户 ID 必须是一个字符串',
        'string.min': '用户 ID 至少需要 1 个字符',
        'string.max': '用户 ID 最多只能包含 255 个字符',
        'any.required': '用户 ID 是必填项'
    }),

    parentId: Joi.number().integer().min(0).optional().messages({
        'number.base': '父评论 ID 必须是一个数字',
        'number.integer': '父评论 ID 必须是一个整数',
        'number.min': '父评论 ID 必须大于或等于 0'
    }),

    content: Joi.string().min(1).required().messages({
        'string.base': '评论内容 必须是一个字符串',
        'string.min': '评论内容 至少需要 1 个字符',
        'any.required': '评论内容 是必填项'
    }),
});


/* 删除评论 */
const deleteCommentSchema = Joi.object({
    commentId: Joi.number().integer().positive().required().messages({
        'number.base': '评论 ID 必须是一个数字',
        'number.integer': '评论 ID 必须是一个整数',
        'number.positive': '评论 ID 必须是一个正数',
        'any.required': '评论 ID 是必填项'
    }),

    userId: Joi.string().min(1).max(255).required().messages({
        'string.base': '用户 ID 必须是一个字符串',
        'string.min': '用户 ID 至少需要 1 个字符',
        'string.max': '用户 ID 最多只能包含 255 个字符',
        'any.required': '用户 ID 是必填项'
    })
});


const editCommentSchema = Joi.object({
    commentId: Joi.number().integer().positive().required().messages({
        'number.base': '评论 ID 必须是一个数字',
        'number.integer': '评论 ID 必须是一个整数',
        'number.positive': '评论 ID 必须是一个正数',
        'any.required': '评论 ID 是必填项'
    }),

    userId: Joi.string().min(1).max(255).required().messages({
        'string.base': '用户 ID 必须是一个字符串',
        'string.min': '用户 ID 至少需要 1 个字符',
        'string.max': '用户 ID 最多只能包含 255 个字符',
        'any.required': '用户 ID 是必填项'
    }),

    content: Joi.string().min(1).required().messages({
        'string.base': '评论内容 必须是一个字符串',
        'string.min': '评论内容 至少需要 1 个字符',
        'any.required': '评论内容 是必填项'
    })
});


const auditCommentSchema = Joi.object({
    commentId: Joi.number().integer().positive().required().messages({
        'number.base': '评论 ID 必须是一个数字',
        'number.integer': '评论 ID 必须是一个整数',
        'number.positive': '评论 ID 必须是一个正数',
        'any.required': '评论 ID 是必填项'
    }),

    status: Joi.string().valid('approved', 'rejected').required().messages({
        'string.base': '状态 必须是一个字符串',
        'any.only': '状态 必须是 "pending"、"approved" 或 "rejected" 中的一个',
        'any.required': '状态 是必填项'
    })
});


const queryCommentSchema = Joi.object({
    articleId: Joi.number().integer().positive().required().messages({
        'number.base': '文章 ID 必须是一个数字',
        'number.integer': '文章 ID 必须是一个整数',
        'number.positive': '文章 ID 必须是一个正数',
        'any.required': '文章 ID 是必填项'
    }),

    status: Joi.string().valid('pending', 'approved', 'rejected').optional().default('approved').messages({
        'string.base': '状态 必须是一个字符串',
        'any.only': '状态 必须是 "pending"、"approved" 或 "rejected" 中的一个'
    })
});


// 定义批量删除评论的请求体 Schema
const deleteCommentsSchema = Joi.object({
    commentIds: Joi.array()
        .items(Joi.number().integer().positive().required())  // 确保每个 commentId 是正整数
        .min(1)  // 至少删除一个评论
        .required()
        .messages({
            'array.base': '评论ID必须是数组',
            'array.min': '请至少选择一个评论进行删除',
            'array.includesRequiredUnknowns': '评论ID必须是有效的数字格式',
            'number.base': '评论ID必须是一个数字',
            'number.integer': '评论ID必须是整数',
            'number.positive': '评论ID必须是正数',
        }),
});

/* 批量审核评论 */
const auditCommentsSchema = Joi.object({
    commentIds: Joi.array()
        .items(Joi.number().integer().positive().required())  // 确保每个 commentId 是正整数
        .min(1)  // 至少要审核一个评论
        .required()
        .messages({
            'array.base': '评论ID必须是数组',
            'array.min': '请至少选择一个评论进行审核',
            'array.includesRequiredUnknowns': '评论ID必须是有效的数字格式',
            'number.base': '评论ID必须是一个数字',
            'number.integer': '评论ID必须是整数',
            'number.positive': '评论ID必须是正数',
        }),
    status: Joi.string().valid('pending', 'approved', 'rejected').required().messages({
        'string.base': '状态 必须是一个字符串',
        'any.only': '状态 必须是 "pending"、"approved" 或 "rejected" 中的一个',
        'any.required': '状态 是必填项'
    })
});

/* 点赞的ID */

const likeCommentSchema = Joi.object({
    commentId: Joi.number().integer().positive().required().messages({
        'number.base': '评论 ID 必须是一个数字',
        'number.integer': '评论 ID 必须是一个整数',
        'number.positive': '评论 ID 必须是一个正数',
        'any.required': '评论 ID 是必填项'
    }),
    userId: Joi.string().min(1).max(255).required().messages({
        'string.base': '用户 ID 必须是一个字符串',
        'string.min': '用户 ID 至少需要 1 个字符',
        'string.max': '用户 ID 最多只能包含 255 个字符',
        'any.required': '用户 ID 是必填项'
    })
});

/* 管理员获取评论 */
const adminGetCommentsSchema = Joi.object({
    page: Joi.number().integer().min(1).required().label("页码"),
    limit: Joi.number().integer().min(1).required().label("每页条数"),
    status: Joi.array()
        .items(Joi.string().valid("pending", "approved", "rejected"))
        .optional()
        .label("评论状态数组"),
})

module.exports = {
    addCommentSchema,
    deleteCommentSchema,
    editCommentSchema,
    auditCommentSchema,
    queryCommentSchema,
    deleteCommentsSchema,
    auditCommentsSchema,
    likeCommentSchema,
    adminGetCommentsSchema
}