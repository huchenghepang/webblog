import{l as L,r as y,bl as k,b1 as N,b6 as S,bm as q,w as E,b9 as A,o as B,c as w,d as s,f as u,g as i,F as f,v as h,i as z,u as x,H as I,G as R,p as C,af as T,k as V,a_ as M,_ as G}from"./index-CKb1g0gP.js";import{M as D}from"./Meteor-C7q4Z0iy.js";import{A as F}from"./ArticleItem-DLn0cnZn.js";const O={class:"category-page"},U={class:"category-container"},Y=["data-index"],j={class:"category-list-container"},J=L({__name:"CategoryView",setup(K){const o=y({cateName:"",cateItemList:[]}),l=y(null),c=y({currentPage:1,pageSize:5,totalPages:0}),g=k(),{categoryCounts:d}=N(g);function v(){l.value=null,c.value={currentPage:1,pageSize:5,totalPages:0},o.value={cateName:"",cateItemList:[]}}function b(t){const a=t.currentTarget.dataset.index;if(a){const e=parseInt(a);l.value=e;const n=d.value[e].category_name;if(n==r.query.categoryname)return;v(),H.push({name:"category",query:{categoryname:n}})}}async function m(){try{const{data:t,code:a}=await A({categoryName:o.value.cateName,page:c.value.currentPage,pageSize:c.value.pageSize});if(a==200){o.value.cateItemList=[...o.value.cateItemList,...t.data];const e=d.value.findIndex((n,_)=>n.category_name==o.value.cateName);l.value=e,c.value.totalPages=t.totalPages}}catch{}}const r=S(),H=q();E(()=>r.query.categoryname,(t,a)=>{t&&t!==a&&(v(),t!==""&&typeof t=="string"&&(o.value.cateName=t,m()))});function P(){o.value.cateName!==""&&c.value.currentPage<c.value.totalPages&&(c.value.currentPage++,m())}function p(){const t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);window.pageYOffset+document.body.clientHeight+40>=t&&(console.log("触底了"),P())}return B(()=>{g.categoryCounts.length===0&&g.getAricleTagAndCategoryInfo(),r.query.categoryname&&typeof r.query.categoryname=="string"&&(o.value.cateName=r.query.categoryname,m()),document.addEventListener("scroll",p)}),w(()=>{document.removeEventListener("scroll",p)}),(t,a)=>(s(),u(f,null,[i("div",O,[i("div",U,[(s(!0),u(f,null,h(R(d),(e,n)=>(s(),u("div",{key:n,"data-index":n,class:z(["category-item",{"active-tag":l.value===n}]),onClick:a[0]||(a[0]=_=>b(_))},[i("span",null,x(e.category_name),1),a[1]||(a[1]=I(" ( ")),i("i",null,x(e.note_count),1),a[2]||(a[2]=I(" ) "))],10,Y))),128)),i("div",j,[C(M,{name:"item-transition"},{default:T(()=>[(s(!0),u(f,null,h(o.value.cateItemList,(e,n)=>(s(),V(F,{key:e.note_id,style:{width:"100%"},content:e.summary,datetime:e.create_time,title:e.note_name,tags:e.tags,category:e.note_category,"file-id":e.file_id,toc:e.toc},null,8,["content","datetime","title","tags","category","file-id","toc"]))),128))]),_:1})])])]),C(D,{number:30})],64))}}),Z=G(J,[["__scopeId","data-v-c49670b3"]]);export{Z as default};
