import{l as i,bm as c,b6 as u,o as l,bx as d,by as p,d as m,f,g as a,_ as g}from"./index-CKb1g0gP.js";const _={class:"loading-container"},h=5e3,y=i({__name:"LoadDynamicRoute",setup(w){const t=c(),s=u();let r=null;async function n(e){try{if(e===s.fullPath){console.warn("Redirect target is the current page, cancelling navigation.");return}e.startsWith("/center")?await t.replace({path:e}):t.push("/404")}catch(o){console.error("Navigation Error:",o),t.push("/404")}}return l(async()=>{try{r=window.setTimeout(()=>{console.error("Loading timeout, redirecting to /404..."),t.push("/404")},h);const e=d("permissions");await p(e,[]);const o=s.query.redirect||"";o?await n(o):t.push("/404")}catch(e){console.error("Error loading user info or route:",e),t.push("/404")}finally{r&&clearTimeout(r)}}),(e,o)=>(m(),f("div",_,o[0]||(o[0]=[a("div",{class:"spinner"},null,-1),a("p",{class:"loading-text"},"正在加载页面，请稍候...",-1)])))}}),v=g(y,[["__scopeId","data-v-35262289"]]);export{v as default};
