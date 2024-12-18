const Joi = require('joi');


// 指定参数规则

// 添加文章的规则
const addArticleSchema = Joi.object({
    noteName:Joi.string().required(),
    Tags:Joi.custom((value, helpers) => {
        // 检查字符串是否为空
        if (!value) {
            return helpers.error('any.required'); // 如果为空，返回必填错误
        }
        if(value.length >0 && typeof value !== 'string'){
            return helpers.error('any.invalid'); // 如果不是字符串，返回无效错误
        }
        // 使用逗号分隔字符串并转换为数组
        const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag); // 去除多余空格和空项
        if(Array.isArray(tagsArray)){
            return tagsArray.join(","); // 字符串 a, b, c
        }else{
            return helpers.error('不是一个有效数据'); // 如果不是数组，返回无效错误
        }
    }).required(),
    datetime:Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // 正则表达式匹配 YYYY-MM-DD HH:mm:ss 格式
    .custom((value, helpers) => {
        const date = new Date(value); // 将字符串转换为 Date 对象
        if (isNaN(date.getTime())) { // 检查日期是否有效
            return helpers.message('Invalid date/time format or value');
        }
        return value; // 返回有效的日期时间字符串
    })
    .required(),
    fileId:Joi.string(),
    isArchive:Joi.boolean().required().custom((value, helpers) => {
        // 判断并转换
        if (typeof value !== 'boolean') {
            return helpers.error('any.invalid'); // 自定义错误
        }
        return value ? 1 : 0; // 将 true 转换为 1，false 转换为 0
    }),
    category:Joi.number().integer().required(),
})

// 获取文章的规则

const getArticleSchema = Joi.object({
    id: Joi.number().integer().required(),
})

// 获取文章列表的规则

const getArticleListSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    keyword: Joi.string(),
    categoryName: Joi.string(),
    isArchive: Joi.boolean(),
    tagName:Joi.string(),
    datetimeStart: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // 正则表达式匹配 YYYY-MM-DD HH:mm:ss 格式
    .custom((value, helpers) => {
        const date = new Date(value); // 将字符串转换为 Date 对象
        if (isNaN(date.getTime())) { // 检查日期是否有效
            return helpers.message('Invalid date/time format or value');
        }
        return value; // 返回有效的日期时间字符串
    }),
    datetimeEnd: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // 正则表达式匹配 YYYY-MM-DD HH:mm:ss 格式
    .custom((value, helpers) => {
        const date = new Date(value); // 将字符串转换为 Date 对象
        if (isNaN(date.getTime())) { // 检查日期是否有效
            return helpers.message('Invalid date/time format or value');
        }
        return value; // 返回有效的日期时间字符串
    }),
})


module.exports = {
    addArticleSchema,
    getArticleListSchema
}