import{S as x,c3 as g,cW as z,bQ as I,cX as C,Z as V,l as P,a5 as _,a0 as A,r as D,s as i,cY as G,d as c,k as p,af as s,a2 as k,h as S,g as f,i as a,G as t,ai as M,n as R,ak as q,H as u,u as d,p as b,aF as E,a3 as F,al as H,aG as L}from"./index-CKb1g0gP.js";const Q=x({title:String,confirmButtonText:String,cancelButtonText:String,confirmButtonType:{type:String,values:C,default:"primary"},cancelButtonType:{type:String,values:C,default:"text"},icon:{type:I,default:()=>z},iconColor:{type:String,default:"#f90"},hideIcon:{type:Boolean,default:!1},hideAfter:{type:Number,default:200},teleported:g.teleported,persistent:g.persistent,width:{type:[String,Number],default:150}}),U={confirm:o=>o instanceof MouseEvent,cancel:o=>o instanceof MouseEvent},W=P({name:"ElPopconfirm"}),X=P({...W,props:Q,emits:U,setup(o,{emit:m}){const l=o,{t:y}=_(),n=A("popconfirm"),B=D(),T=()=>{var e,r;(r=(e=B.value)==null?void 0:e.onClose)==null||r.call(e)},N=i(()=>({width:G(l.width)})),v=e=>{m("confirm",e),T()},h=e=>{m("cancel",e),T()},w=i(()=>l.confirmButtonText||y("el.popconfirm.confirmButtonText")),$=i(()=>l.cancelButtonText||y("el.popconfirm.cancelButtonText"));return(e,r)=>(c(),p(t(H),F({ref_key:"tooltipRef",ref:B,trigger:"click",effect:"light"},e.$attrs,{"popper-class":`${t(n).namespace.value}-popover`,"popper-style":t(N),teleported:e.teleported,"fallback-placements":["bottom","top","right","left"],"hide-after":e.hideAfter,persistent:e.persistent}),{content:s(()=>[f("div",{class:a(t(n).b())},[f("div",{class:a(t(n).e("main"))},[!e.hideIcon&&e.icon?(c(),p(t(M),{key:0,class:a(t(n).e("icon")),style:R({color:e.iconColor})},{default:s(()=>[(c(),p(q(e.icon)))]),_:1},8,["class","style"])):S("v-if",!0),u(" "+d(e.title),1)],2),f("div",{class:a(t(n).e("action"))},[k(e.$slots,"actions",{confirm:v,cancel:h},()=>[b(t(E),{size:"small",type:e.cancelButtonType==="text"?"":e.cancelButtonType,text:e.cancelButtonType==="text",onClick:h},{default:s(()=>[u(d(t($)),1)]),_:1},8,["type","text"]),b(t(E),{size:"small",type:e.confirmButtonType==="text"?"":e.confirmButtonType,text:e.confirmButtonType==="text",onClick:v},{default:s(()=>[u(d(t(w)),1)]),_:1},8,["type","text"])])],2)],2)]),default:s(()=>[e.$slots.reference?k(e.$slots,"reference",{key:0}):S("v-if",!0)]),_:3},16,["popper-class","popper-style","teleported","hide-after","persistent"]))}});var Y=V(X,[["__file","popconfirm.vue"]]);const j=L(Y);export{j as E};