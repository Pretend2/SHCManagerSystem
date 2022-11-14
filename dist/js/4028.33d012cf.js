"use strict";(self["webpackChunkshc_community_manager_system"]=self["webpackChunkshc_community_manager_system"]||[]).push([[4028],{4028:function(e,n,o){o.d(n,{Z:function(){return T}});var c=o(3396),r=o(4870),a=o(7477),l=o(4498),i=o(5306),d=o(5755),t=o(8107),s=o(9420),b=o(8080),u=o(6455),h=o(1776),k=o(8089),v=o(5608),f=o(2972),x=(0,c.h)("svg",{viewBox:"0 0 64 64",class:"check-icon"},(0,c.h)("path",{d:"M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"})),p=(0,c.h)("svg",{viewBox:"0 0 100 100",class:"line-icon"},(0,c.h)("path",{d:"M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"})),m=(o(7658),o(1295));const g=(0,m.U)("n-checkbox-group"),y={min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]};(0,c.aZ)({name:"CheckboxGroup",props:y,setup(e){const{mergedClsPrefixRef:n}=(0,s.Z)(e),o=(0,b.Z)(e),{mergedSizeRef:l,mergedDisabledRef:i}=o,d=(0,r.iH)(e.defaultValue),t=(0,c.Fl)((()=>e.value)),u=(0,a.Z)(t,d),h=(0,c.Fl)((()=>{var e;return(null===(e=u.value)||void 0===e?void 0:e.length)||0})),v=(0,c.Fl)((()=>Array.isArray(u.value)?new Set(u.value):new Set));function f(n,c){const{nTriggerFormInput:r,nTriggerFormChange:a}=o,{onChange:l,"onUpdate:value":i,onUpdateValue:t}=e;if(Array.isArray(u.value)){const e=Array.from(u.value),o=e.findIndex((e=>e===c));n?~o||(e.push(c),t&&(0,k.R)(t,e,{actionType:"check",value:c}),i&&(0,k.R)(i,e,{actionType:"check",value:c}),r(),a(),d.value=e,l&&(0,k.R)(l,e)):~o&&(e.splice(o,1),t&&(0,k.R)(t,e,{actionType:"uncheck",value:c}),i&&(0,k.R)(i,e,{actionType:"uncheck",value:c}),l&&(0,k.R)(l,e),d.value=e,r(),a())}else n?(t&&(0,k.R)(t,[c],{actionType:"check",value:c}),i&&(0,k.R)(i,[c],{actionType:"check",value:c}),l&&(0,k.R)(l,[c]),d.value=[c],r(),a()):(t&&(0,k.R)(t,[],{actionType:"uncheck",value:c}),i&&(0,k.R)(i,[],{actionType:"uncheck",value:c}),l&&(0,k.R)(l,[]),d.value=[],r(),a())}return(0,c.JJ)(g,{checkedCountRef:h,maxRef:(0,r.Vh)(e,"max"),minRef:(0,r.Vh)(e,"min"),valueSetRef:v,disabledRef:i,mergedSizeRef:l,toggleCheckbox:f}),{mergedClsPrefix:n}},render(){return(0,c.h)("div",{class:`${this.mergedClsPrefix}-checkbox-group`,role:"group"},this.$slots)}});var C=o(411),R=o(3770),w=(0,C.c)([(0,C.cB)("checkbox","\n line-height: var(--n-label-line-height);\n font-size: var(--n-font-size);\n outline: none;\n cursor: pointer;\n display: inline-flex;\n flex-wrap: nowrap;\n align-items: flex-start;\n word-break: break-word;\n --n-merged-color-table: var(--n-color-table);\n ",[(0,C.c)("&:hover",[(0,C.cB)("checkbox-box",[(0,C.cE)("border",{border:"var(--n-border-checked)"})])]),(0,C.c)("&:focus:not(:active)",[(0,C.cB)("checkbox-box",[(0,C.cE)("border","\n border: var(--n-border-focus);\n box-shadow: var(--n-box-shadow-focus);\n ")])]),(0,C.cM)("inside-table",[(0,C.cB)("checkbox-box","\n background-color: var(--n-merged-color-table);\n ")]),(0,C.cM)("checked",[(0,C.cB)("checkbox-box","\n background-color: var(--n-color-checked);\n ",[(0,C.cB)("checkbox-icon",[(0,C.c)(".check-icon","\n opacity: 1;\n transform: scale(1);\n ")])])]),(0,C.cM)("indeterminate",[(0,C.cB)("checkbox-box",[(0,C.cB)("checkbox-icon",[(0,C.c)(".check-icon","\n opacity: 0;\n transform: scale(.5);\n "),(0,C.c)(".line-icon","\n opacity: 1;\n transform: scale(1);\n ")])])]),(0,C.cM)("checked, indeterminate",[(0,C.c)("&:focus:not(:active)",[(0,C.cB)("checkbox-box",[(0,C.cE)("border","\n border: var(--n-border-checked);\n box-shadow: var(--n-box-shadow-focus);\n ")])]),(0,C.cB)("checkbox-box","\n background-color: var(--n-color-checked);\n border-left: 0;\n border-top: 0;\n ",[(0,C.cE)("border",{border:"var(--n-border-checked)"})])]),(0,C.cM)("disabled",{cursor:"not-allowed"},[(0,C.cM)("checked",[(0,C.cB)("checkbox-box","\n background-color: var(--n-color-disabled-checked);\n ",[(0,C.cE)("border",{border:"var(--n-border-disabled-checked)"}),(0,C.cB)("checkbox-icon",[(0,C.c)(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled-checked)"})])])]),(0,C.cB)("checkbox-box","\n background-color: var(--n-color-disabled);\n ",[(0,C.cE)("border",{border:"var(--n-border-disabled)"}),(0,C.cB)("checkbox-icon",[(0,C.c)(".check-icon, .line-icon",{fill:"var(--n-check-mark-color-disabled)"})])]),(0,C.cE)("label",{color:"var(--n-text-color-disabled)"})]),(0,C.cB)("checkbox-box-wrapper","\n position: relative;\n width: var(--n-size);\n flex-shrink: 0;\n flex-grow: 0;\n user-select: none;\n -webkit-user-select: none;\n "),(0,C.cB)("checkbox-box","\n position: absolute;\n left: 0;\n top: 50%;\n transform: translateY(-50%);\n height: var(--n-size);\n width: var(--n-size);\n display: inline-block;\n box-sizing: border-box;\n border-radius: var(--n-border-radius);\n background-color: var(--n-color);\n transition: background-color 0.3s var(--n-bezier);\n ",[(0,C.cE)("border","\n transition:\n border-color .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier);\n border-radius: inherit;\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n border: var(--n-border);\n "),(0,C.cB)("checkbox-icon","\n display: flex;\n align-items: center;\n justify-content: center;\n position: absolute;\n left: 1px;\n right: 1px;\n top: 1px;\n bottom: 1px;\n ",[(0,C.c)(".check-icon, .line-icon","\n width: 100%;\n fill: var(--n-check-mark-color);\n opacity: 0;\n transform: scale(0.5);\n transform-origin: center;\n transition:\n fill 0.3s var(--n-bezier),\n transform 0.3s var(--n-bezier),\n opacity 0.3s var(--n-bezier),\n border-color 0.3s var(--n-bezier);\n "),(0,R.c)({left:"1px",top:"1px"})])]),(0,C.cE)("label","\n color: var(--n-text-color);\n transition: color .3s var(--n-bezier);\n user-select: none;\n -webkit-user-select: none;\n padding: var(--n-label-padding);\n ",[(0,C.c)("&:empty",{display:"none"})])]),(0,C.ko)((0,C.cB)("checkbox","\n --n-merged-color-table: var(--n-color-table-modal);\n ")),(0,C.WW)((0,C.cB)("checkbox","\n --n-merged-color-table: var(--n-color-table-popover);\n "))]),z=o(8506);const B=Object.assign(Object.assign({},t.Z.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]});var T=(0,c.aZ)({name:"Checkbox",props:B,setup(e){const n=(0,r.iH)(null),{mergedClsPrefixRef:o,inlineThemeDisabled:d,mergedRtlRef:h}=(0,s.Z)(e),x=(0,b.Z)(e,{mergedSize(n){const{size:o}=e;if(void 0!==o)return o;if(y){const{value:e}=y.mergedSizeRef;if(void 0!==e)return e}if(n){const{mergedSize:e}=n;if(void 0!==e)return e.value}return"medium"},mergedDisabled(n){const{disabled:o}=e;if(void 0!==o)return o;if(y){if(y.disabledRef.value)return!0;const{maxRef:{value:e},checkedCountRef:n}=y;if(void 0!==e&&n.value>=e&&!T.value)return!0;const{minRef:{value:o}}=y;if(void 0!==o&&n.value<=o&&T.value)return!0}return!!n&&n.disabled.value}}),{mergedDisabledRef:p,mergedSizeRef:m}=x,y=(0,c.f3)(g,null),C=(0,r.iH)(e.defaultChecked),R=(0,r.Vh)(e,"checked"),B=(0,a.Z)(R,C),T=(0,l.Z)((()=>{if(y){const n=y.valueSetRef.value;return!(!n||void 0===e.value)&&n.has(e.value)}return B.value===e.checkedValue})),S=(0,t.Z)("Checkbox","-checkbox",w,f.Z,e,o);function F(n){if(y&&void 0!==e.value)y.toggleCheckbox(!T.value,e.value);else{const{onChange:o,"onUpdate:checked":c,onUpdateChecked:r}=e,{nTriggerFormInput:a,nTriggerFormChange:l}=x,i=T.value?e.uncheckedValue:e.checkedValue;c&&(0,k.R)(c,i,n),r&&(0,k.R)(r,i,n),o&&(0,k.R)(o,i,n),a(),l(),C.value=i}}function D(e){p.value||F(e)}function V(e){if(!p.value)switch(e.key){case" ":case"Enter":F(e)}}function $(e){switch(e.key){case" ":e.preventDefault()}}const M={focus:()=>{var e;null===(e=n.value)||void 0===e||e.focus()},blur:()=>{var e;null===(e=n.value)||void 0===e||e.blur()}},Z=(0,z.V)("Checkbox",h,o),A=(0,c.Fl)((()=>{const{value:e}=m,{common:{cubicBezierEaseInOut:n},self:{borderRadius:o,color:c,colorChecked:r,colorDisabled:a,colorTableHeader:l,colorTableHeaderModal:i,colorTableHeaderPopover:d,checkMarkColor:t,checkMarkColorDisabled:s,border:b,borderFocus:u,borderDisabled:h,borderChecked:k,boxShadowFocus:f,textColor:x,textColorDisabled:p,checkMarkColorDisabledChecked:g,colorDisabledChecked:y,borderDisabledChecked:C,labelPadding:R,labelLineHeight:w,[(0,v.T)("fontSize",e)]:z,[(0,v.T)("size",e)]:B}}=S.value;return{"--n-label-line-height":w,"--n-size":B,"--n-bezier":n,"--n-border-radius":o,"--n-border":b,"--n-border-checked":k,"--n-border-focus":u,"--n-border-disabled":h,"--n-border-disabled-checked":C,"--n-box-shadow-focus":f,"--n-color":c,"--n-color-checked":r,"--n-color-table":l,"--n-color-table-modal":i,"--n-color-table-popover":d,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":x,"--n-text-color-disabled":p,"--n-check-mark-color":t,"--n-check-mark-color-disabled":s,"--n-check-mark-color-disabled-checked":g,"--n-font-size":z,"--n-label-padding":R}})),E=d?(0,u.F)("checkbox",(0,c.Fl)((()=>m.value[0])),A,e):void 0;return Object.assign(x,M,{rtlEnabled:Z,selfRef:n,mergedClsPrefix:o,mergedDisabled:p,renderedChecked:T,mergedTheme:S,labelId:(0,i.Mc)(),handleClick:D,handleKeyUp:V,handleKeyDown:$,cssVars:d?void 0:A,themeClass:null===E||void 0===E?void 0:E.themeClass,onRender:null===E||void 0===E?void 0:E.onRender})},render(){var e;const{$slots:n,renderedChecked:o,mergedDisabled:r,indeterminate:a,privateInsideTable:l,cssVars:i,labelId:t,label:s,mergedClsPrefix:b,focusable:u,handleKeyUp:k,handleKeyDown:v,handleClick:f}=this;return null===(e=this.onRender)||void 0===e||e.call(this),(0,c.h)("div",{ref:"selfRef",class:[`${b}-checkbox`,this.themeClass,this.rtlEnabled&&`${b}-checkbox--rtl`,o&&`${b}-checkbox--checked`,r&&`${b}-checkbox--disabled`,a&&`${b}-checkbox--indeterminate`,l&&`${b}-checkbox--inside-table`],tabindex:r||!u?void 0:0,role:"checkbox","aria-checked":a?"mixed":o,"aria-labelledby":t,style:i,onKeyup:k,onKeydown:v,onClick:f,onMousedown:()=>{(0,d.on)("selectstart",window,(e=>{e.preventDefault()}),{once:!0})}},(0,c.h)("div",{class:`${b}-checkbox-box-wrapper`}," ",(0,c.h)("div",{class:`${b}-checkbox-box`},(0,c.h)(h.Z,null,{default:()=>this.indeterminate?(0,c.h)("div",{key:"indeterminate",class:`${b}-checkbox-icon`},p):(0,c.h)("div",{key:"check",class:`${b}-checkbox-icon`},x)}),(0,c.h)("div",{class:`${b}-checkbox-box__border`}))),null!==s||n.default?(0,c.h)("span",{class:`${b}-checkbox__label`,id:t},n.default?n.default():s):null)}})}}]);
//# sourceMappingURL=4028.33d012cf.js.map