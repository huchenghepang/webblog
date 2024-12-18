const express = require("express");
const router = express.Router();
const { deleteCommentHandler, editCommentHandler, auditCommentHandler, getCommentsByArticleHandler, getCommentsByUserHandler, addCommentHandler, getCommentsByAdminHandler, deleteCommentsAdminHandler, auditCommentsAdminHandler, toggleCommentLike, getPendingCommentsCount } = require("../router_handler/comment");


/* 添加评论 */
router.post('/add', addCommentHandler);
/* 删除评论 */
router.post('/remove', deleteCommentHandler);
/* 编辑评论 */
router.post('/edit', editCommentHandler);
/* 审核评论 */
router.post('/audit', auditCommentHandler);
/* 根据文章id获取评论 */
router.post('/get', getCommentsByArticleHandler);
/* 根据用户id获取评论 */
router.post('/user',getCommentsByUserHandler);
/* 切换点赞的状态 */
router.post("/togglelike",toggleCommentLike)

/* 管理员获取所有评论 */
router.post('/admin', getCommentsByAdminHandler);
/* 批量删除 */
router.post("/admin/delete",deleteCommentsAdminHandler)
/* 批量审核 */
router.post('/admin/batch/review',auditCommentsAdminHandler)
/* 查询多少条评论还没有审核 */
router.post('/admin/noreview',getPendingCommentsCount)
module.exports = router