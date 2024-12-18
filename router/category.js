const express = require("express");
const router = express.Router();
const { addCategoriesHanlder, removeCategory, updateCategoryHandler } = require("../router_handler/categories");
const { addCategoriesSchema } = require("../schema/categories");


/* 添加文类的信息 */
router.post('/addcategory',async(req,res)=>{
    const {value:{name,parentId,level},error} = addCategoriesSchema.validate(req.body);
    if(!error){
        await addCategoriesHanlder({name,parentId,level},res);
    }else{
        res.sendError(error,400);
    }    
})

/* 删除分类的信息 */
router.get('/removecategory',async(req,res)=>{
    const id= Number(req.query?.id);
    
    if(typeof id ==='number' && id >=0){
        await removeCategory(id,res);
    }else{
        res.sendError('id不正确',400);
    }
})


/* 更新文章的分类 */
router.post('/updatecategory/:id',async(req,res)=>{
    const {id} = req.params;
    const {value:{name,parentId,level},error} = addCategoriesSchema.validate(req.body);
    if(!error){
        await updateCategoryHandler({id,name,parentId,level},res);
    }else{
        res.sendError(error,400);
    }    
})

module.exports = router
