const express = require('express');
const { addNoteSchema, updateNoteSchema, deleteNoteSchema, toggleArchiveNoteSchema } = require("../schema/note");
const {addNoteHandler, updateNoteHandler, deleteNoteHandler, toggleNoteAechiveHandler, getNotesByPageLimitHandler, getNoteTagsByNoteIdHandler, readContentNoteHandler} = require("../router_handler/note");
const { paginationSchema } = require('../schema/normal');
const { addArticleSchema } = require('../schema/article');
const { addarticleHandler } = require('../router_handler/articles');
const router = express.Router();


/* 提交笔记：需要权限 */

router.post("/add", async (req, res) => {

    const {value:{name,summary,toc,createdDateTime,text,categoryId,isArchived,tags},error} = addNoteSchema.validate(req.body);
    if(error) {
        return res.sendError(error.details[0].message);
    }
    addNoteHandler({name,summary,toc,createdDateTime,text,categoryId,isArchived,tags},res)
})

router.post("/update",async (req,res)=>{
    const {value:{ noteId, fileId, name, summary, text, categoryId, isArchived, tags },error} = updateNoteSchema.validate(req.body);
    if(error) {
        return res.sendError(error.details[0].message);
    }
    updateNoteHandler({ noteId, fileId, name, summary, text, categoryId, isArchived, tags }, res)
})

router.delete("/delete",async (req,res)=>{
    const {value:{noteId,fileId},error} = await deleteNoteSchema.validate(req.query)
    if(error){
        return res.sendError(error.details[0].message);
    }
    deleteNoteHandler({noteId,fileId},res)
})

router.get("/archive",async (req,res)=>{
    const {value:{noteId,isArchived},error} = await toggleArchiveNoteSchema.validate(req.query)
    if(error){
        return res.sendError(error.details[0].message);
    }
    toggleNoteAechiveHandler({noteId,isArchived},res)
})

router.get("/info",async (req,res)=>{
    const {value:{page,limit},error} = await paginationSchema.validate(req.query)
    if(error){
        return res.sendError(error.details[0].message);
    }
    getNotesByPageLimitHandler({page,limit},res)
})


/* 添加文章的接口：用于上传时候的处理 */
router.post("/addarticle",async (req, res) => {
    // 验证参数是否符合规则
    // 如果不符合，返回400 Bad Request
    // 如果符合，执行下面的代码
    // 调用存储函数
    // const data = JSON.parse(req.body)
   const  {value:{noteName,Tags,datetime,category,fileId,isArchive},error} = addArticleSchema.validate(req.body);
    if(!error){
         await addarticleHandler({noteName,Tags,datetime,category,fileId,isArchive},res)
    }else{
        res.sendError(error,400)
    }
})

router.post("/tags",async(req,res)=>{
    const noteId = req.body.noteId;
    if(noteId){
        getNoteTagsByNoteIdHandler(noteId,res)
    }else{
        res.sendError("请传递noteId")
    }
})

/* 根据文章Id获取文章数据 */
router.post("/content",async(req,res)=>{
    const noteId = req.body.noteId;
    try {
        if(noteId){
            const data = await readContentNoteHandler(noteId,res)
            if(data){
              res.sendResponse("获取数据成功",data)
            }else{
                res.sendError("失败")
            }
          }else{
              res.sendError("请传递noteId")
          }
    } catch (error) {
        console.log(error)
        res.sendError("失败")
    }
    
})


module.exports = router;