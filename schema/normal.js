const Joi = require("@hapi/joi");

// 分页参数验证规则
const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1), // 页码，默认从第1页开始
    limit: Joi.number().integer().min(1).default(5) // 每页记录数，默认10条
});


module.exports = {
    paginationSchema
}