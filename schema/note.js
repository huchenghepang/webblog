const Joi = require("joi");

const addNoteSchema = Joi.object({
    name:Joi.string().max(100).required(),
    summary:Joi.string().max(200).required(),
    text:Joi.string().required(),
    categoryId:Joi.number().required(),
    isArchived:Joi.boolean().required(),
    tags:Joi.array().required()
})

const updateNoteSchema = Joi.object({
    noteId:Joi.number().required(),
    fileId:Joi.string().required(),
    name:Joi.string().max(100).required(),
    summary:Joi.string().max(200).required(),
    text:Joi.string().required(),
    categoryId:Joi.number().required(),
    isArchived:Joi.boolean().required(),
    tags:Joi.array().required()
})

const deleteNoteSchema = Joi.object({
    noteId:Joi.number().required(),
    fileId:Joi.string().required(),
})
const toggleArchiveNoteSchema = Joi.object({
    noteId:Joi.number().required(),
    isArchived:Joi.boolean().required()
})

module.exports = {
    addNoteSchema,
    updateNoteSchema,
    deleteNoteSchema,
    toggleArchiveNoteSchema
}