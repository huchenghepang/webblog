import{Q as j,b_ as J,aM as w,as as N,bH as $,bZ as V,S as B,X as F,r as E,q as O,s as v,bI as z,aa as W,c9 as X,ca as Y,Z as R,l as _,a0 as k,d as I,f as G,g as y,x as P,cb as A,G as e,J as h,D as U,i as b,aQ as D,a2 as C,H as x,u as K,n as ee,U as ae,bU as oe,a6 as le,cc as se,o as ne,B as te,a as re,C as ie,w as de,a9 as ue,aG as ce,cd as L}from"./index-CKb1g0gP.js";const Ve=a=>[...new Set(a)],Re=a=>!a&&a!==0?[]:j(a)?a:[a],M=B({modelValue:{type:[String,Number,Boolean],default:void 0},size:F,disabled:Boolean,label:{type:[String,Number,Boolean],default:void 0},value:{type:[String,Number,Boolean],default:void 0},name:{type:String,default:void 0}}),pe=B({...M,border:Boolean}),T={[V]:a=>w(a)||N(a)||$(a),[J]:a=>w(a)||N(a)||$(a)},q=Symbol("radioGroupKey"),H=(a,u)=>{const s=E(),o=O(q,void 0),i=v(()=>!!o),c=v(()=>z(a.value)?a.label:a.value),r=v({get(){return i.value?o.modelValue:a.modelValue},set(n){i.value?o.changeEvent(n):u&&u(V,n),s.value.checked=a.modelValue===c.value}}),d=W(v(()=>o==null?void 0:o.size)),l=X(v(()=>o==null?void 0:o.disabled)),t=E(!1),p=v(()=>l.value||i.value&&r.value!==c.value?-1:0);return Y({from:"label act as value",replacement:"value",version:"3.0.0",scope:"el-radio",ref:"https://element-plus.org/en-US/component/radio.html"},v(()=>i.value&&z(a.value))),{radioRef:s,isGroup:i,radioGroup:o,focus:t,size:d,disabled:l,tabIndex:p,modelValue:r,actualValue:c}},fe=_({name:"ElRadio"}),ve=_({...fe,props:pe,emits:T,setup(a,{emit:u}){const s=a,o=k("radio"),{radioRef:i,radioGroup:c,focus:r,size:d,disabled:l,modelValue:t,actualValue:p}=H(s,u);function n(){U(()=>u("change",t.value))}return(f,g)=>{var m;return I(),G("label",{class:b([e(o).b(),e(o).is("disabled",e(l)),e(o).is("focus",e(r)),e(o).is("bordered",f.border),e(o).is("checked",e(t)===e(p)),e(o).m(e(d))])},[y("span",{class:b([e(o).e("input"),e(o).is("disabled",e(l)),e(o).is("checked",e(t)===e(p))])},[P(y("input",{ref_key:"radioRef",ref:i,"onUpdate:modelValue":S=>D(t)?t.value=S:null,class:b(e(o).e("original")),value:e(p),name:f.name||((m=e(c))==null?void 0:m.name),disabled:e(l),checked:e(t)===e(p),type:"radio",onFocus:S=>r.value=!0,onBlur:S=>r.value=!1,onChange:n,onClick:h(()=>{},["stop"])},null,42,["onUpdate:modelValue","value","name","disabled","checked","onFocus","onBlur","onClick"]),[[A,e(t)]]),y("span",{class:b(e(o).e("inner"))},null,2)],2),y("span",{class:b(e(o).e("label")),onKeydown:h(()=>{},["stop"])},[C(f.$slots,"default",{},()=>[x(K(f.label),1)])],42,["onKeydown"])],2)}}});var be=R(ve,[["__file","radio.vue"]]);const me=B({...M}),ye=_({name:"ElRadioButton"}),_e=_({...ye,props:me,setup(a){const u=a,s=k("radio"),{radioRef:o,focus:i,size:c,disabled:r,modelValue:d,radioGroup:l,actualValue:t}=H(u),p=v(()=>({backgroundColor:(l==null?void 0:l.fill)||"",borderColor:(l==null?void 0:l.fill)||"",boxShadow:l!=null&&l.fill?`-1px 0 0 0 ${l.fill}`:"",color:(l==null?void 0:l.textColor)||""}));return(n,f)=>{var g;return I(),G("label",{class:b([e(s).b("button"),e(s).is("active",e(d)===e(t)),e(s).is("disabled",e(r)),e(s).is("focus",e(i)),e(s).bm("button",e(c))])},[P(y("input",{ref_key:"radioRef",ref:o,"onUpdate:modelValue":m=>D(d)?d.value=m:null,class:b(e(s).be("button","original-radio")),value:e(t),type:"radio",name:n.name||((g=e(l))==null?void 0:g.name),disabled:e(r),onFocus:m=>i.value=!0,onBlur:m=>i.value=!1,onClick:h(()=>{},["stop"])},null,42,["onUpdate:modelValue","value","name","disabled","onFocus","onBlur","onClick"]),[[A,e(d)]]),y("span",{class:b(e(s).be("button","inner")),style:ee(e(d)===e(t)?e(p):{}),onKeydown:h(()=>{},["stop"])},[C(n.$slots,"default",{},()=>[x(K(n.label),1)])],46,["onKeydown"])],2)}}});var Q=R(_e,[["__file","radio-button.vue"]]);const ge=B({id:{type:String,default:void 0},size:F,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:void 0},fill:{type:String,default:""},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0},...ae(["ariaLabel"])}),he=T,Be=_({name:"ElRadioGroup"}),Se=_({...Be,props:ge,emits:he,setup(a,{emit:u}){const s=a,o=k("radio"),i=oe(),c=E(),{formItem:r}=le(),{inputId:d,isLabeledByFormItem:l}=se(s,{formItemContext:r}),t=n=>{u(V,n),U(()=>u("change",n))};ne(()=>{const n=c.value.querySelectorAll("[type=radio]"),f=n[0];!Array.from(n).some(g=>g.checked)&&f&&(f.tabIndex=0)});const p=v(()=>s.name||i.value);return te(q,re({...ie(s),changeEvent:t,name:p})),de(()=>s.modelValue,()=>{s.validateEvent&&(r==null||r.validate("change").catch(n=>ue()))}),(n,f)=>(I(),G("div",{id:e(d),ref_key:"radioGroupRef",ref:c,class:b(e(o).b("group")),role:"radiogroup","aria-label":e(l)?void 0:n.ariaLabel||"radio-group","aria-labelledby":e(l)?e(r).labelId:void 0},[C(n.$slots,"default")],10,["id","aria-label","aria-labelledby"]))}});var Z=R(Se,[["__file","radio-group.vue"]]);const ke=ce(be,{RadioButton:Q,RadioGroup:Z}),Ie=L(Z);L(Q);export{Ie as E,ke as a,Re as c,Ve as u};
