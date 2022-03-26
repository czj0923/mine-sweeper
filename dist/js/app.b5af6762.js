(function(e){function t(t){for(var n,o,u=t[0],i=t[1],l=t[2],s=0,d=[];s<u.length;s++)o=u[s],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);f&&f(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==c[u]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={app:0},c={app:0},a=[];function u(e){return i.p+"js/"+({MineSweeper:"MineSweeper"}[e]||e)+"."+{MineSweeper:"b360ba9f"}[e]+".js"}function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[],r={MineSweeper:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise((function(t,r){for(var n="css/"+({MineSweeper:"MineSweeper"}[e]||e)+"."+{MineSweeper:"3a98439e"}[e]+".css",c=i.p+n,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===n||s===c))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){l=d[u],s=l.getAttribute("data-href");if(s===n||s===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete o[e],f.parentNode.removeChild(f),r(a)},f.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var n=c[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,r){n=c[e]=[t,r]}));t.push(n[2]=a);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=u(e);var d=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(f);var r=c[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,r[1](d)}c[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=s;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"374d":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),o=(r("64e5"),r("9d75"),{id:"nav"}),c=Object(n["createElementVNode"])("h4",null,[Object(n["createElementVNode"])("span",{class:"badge secondary"},"扫雷小游戏")],-1);function a(e,t,r,a,u,i){var l=Object(n["resolveComponent"])("router-link"),s=Object(n["resolveComponent"])("router-view"),d=Object(n["resolveComponent"])("Alert");return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createElementVNode"])("div",o,[Object(n["createVNode"])(l,{to:"/"},{default:Object(n["withCtx"])((function(){return[c]})),_:1})]),Object(n["createVNode"])(s),Object(n["createVNode"])(d)],64)}function u(e,t,r,o,c,a){return Object(n["openBlock"])(),Object(n["createBlock"])(n["Teleport"],{to:"body"},[Object(n["createVNode"])(n["TransitionGroup"],{name:"alert",tag:"ul",class:"alert-group"},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(o.store.alertQueue,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("li",{key:e.id,class:Object(n["normalizeClass"])(["alert",["alert-".concat(e.type)]])},Object(n["toDisplayString"])(e.content),3)})),128))]})),_:1})])}var i=r("a4f5"),l={name:"Alert",setup:function(){var e=Object(i["a"])();return{store:e}}},s=(r("f739"),r("6b0d")),d=r.n(s);const f=d()(l,[["render",u],["__scopeId","data-v-89c7597c"]]);var p=f,b={name:"App",components:{Alert:p},setup:function(){var e=Object(i["a"])(),t=JSON.parse(localStorage.getItem("record"));e.refreshRecord(t)}};r("a693");const h=d()(b,[["render",a]]);var m=h,j=(r("d3b7"),r("3ca3"),r("ddb0"),r("6c02")),v=[{path:"/",name:"MineSweeper",component:function(){return r.e("MineSweeper").then(r.bind(null,"0dbf"))}}],g=Object(j["a"])({history:Object(j["b"])(),routes:v}),O=g,y=r("be92"),w=Object(n["createApp"])(m),S=Object(y["a"])();w.use(O),w.use(S),w.mount("#app")},"9d75":function(e,t,r){},a4f5:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));r("d3b7"),r("159b"),r("b64b"),r("e9c4");var n=r("be92"),o=Object(n["b"])("main",{state:function(){return{id:0,alertQueue:[],record:{cj:0,zj:0,gj:0}}},getters:{getRecord:function(e){return{cj:"初级纪录 ".concat(e.record.cj,"秒"),zj:"中级纪录 ".concat(e.record.zj,"秒"),gj:"高级纪录 ".concat(e.record.gj,"秒")}}},actions:{addAlert:function(e){var t=this;this.$patch((function(e){return e.id++})),this.alertQueue.length>1&&this.alertQueue.shift(),this.alertQueue.push(Object.assign(e,{id:this.id})),setTimeout((function(){t.alertQueue.shift()}),2e3)},refreshRecord:function(e){var t=this;Object.keys(e).forEach((function(r){(e[r]<t.record[r]||!t.record[r])&&(t.record[r]=e[r])}));var r=this.record;window.localStorage.setItem("record",JSON.stringify(r))}}})},a693:function(e,t,r){"use strict";r("374d")},e710:function(e,t,r){},f739:function(e,t,r){"use strict";r("e710")}});
//# sourceMappingURL=app.b5af6762.js.map