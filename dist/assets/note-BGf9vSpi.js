import{c as o,d,b as t,e as s,a}from"./index.esm-DueM3VUK.js";import{bz as r}from"./index-CKb1g0gP.js";const c=o().shape({name:t().max(100,"名称不能超过100个字符").required("名称是必填项"),summary:t().max(200,"摘要不能超过200个字符").required("摘要是必填项"),text:t().required("内容是必填项"),categoryId:a().required("分类ID是必填项"),isArchived:s().required("归档状态是必填项"),tags:d().of(t().trim().min(1,"标签不能为空")).required("标签是必填项").min(1,"至少需要一个标签")}),u=o().shape({noteId:a().required("笔记ID是必填项"),fileId:t().required("文件ID是必填项"),name:t().max(100,"名称不能超过100个字符").required("名称是必填项"),summary:t().max(200,"摘要不能超过200个字符").required("摘要是必填项"),text:t().required("内容是必填项"),categoryId:a().required("分类ID是必填项"),isArchived:s().required("归档状态是必填项"),tags:d().of(t().trim().min(1,"标签不能为空")).required("标签是必填项").min(1,"至少需要一个标签")}),m=o().shape({noteId:a().required("笔记ID是必填项"),fileId:t().required("文件ID是必填项")}),q=o().shape({noteId:a().required("笔记ID是必填项"),isArchived:s().required("归档状态是必填项")}),h=async e=>await r({url:"/note/info",method:"get",params:e}),l=async e=>await r({url:"/note/add",method:"post",data:e}),g=async e=>await r({url:"/note/update",method:"post",data:e}),p=async e=>await r({url:"/note/delete",method:"delete",params:e}),I=async e=>await r({url:"/note/archive",method:"get",params:e}),y=async e=>await r({url:"/note/tags",method:"post",data:{noteId:e}}),N=async e=>await r({url:"/note/content",method:"post",data:{noteId:e}});export{N as a,c as b,l as c,g as d,h as e,I as f,m as g,p as h,y as r,q as t,u};
