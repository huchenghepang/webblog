const express = require('express');
const router = express.Router();


// 引入数据验证的规则
const {getArticleListSchema} = require('../schema/article');
const {getArticleListHandler,getArticleAnalyzeDataHandler, readContentNoteMDHandler, addReading } = require('../router_handler/articles');


/* 获取获取10条文章数据 */
router.get('/getarticles',(req,res)=>{
    const {value:{page,pageSize,keyword,tagName,datetimeStart,datetimeEnd,categoryName},error} = getArticleListSchema.validate(req.query);

    if(!error){
        getArticleListHandler({page,pageSize,keyword,tagName,datetimeStart,datetimeEnd,categoryName},res)
    }else{
        res.sendError(error,400);
    }
} )

router.get('/getArticleAnalyzeData',async (req,res)=>{
    await getArticleAnalyzeDataHandler(req,res)
})

/* 读取返回笔记内容 */
router.get("/getArticleContent",async (req,res)=>{
    const {fileId} = req.query;
    if(fileId && typeof fileId === "string"){
        // 调用读取函数
        const data = await readContentNoteMDHandler(fileId);
        res.sendResponse("获取文章内容成功", data);
        if(data?.noteId){
            addReading(data.noteId)
        }
    }else{
        res.sendError("fileId 不能为空",400)
    }
})



module.exports = router;