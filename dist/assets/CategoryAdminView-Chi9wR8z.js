import{bz as q,l as X,r as p,s as Y,w as Z,o as ee,bj as ae,aV as s,d,f as c,p as o,af as t,H as y,aF as le,ba as te,bb as oe,ag as ne,bc as re,F as _,v as I,bd as se,k as b,h as U,g as i,G as B,bC as de,u as k,bA as ie,_ as ue}from"./index-CKb1g0gP.js";import{E as pe,a as me}from"./el-table-column-BtqCWYaW.js";import"./el-checkbox-BY2y9xrT.js";import{E as fe}from"./el-popover-CYDQSfoj.js";import{b as ce}from"./buildTreeFromList-wDdEcBgZ.js";import{v as L}from"./validate-CdMOi96S.js";import{c as ve,a as T,b as ge}from"./index.esm-DueM3VUK.js";import{p as $}from"./permissionValidate-DlOLNRd5.js";const N=ve({name:ge().required("姓名是必须的"),parentId:T().required("父类是必须的"),level:T().required("级别是必须的")}),ye=async m=>await q({url:"/category/addcategory",method:"post",data:m}),_e=async(m,x)=>await q({url:`/category/updatecategory/${m}`,method:"post",data:x}),be=async m=>await q({url:"/category/removecategory",method:"get",params:{id:m}}),we={class:"CategoryAdminView-container"},Ce={class:"dialog-footer"},Ve={style:{"margin-left":"10px"}},Ee={style:{display:"flex","align-items":"center"}},Ie={style:{"margin-left":"10px"}},ke={style:{display:"flex","align-items":"center"}},xe={style:{"margin-left":"10px"}},he=X({__name:"CategoryAdminView",setup(m){const x=async n=>{if(!$("category.delete"))return!1;const e=n.id,{code:r,ErrorMessage:u}=await be(e);r==200?(s({message:"删除分类成功",type:"success"}),w()):s({message:u||"删除分类失败",type:"error"})},v=p([]);async function w(){try{const{code:n,ErrorMessage:e,data:r}=await ae();if(n==200){const u=ce(r,"id","parent_id","children",0);v.value=u,s({message:"获取数据成功",type:"success"})}else s({message:e||"获取数据失败",type:"error"})}catch{s({message:"获取数据失败",type:"error"})}}const f=p(!1),h=p(0),G=Y(()=>h.value?"更新分类":"添加分类"),C=p(0),D=p([]);Z(()=>C.value,n=>{v.value.forEach(e=>{e.id==n&&e.children&&(D.value=e.children)})});const l=p({name:"",parentId:0,level:1});function S(n){n===1&&(l.value.parentId=0)}function z(n){f.value=!0,h.value=n}function H(){l.value={name:"",parentId:0,level:1},C.value=0,D.value=[]}async function O(){if(l.value.level!==1&&l.value.parentId==0)return s({message:"父类没有选择",type:"warning"});const{valid:n,errors:e}=await L(N,l.value);if(!n)return s({message:e[0],type:"warning"});const{code:r,ErrorMessage:u}=await ye(l.value);r==200?(s({message:"添加分类成功",type:"success"}),w(),f.value=!1):s({message:u||"添加分类失败",type:"error"})}const M=p(0),P=n=>{M.value=n.id,l.value.name=n.name,l.value.level=n.level,l.value.parentId=n.parent_id,z(1)};async function j(){if(l.value.level!==1&&l.value.parentId==0)return s({message:"父类没有选择",type:"warning"});const{valid:n,errors:e}=await L(N,l.value);if(!n)return s({message:e[0],type:"warning"});const{code:r,ErrorMessage:u}=await _e(M.value,l.value);r==200?(s({message:"更新分类成功",type:"success"}),w(),f.value=!1):s({message:u||"更新分类失败",type:"error"})}function R(){if(h.value===0){if(!$("category.add"))return!1;O()}else{if(!$("category.edit"))return!1;j()}}return ee(()=>{w()}),(n,e)=>{const r=le,u=ne,A=oe,V=se,E=re,J=te,K=de,g=pe,Q=fe,W=me;return d(),c("div",we,[o(r,{class:"add-btn",type:"primary",onClick:e[0]||(e[0]=a=>z(0))},{default:t(()=>e[8]||(e[8]=[y("添加分类")])),_:1}),o(K,{modelValue:f.value,"onUpdate:modelValue":e[7]||(e[7]=a=>f.value=a),title:B(G),width:"30%",onClose:H},{footer:t(()=>[i("span",Ce,[o(r,{onClick:e[6]||(e[6]=a=>f.value=!1)},{default:t(()=>e[11]||(e[11]=[y("取 消")])),_:1}),o(r,{type:"primary",onClick:R},{default:t(()=>e[12]||(e[12]=[y("确 定")])),_:1})])]),default:t(()=>[o(J,{ref:"form",model:l.value,"label-width":"80px"},{default:t(()=>[o(A,{label:"分类名",prop:"name"},{default:t(()=>[o(u,{modelValue:l.value.name,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.name=a),modelModifiers:{trim:!0},minlength:"4"},null,8,["modelValue"])]),_:1}),o(A,{label:"分类级别",prop:"level"},{default:t(()=>[o(E,{modelValue:l.value.level,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.level=a),placeholder:"选择",size:"default",style:{width:"240px"},onChange:S},{default:t(()=>[(d(),c(_,null,I([1,2,3],(a,F)=>o(V,{key:F,label:a,value:a},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),l.value.level!==1?(d(),b(A,{key:0,label:"父类",prop:"parentId"},{default:t(()=>[l.value.level===2?(d(),b(E,{key:0,modelValue:l.value.parentId,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.parentId=a),placeholder:"一级分类",size:"small",style:{width:"240px"}},{default:t(()=>[(d(!0),c(_,null,I(v.value,a=>(d(),b(V,{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):U("",!0),l.value.level===3?(d(),c(_,{key:1},[i("div",null,[e[9]||(e[9]=i("span",null,"一级分类：",-1)),o(E,{modelValue:C.value,"onUpdate:modelValue":e[4]||(e[4]=a=>C.value=a),placeholder:"一级分类",size:"small",style:{width:"240px"},"default-first-option":""},{default:t(()=>[(d(!0),c(_,null,I(v.value,a=>(d(),b(V,{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),i("div",null,[e[10]||(e[10]=i("span",null,"二级分类：",-1)),o(E,{modelValue:l.value.parentId,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.parentId=a),placeholder:"二级分类",size:"small",style:{width:"240px"}},{default:t(()=>[(d(!0),c(_,null,I(D.value,a=>(d(),b(V,{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])],64)):U("",!0)]),_:1})):U("",!0)]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),o(W,{"row-key":"id",border:"",data:v.value,style:{width:"100%"}},{default:t(()=>[o(g,{label:"分类ID",width:"180"},{default:t(a=>[i("span",Ve,k(a.row.id),1)]),_:1}),o(g,{label:"类名"},{default:t(a=>[i("div",null,k(a.row.name),1)]),_:1}),o(g,{label:"父级ID",width:"180"},{default:t(a=>[i("div",Ee,[i("span",Ie,k(a.row.parent_id),1)])]),_:1}),o(g,{label:"级别",width:"180"},{default:t(a=>[i("div",ke,[i("span",xe,k(a.row.level),1)])]),_:1}),o(g,{label:"操作"},{default:t(a=>[o(r,{icon:"Edit",type:"default",size:"small",onClick:F=>P(a.row)},{default:t(()=>e[13]||(e[13]=[y(" 编辑 ")])),_:2},1032,["onClick"]),o(Q,{icon:B(ie),title:"确定要删除这个吗?",onConfirm:F=>x(a.row)},{reference:t(()=>[o(r,{icon:"Delete",size:"small",type:"danger"},{default:t(()=>e[14]||(e[14]=[y(" 删除 ")])),_:1})]),_:2},1032,["icon","onConfirm"])]),_:1})]),_:1},8,["data"])])}}}),Be=ue(he,[["__scopeId","data-v-da3a4186"]]);export{Be as default};