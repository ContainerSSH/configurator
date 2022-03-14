(function(e){function t(t){for(var o,a,c=t[0],s=t[1],u=t[2],f=0,p=[];f<c.length;f++)a=c[f],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},i=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("Home")],1)],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Configurator")},c=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-form",{model:{value:e.configurationForm,callback:function(t){e.configurationForm=t},expression:"configurationForm"}},[n("v-stepper",{attrs:{vertical:""},model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[n("v-stepper-step",{attrs:{complete:e.isCompleted(1),step:"1"},on:{click:function(t){return e.goToStep(1)}}},[e._v(" Welcome ")]),n("v-stepper-content",{attrs:{step:"1"}},[n("Welcome",{attrs:{configuration:e.configuration}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.goToStep(2)}}},[e._v(" Start configuring ")])],1),n("v-stepper-step",{attrs:{complete:e.isCompleted(2),step:"2"},on:{click:function(t){e.isCompleted(2)&&e.goToStep(2)}}},[e._v(" Authentication "),n("small",{directives:[{name:"show",rawName:"v-show",value:e.isCompleted(2),expression:"isCompleted(2)"}],staticClass:"mt-1"},[e._v(" Webhook URL: "),n("pre",{staticClass:"d-inline"},[e._v(e._s(e.configuration.authentication.webhook.url))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.configuration.authentication.webhook.url.startsWith("http:"),expression:"configuration.authentication.webhook.url.startsWith('http:')"}]},[e._v(" without TLS-encryption ")])])]),n("v-stepper-content",{attrs:{step:"2"}},[n("Authentication",{attrs:{configuration:e.configuration}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.goToStep(3)}}},[e._v(" Continue ")]),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.goToStep(1)}}},[e._v(" Back ")])],1),n("v-stepper-step",{attrs:{complete:e.isCompleted(3),step:"3"},on:{click:function(t){e.isCompleted(3)&&e.goToStep(3)}}},[e._v(" Dynamic configuration "),n("small",{directives:[{name:"show",rawName:"v-show",value:e.isCompleted(3),expression:"isCompleted(3)"}],staticClass:"mt-1"},[e._v(" Config server URL: "),n("pre",{staticClass:"d-inline"},[e._v(e._s(e.configuration.dynamicConfiguration.server.url))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.configuration.dynamicConfiguration.server.url.startsWith("http:"),expression:"configuration.dynamicConfiguration.server.url.startsWith('http:')"}]},[e._v(" without TLS-encryption ")])])]),n("v-stepper-content",{attrs:{step:"3"}},[n("DynamicConfiguration",{attrs:{configuration:e.configuration}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.goToStep(4)}}},[e._v(" Continue ")]),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.goToStep(2)}}},[e._v(" Back ")])],1),n("v-stepper-step",{attrs:{complete:e.isCompleted(4),step:"4"},on:{click:function(t){e.isCompleted(4)&&e.goToStep(4)}}},[e._v(" Backend "),n("small",{directives:[{name:"show",rawName:"v-show",value:e.isCompleted(4),expression:"isCompleted(4)"}],staticClass:"mt-1"},[e._v(" Using: "),n("pre",{staticClass:"d-inline"},[e._v(e._s(e.configuration.backend.backend))])])]),n("v-stepper-content",{attrs:{step:"4"}},[n("Backend",{attrs:{configuration:e.configuration}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.step=5}}},[e._v(" Continue ")]),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.goToStep(3)}}},[e._v(" Back ")])],1),n("v-stepper-step",{attrs:{complete:e.isCompleted(5),step:"5"}},[e._v(" Deployment ")]),n("v-stepper-content",{attrs:{step:"5"}},[n("v-card",{staticClass:"mb-12",attrs:{color:"grey lighten-1",height:"200px"}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.goToStep(1)}}},[n("v-icon",[e._v(e._s(e.icons.mdiTrayArrowDown))]),e._v(" Download ")],1),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.goToStep(1)}}},[e._v(" Create new ")]),n("v-btn",{attrs:{text:""},on:{click:function(t){return e.goToStep(4)}}},[e._v(" Back ")])],1)],1)],1)},u=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",[n("p",[e._v("In the next few steps, we'll guide you through the main ContainerSSH settings and generate the configuration you need to get it up and running.")])])],1)],1)},f=[],p={name:"Welcome",props:{configuration:Object},methods:{},data:function(){return{}}},d=p,v=n("2877"),h=n("6544"),m=n.n(h),g=n("62ad"),b=n("a523"),w=n("0fd9"),C=Object(v["a"])(d,l,f,!1,null,null,null),k=C.exports;m()(C,{VCol:g["a"],VContainer:b["a"],VRow:w["a"]});var _=function(){var e=this,t=this,n=t.$createElement,o=t._self._c||n;return o("v-container",{attrs:{fluid:""}},[o("v-row",[o("v-col",[o("v-text-field",{attrs:{label:"Webhook URL",hint:"ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation.",rules:[function(e){return!!e||"URL is required"},function(t){return e.validateURL(t)||"Valid URL required"}],"persistent-hint":"",outlined:"",required:""},model:{value:t.configuration.authentication.webhook.url,callback:function(e){t.$set(t.configuration.authentication.webhook,"url",e)},expression:"configuration.authentication.webhook.url"}}),o("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.configuration.authentication.webhook.url.startsWith("http:"),expression:"configuration.authentication.webhook.url.startsWith('http:')"}],attrs:{icon:t.icons.mdiAlert,border:"left",color:"orange",dense:"",outlined:"",type:"warning"}},[t._v(" You are using an unencrypted ( "),o("pre",{staticClass:"d-inline"},[t._v("http://")]),t._v(" ) connection. ContainerSSH will transmit user credentials in clear text. We strongly recommend using a TLS-encrypted connection between ContainerSSH and the authentication webhook. ")])],1)],1),o("v-row",{directives:[{name:"show",rawName:"v-show",value:t.configuration.authentication.webhook.url.startsWith("https:"),expression:"configuration.authentication.webhook.url.startsWith('https:')"}]},[o("v-col",[o("v-textarea",{attrs:{label:"Webhook server certificate",rules:t.configuration.authentication.webhook.certificateRules,"persistent-hint":"",outlined:"",required:""},model:{value:t.configuration.authentication.webhook.certificate,callback:function(e){t.$set(t.configuration.authentication.webhook,"certificate",e)},expression:"configuration.authentication.webhook.certificate"}}),o("label",{staticClass:"mt-n5 float-right v-btn v-btn--text theme--light v-size--default",attrs:{for:"certificateContentFileUploader"}},[o("v-icon",[t._v(t._s(t.icons.mdiTrayArrowUp))]),t._v(" Browse files ")],1),o("v-file-input",{staticClass:"d-none",attrs:{"hide-input":"",id:"certificateContentFileUploader",accept:".crt, .cer, .pem, .txt"},on:{change:function(e){return t.loadCertificateFromFile()}},model:{value:t.certificateContentFile,callback:function(e){t.certificateContentFile=e},expression:"certificateContentFile"}}),o("v-alert",{attrs:{color:"red",dense:"",type:"error"},model:{value:t.certificateContentMessage,callback:function(e){t.certificateContentMessage=e},expression:"certificateContentMessage"}})],1)],1)],1)},y=[],x=n("6ccf"),S=n.n(x),T=n("94ed"),V={name:"Authentication",props:{configuration:Object},methods:{validateURL:function(e){return S()(e,{protocols:["http","https"],require_tld:!1})},selectCertificateFromDevice:function(){this.$refs.certificateContentFileUploader.input.click()},loadCertificateFromFile:function(){var e=this,t=new FileReader;t.readAsText(this.certificateContentFile),t.onload=function(){e.configuration.authentication.webhook.certificate=t.result},t.onerror=function(){e.certificateContentMessage=t.error}}},data:function(){return{certificateContentFile:null,certificateContentMessage:null,icons:{mdiTrayArrowUp:T["f"],mdiContentPaste:T["b"],mdiAlert:T["a"]}}}},F=V,A=n("0798"),O=n("23a7"),R=n("132d"),U=n("8654"),j=n("a844"),L=Object(v["a"])(F,_,y,!1,null,null,null),W=L.exports;m()(L,{VAlert:A["a"],VCol:g["a"],VContainer:b["a"],VFileInput:O["a"],VIcon:R["a"],VRow:w["a"],VTextField:U["a"],VTextarea:j["a"]});var q=function(){var e=this,t=this,n=t.$createElement,o=t._self._c||n;return o("v-container",{attrs:{fluid:""}},[o("v-row",[o("v-col",[o("v-text-field",{attrs:{label:"Config server URL",hint:"ContainerSSH will send a HTTP request to this URL for every authentication attempt. The webhook server can decide to allow or deny the request. You can find more information about the webhook protocol in the documentation.",rules:[function(e){return!!e||"URL is required"},function(t){return e.validateURL(t)||"Valid URL required"}],"persistent-hint":"",outlined:"",required:""},model:{value:t.configuration.dynamicConfiguration.server.url,callback:function(e){t.$set(t.configuration.dynamicConfiguration.server,"url",e)},expression:"configuration.dynamicConfiguration.server.url"}}),o("v-alert",{attrs:{icon:t.icons.mdiAlert,border:"left",color:"orange",dense:"",outlined:"",type:"warning"}},[t._v(" You are using an unencrypted ( "),o("pre",{staticClass:"d-inline"},[t._v("http://")]),t._v(" ) connection. ContainerSSH will transmit configuration in clear text. We strongly recommend using a TLS-encrypted connection between ContainerSSH and the config server. ")])],1)],1)],1)},$=[],D={name:"DynamicConfiguration",props:{configuration:Object},methods:{validateURL:function(e){return S()(e,{protocols:["http","https"],require_tld:!1})},selectCertificateFromDevice:function(){this.$refs.certificateContentFileUploader.input.click()},loadCertificateFromFile:function(){var e=this,t=new FileReader;t.readAsText(this.certificateContentFile),t.onload=function(){e.configuration.authentication.webhook.certificate=t.result},t.onerror=function(){e.certificateContentMessage=t.error}}},data:function(){return{certificateContentFile:null,certificateContentMessage:null,icons:{mdiTrayArrowUp:T["f"],mdiContentPaste:T["b"],mdiAlert:T["a"]}}}},H=D,M=Object(v["a"])(H,q,$,!1,null,null,null),B=M.exports;m()(M,{VAlert:A["a"],VCol:g["a"],VContainer:b["a"],VRow:w["a"],VTextField:U["a"]});var P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",[n("v-radio-group",{staticClass:"mt-0",attrs:{hint:"Meh",row:""},model:{value:e.configuration.backend.backend,callback:function(t){e.$set(e.configuration.backend,"backend",t)},expression:"configuration.backend.backend"}},[n("v-radio",{attrs:{value:"docker"},scopedSlots:e._u([{key:"label",fn:function(){return[n("v-icon",[e._v(e._s(e.icons.mdiDocker))]),n("div",[e._v("Docker")])]},proxy:!0}])}),n("v-radio",{attrs:{value:"kubernetes"},scopedSlots:e._u([{key:"label",fn:function(){return[n("v-icon",[e._v(e._s(e.icons.mdiKubernetes))]),n("div",[e._v("Kubernetes")])]},proxy:!0}])})],1)],1)],1)],1)},N=[],E={name:"Backend",props:{configuration:Object},methods:{},data:function(){return{icons:{mdiKubernetes:T["d"],mdiDocker:T["c"]}}}},I=E,Y=n("67b6"),K=n("43a6"),J=Object(v["a"])(I,P,N,!1,null,null,null),z=J.exports;m()(J,{VCol:g["a"],VContainer:b["a"],VIcon:R["a"],VRadio:Y["a"],VRadioGroup:K["a"],VRow:w["a"]});var G={name:"Configurator",components:{Welcome:k,Authentication:W,DynamicConfiguration:B,Backend:z},methods:{isCompleted:function(e){return this.step>e},goToStep:function(e){this.step=e}},data:function(){return{icons:{mdiTrayArrowUp:T["f"],mdiTrayArrowDown:T["e"]},step:1,configurationForm:"",configuration:{backend:{backend:"docker",docker:{connection:{host:"unix:///var/run/docker.sock"}},kubernetes:{}},authentication:{webhook:{url:"http://authconfig:8080",certificate:""}},dynamicConfiguration:{server:{url:"http://authconfig:8080/config"},ssh:{banner:"Welcome to ContainerSSH!\n",hostkeys:[]}}}}}},Q=G,X=n("8336"),Z=n("b0af"),ee=n("4bd4"),te=n("7e85"),ne=n("e516"),oe=n("56a4"),re=Object(v["a"])(Q,s,u,!1,null,null,null),ie=re.exports;m()(re,{VBtn:X["a"],VCard:Z["a"],VForm:ee["a"],VIcon:R["a"],VStepper:te["a"],VStepperContent:ne["a"],VStepperStep:oe["a"]});var ae=o["default"].extend({name:"Home",components:{Configurator:ie}}),ce=ae,se=Object(v["a"])(ce,a,c,!1,null,null,null),ue=se.exports,le={name:"App",components:{Home:ue},data:function(){return{}}},fe=le,pe=n("7496"),de=n("f6c4"),ve=Object(v["a"])(fe,r,i,!1,null,null,null),he=ve.exports;m()(ve,{VApp:pe["a"],VMain:de["a"]});var me=n("9483");Object(me["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ge=n("8c4f");o["default"].use(ge["a"]);var be=[{path:"/",name:"Configurator",component:ue}],we=new ge["a"]({mode:"history",base:"/",routes:be}),Ce=we,ke=n("2f62");o["default"].use(ke["a"]);var _e=new ke["a"].Store({state:{},mutations:{},actions:{},modules:{}}),ye=n("ce5b"),xe=n.n(ye);o["default"].use(xe.a);var Se=new xe.a({icons:{iconfont:"mdiSvg"}}),Te=Se;o["default"].config.productionTip=!1,new o["default"]({router:Ce,store:_e,vuetify:Te,render:function(e){return e(he)}}).$mount("#app")}});
//# sourceMappingURL=app.9d2504eb.js.map