const Joi = require("joi");

// 添加分类的文规则

const addCategoriesSchema = Joi.object({
    name:Joi.string().required(),
    parentId:Joi.number().required(), // 必须是正数
    level:Joi.number().required() 
})

module.exports = {
    addCategoriesSchema
}