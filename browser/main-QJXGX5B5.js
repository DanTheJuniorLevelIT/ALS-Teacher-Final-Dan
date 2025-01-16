import{a as ve}from"./chunk-BEC4OBFJ.js";import{a as be}from"./chunk-S3PF5HTB.js";import{a as _e}from"./chunk-WI22LCDD.js";import{a as ye}from"./chunk-YMQCK2GO.js";import{b as k,c as G,d as E,e as A,f as I,h as x,j as D,m as R,n as T,u as N,v as B,w as J}from"./chunk-5OU5PUPV.js";import{b as H,c as de,d as pe,e as ue,f as fe,h as ge,j as S,k as f,l as U,m as he,n as Ce,o as _,p as y}from"./chunk-OWBCPQNA.js";import"./chunk-ICTHBN6B.js";import{Aa as X,B as Z,D as Y,Fb as C,Gb as M,Oa as $,Pa as ee,Sa as d,Ta as g,U as K,Ua as te,Va as ne,W as Q,Wa as oe,Ya as ie,Za as re,aa as O,bc as ce,e as V,fa as h,fb as ae,hb as p,ja as W,jb as r,kb as s,lb as c,lc as me,oc as b,pb as u,q,wb as m,yb as se,zb as le}from"./chunk-RNXY7ZYS.js";var v=V(J());var Me=(()=>{let e=class e{constructor(t,n){this.apiService=t,this.route=n,this.showPassword=!1,this.showNewPassword=!1,this.showConfirmPassword=!1,this.loginForm=new I({email:new x(null),password:new x(null)})}ngOnInit(){}login(){this.loginForm.valid?this.apiService.verifyAdmin(this.loginForm.value).subscribe(t=>{console.log("Response:",t);let n=t.adminid,o=t.token,l=t.profile_picture;console.log("Token:",o),localStorage.setItem("authToken",o),localStorage.setItem("id",n),localStorage.setItem("adminDetails",JSON.stringify(t.details)),localStorage.setItem("profile_picture",l),o!=null||o!=null?(v.default.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:F=>{F.onmouseenter=v.default.stopTimer,F.onmouseleave=v.default.resumeTimer}}).fire({icon:"success",title:"Signed in successfully"}),this.route.navigate(["/main/Home/"])):(console.error("Invalid Login"),v.default.fire({title:"Invalid Login",icon:"error"}))},t=>{console.error("Error logging in:",t),v.default.fire({title:"The Provided Credentials are incorrect",icon:"error"}),this.loginForm.reset()}):(console.error("Form is not valid"),v.default.fire({title:"Form is not Valid",text:"Fill out the Email and Password",icon:"error"}),this.loginForm.reset())}togglePasswordVisibility(){this.showPassword=!this.showPassword}};e.\u0275fac=function(n){return new(n||e)(g(y),g(f))},e.\u0275cmp=h({type:e,selectors:[["app-login"]],standalone:!0,features:[C],decls:31,vars:3,consts:[[1,"h-100","bg-light"],[1,"container","py-5","h-100"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col"],[1,"card","card-registration","my-4"],[1,"row","g-0"],[1,"col-xl-5","d-none","d-xl-block"],["src","/assets/alslogo.png","alt","",1,"img-fluid",2,"border-top-left-radius",".25rem","border-bottom-left-radius",".25rem","width","100%","height","400px","object-fit","cover"],[1,"col-xl-7"],[1,"card-body","p-md-4","text-black"],[1,"mb-5","text-uppercase"],[3,"ngSubmit","formGroup"],[1,"form-outline","mb-2"],["formControlName","email","type","text","id","form3Example97",1,"form-control","form-control-lg"],["for","form3Example97",1,"form-label"],[1,"input-group"],["id","oldPassword","formControlName","password",1,"form-control","form-control-lg",3,"type"],["type","button",1,"btn","btn-outline-secondary",3,"click"],["for","oldPassword",1,"form-label"],[1,"signup-link"],["routerLink","/forgotpassword"],[1,"d-flex","justify-content-end","pt-3"],["type","submit",1,"btn","btn-success","btn-lg","ms-2"]],template:function(n,o){n&1&&(r(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),c(7,"img",7),s(),r(8,"div",8)(9,"div",9)(10,"h3",10),m(11,"Teacher Login"),s(),r(12,"form",11),u("ngSubmit",function(){return o.login()}),r(13,"div",12),c(14,"input",13),r(15,"label",14),m(16,"Email "),s()(),r(17,"div",12)(18,"div",15),c(19,"input",16),r(20,"button",17),u("click",function(){return o.togglePasswordVisibility()}),m(21),s()(),r(22,"label",18),m(23,"Old Password"),s()(),r(24,"div",19),m(25," Forget Password? "),r(26,"a",20),m(27,"Click Here"),s()(),r(28,"div",21)(29,"button",22),m(30,"login"),s()()()()()()()()()()()),n&2&&(d(12),p("formGroup",o.loginForm),d(7),p("type",o.showPassword?"text":"password"),d(2),se(" ",o.showPassword?"Hide":"Show"," "))},dependencies:[b,_,U,B,D,k,E,A,R,T,N],styles:["@media (max-width: 768px){.container[_ngcontent-%COMP%]{width:100%}}@media (max-width: 768px){.card-registration[_ngcontent-%COMP%]{width:100%}}@media (max-width: 768px){.d-none.d-xl-block[_ngcontent-%COMP%]{display:none}}@media (max-width: 768px){.form-outline[_ngcontent-%COMP%], .form-label[_ngcontent-%COMP%]{width:100%}}@media (max-width: 768px){.btn.btn-success.btn-lg.ms-2[_ngcontent-%COMP%]{width:100%}}"]});let a=e;return a})();var xe=V(J());var Re=()=>["/main/Home"],Te=()=>["/main/Subject"],Ne=()=>["/main/Message"],Be=()=>["/main/Account"];function je(a,e){a&1&&c(0,"span",22)}var Fe=(()=>{let e=class e{constructor(t,n){this.api=t,this.route=n,this.unreadCount=0}ngOnInit(){let t=localStorage.getItem("authToken");this.profile=localStorage.getItem("profile_picture"),this.tok=t,localStorage.removeItem("classid"),this.admin=this.getAdminDetails(),this.fetchUnreadCount(),Z(3e4).subscribe(()=>this.fetchUnreadCount())}fetchUnreadCount(){this.admin&&this.admin.adminID&&this.api.getUnreadCount(this.admin.adminID).subscribe(t=>{this.unreadCount=t,console.log(this.unreadCount)},t=>{console.error("Error fetching unread messages count:",t)})}getAdminDetails(){let t=localStorage.getItem("adminDetails");return t?JSON.parse(t):null}toggleSidebar(){let t=document.querySelector(".sidebar");t&&t.classList.toggle("show")}closeNavbar(){let t=document.querySelector(".sidebar");t&&t.classList.contains("show")&&t.classList.remove("show")}logout(t){xe.default.fire({title:"Are you sure you want to Logout?",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(n=>{n.isConfirmed&&(t?this.api.outAdmin(t).subscribe(o=>{console.log(o),localStorage.removeItem("authToken"),this.route.navigate(["/login"])},o=>{o.status===401?(console.error("Unauthenticated. Please login again."),this.route.navigate(["/login"])):console.error("Logout error:",o)}):console.error("No token found for logout"))})}};e.\u0275fac=function(n){return new(n||e)(g(y),g(f))},e.\u0275cmp=h({type:e,selectors:[["app-main"]],standalone:!0,features:[C],decls:47,vars:12,consts:[["type","text/css","rel","stylesheet","href",ee`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css`],[1,"wrapper"],[1,"top_navbar"],[1,"hamburger"],["href","javascript:void(0)",3,"click"],[1,"fa","fa-bars"],[1,"sidebar"],[1,"profile","mt-5"],["alt","Teacher Profile",3,"src"],["routerLinkActive","active",3,"click","routerLink"],[1,"icon"],[1,"fa","fa-home","fa-2x"],[1,"item"],[1,"fa","fa-book","fa-2x"],["aria-hidden","true",1,"fa","fa-comments-o","fa-2x"],["class","badge",4,"ngIf"],["aria-hidden","true",1,"fa","fa-user-circle","fa-2x"],[1,"d-flex","flex-column-reverse","bd-highlight"],[1,"bd-highlight"],[3,"click"],["aria-hidden","true",1,"fa","fa-sign-out","fa-2x"],[1,"main-content"],[1,"badge"]],template:function(n,o){n&1&&(c(0,"link",0),r(1,"div",1)(2,"div",2)(3,"div",3)(4,"a",4),u("click",function(){return o.toggleSidebar()}),c(5,"i",5),s()()(),r(6,"div",6)(7,"div",7),c(8,"img",8),r(9,"h3"),m(10),s()(),r(11,"ul")(12,"li")(13,"a",9),u("click",function(){return o.closeNavbar()}),r(14,"span",10),c(15,"i",11),s(),r(16,"span",12),m(17,"Home"),s()()(),r(18,"li")(19,"a",9),u("click",function(){return o.closeNavbar()}),r(20,"span",10),c(21,"i",13),s(),r(22,"span",12),m(23,"Subjects"),s()()(),r(24,"li")(25,"a",9),u("click",function(){return o.closeNavbar()}),r(26,"span",10),c(27,"i",14),s(),r(28,"span",12),m(29,"Messages"),s(),ae(30,je,1,0,"span",15),s()(),r(31,"li")(32,"a",9),u("click",function(){return o.closeNavbar()}),r(33,"span",10),c(34,"i",16),s(),r(35,"span",12),m(36,"Account"),s()()(),r(37,"div",17)(38,"div",18)(39,"li")(40,"a",19),u("click",function(){return o.logout(o.tok)}),r(41,"span",10),c(42,"i",20),s(),r(43,"span",12),m(44,"Log Out"),s()()()()()()(),r(45,"div",21),c(46,"router-outlet"),s()()),n&2&&(d(8),p("src",o.profile,$),d(2),le("Teacher ",o.admin.firstname," ",o.admin.lastname,""),d(3),p("routerLink",M(8,Re)),d(6),p("routerLink",M(9,Te)),d(6),p("routerLink",M(10,Ne)),d(5),p("ngIf",o.unreadCount>0),d(2),p("routerLink",M(11,Be)))},dependencies:[_,S,U,he,b,me],styles:['@font-face{font-family:Poppins;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrJJnecmNE.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrJJfecg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Poppins;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Poppins;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}*[_ngcontent-%COMP%]{list-style:none;text-decoration:none;margin:0;padding:0;box-sizing:border-box;font-family:Poppins,sans-serif}.main-content[_ngcontent-%COMP%]{margin-left:220px;padding:20px;transition:margin-left .5s ease}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]{background:#0f3041;position:fixed;top:0;left:0;width:220px;height:100%;padding:10px 0;transition:all .5s ease}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100px;height:100px;border-radius:50%;margin:0 auto 10px}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;margin:10px 0 5px}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;padding:20px 10px;color:#f2f2f2;font-size:16px;position:relative;text-decoration:none}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{color:#f2f2f2;width:40px;display:inline-block}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]{color:#0c7db1;background:#f2f2f2;border-right:2px solid rgb(5,68,104)}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   .icon[_ngcontent-%COMP%], .wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{color:#0c7db1}.top_navbar[_ngcontent-%COMP%]{height:50px;display:flex;align-items:center;padding:0 30px;color:#fff}.hamburger[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:28px;color:#fff}.hamburger[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#a2ecff}.badge[_ngcontent-%COMP%]{background-color:red;display:inline-block;width:10px;height:10px;border-radius:50%;margin-left:10px}@media (max-width: 768px){.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]{width:100%;height:auto;position:relative;display:none}.wrapper[_ngcontent-%COMP%]   .sidebar.show[_ngcontent-%COMP%]{display:block}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline}.top_navbar[_ngcontent-%COMP%]{height:50px;display:flex;align-items:center;padding:0 30px;color:#fff}.main-content[_ngcontent-%COMP%]{margin-left:0;padding:20px}}@media (max-width: 576px){.top_navbar[_ngcontent-%COMP%]{background:#0f3041;height:50px;display:flex;align-items:center;padding:0 30px;color:#fff}.wrapper[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{flex-direction:column}}']});let a=e;return a})();var w=(a,e)=>localStorage.getItem("authToken")?!0:(new f().navigate(["/login"]),!1);var L=V(J());var Oe=(()=>{let e=class e{constructor(t,n){this.apiService=t,this.router=n,this.forgotPasswordForm=new I({email:new x(null,[G.required,G.email])})}ngOnInit(){}submitForgotPassword(){this.forgotPasswordForm.valid?this.apiService.sendResetCode(this.forgotPasswordForm.value).subscribe(t=>{L.default.fire({icon:"success",title:"Reset code sent!",text:"Check your email for the reset code."}),this.router.navigate(["/reset-password"])},t=>{L.default.fire({icon:"error",title:"Error!",text:"Failed to send reset code. Please try again."})}):L.default.fire({icon:"warning",title:"Invalid Email",text:"Please provide a valid email address."})}};e.\u0275fac=function(n){return new(n||e)(g(y),g(f))},e.\u0275cmp=h({type:e,selectors:[["app-forgotpassword"]],standalone:!0,features:[C],decls:16,vars:1,consts:[[1,"h-100","bg-light"],[1,"container","py-5","h-100"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col"],[1,"card","card-registration","my-4"],[1,"card-body","p-md-4","text-black"],[1,"mb-5","text-uppercase"],[3,"ngSubmit","formGroup"],[1,"form-outline","mb-2"],["formControlName","email","type","email","id","form3Example97",1,"form-control","form-control-lg"],["for","form3Example97",1,"form-label"],[1,"d-flex","justify-content-end","pt-3"],["type","submit",1,"btn","btn-primary","btn-lg"]],template:function(n,o){n&1&&(r(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h3",6),m(7,"Forgot Password"),s(),r(8,"form",7),u("ngSubmit",function(){return o.submitForgotPassword()}),r(9,"div",8),c(10,"input",9),r(11,"label",10),m(12,"Enter your Email"),s()(),r(13,"div",11)(14,"button",12),m(15,"Send Reset Code"),s()()()()()()()()()),n&2&&(d(8),p("formGroup",o.forgotPasswordForm))},dependencies:[b,_,B,D,k,E,A,R,T,N]});let a=e;return a})();var Se=[{path:"login",component:Me},{path:"forgotpassword",component:Oe},{path:"main",component:Fe,canActivate:[w],children:[{path:"Home",loadChildren:()=>import("./chunk-A6KJ5P2D.js").then(a=>ve),canActivate:[w]},{path:"Subject",loadChildren:()=>import("./chunk-RSYH43JT.js").then(a=>be),canActivate:[w]},{path:"Message",loadChildren:()=>import("./chunk-U3SN45Y3.js").then(a=>_e),canActivate:[w]},{path:"Account",loadChildren:()=>import("./chunk-6IDBWBI4.js").then(a=>ye),canActivate:[w]},{path:"",redirectTo:"Home",pathMatch:"full"}]},{path:"",redirectTo:"login",pathMatch:"full"}];var Le="@",Ve=(()=>{let e=class e{constructor(t,n,o,l,P){this.doc=t,this.delegate=n,this.zone=o,this.animationType=l,this.moduleImpl=P,this._rendererFactoryPromise=null,this.scheduler=O(ne,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-C67LLSQW.js")).catch(n=>{throw new K(5300,!1)}).then(({\u0275createEngine:n,\u0275AnimationRendererFactory:o})=>{this._engine=n(this.animationType,this.doc,this.scheduler);let l=new o(this.delegate,this._engine,this.zone);return this.delegate=l,l})}createRenderer(t,n){let o=this.delegate.createRenderer(t,n);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let l=new z(o);return n?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(P=>{let F=P.createRenderer(t,n);l.use(F)}).catch(P=>{l.use(o)}),l}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(n){te()},e.\u0275prov=Q({token:e,factory:e.\u0275fac});let a=e;return a})(),z=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let i of this.replay)i(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,i){return this.delegate.createElement(e,i)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,i){this.delegate.appendChild(e,i)}insertBefore(e,i,t,n){this.delegate.insertBefore(e,i,t,n)}removeChild(e,i,t){this.delegate.removeChild(e,i,t)}selectRootElement(e,i){return this.delegate.selectRootElement(e,i)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,i,t,n){this.delegate.setAttribute(e,i,t,n)}removeAttribute(e,i,t){this.delegate.removeAttribute(e,i,t)}addClass(e,i){this.delegate.addClass(e,i)}removeClass(e,i){this.delegate.removeClass(e,i)}setStyle(e,i,t,n){this.delegate.setStyle(e,i,t,n)}removeStyle(e,i,t){this.delegate.removeStyle(e,i,t)}setProperty(e,i,t){this.shouldReplay(i)&&this.replay.push(n=>n.setProperty(e,i,t)),this.delegate.setProperty(e,i,t)}setValue(e,i){this.delegate.setValue(e,i)}listen(e,i,t){return this.shouldReplay(i)&&this.replay.push(n=>n.listen(e,i,t)),this.delegate.listen(e,i,t)}shouldReplay(e){return this.replay!==null&&e.startsWith(Le)}};function Ue(a="animations"){return ie("NgAsyncAnimations"),W([{provide:oe,useFactory:(e,i,t)=>new Ve(e,i,t,a),deps:[ce,ue,re]},{provide:X,useValue:a==="noop"?"NoopAnimations":"BrowserAnimations"}])}var ke=(a,e)=>{let i=window.localStorage.getItem("authToken"),t=a.clone({setHeaders:{Authorization:`Bearer ${i}`}});return e(t)};var Ee=(a,e)=>{let i=O(f);return e(a).pipe(Y(t=>{[401,403].includes(JSON.parse(t.status))&&i.navigate(["login"]);let n=t.error.status||t.statusText;return q(()=>n)}))};var Ae={providers:[Ce(Se),ge(),Ue(),H(pe()),H(de([ke,Ee]))]};var Ie=(()=>{let e=class e{constructor(){this.title="alsteacher"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["app-root"]],standalone:!0,features:[C],decls:1,vars:0,template:function(n,o){n&1&&c(0,"router-outlet")},dependencies:[S]});let a=e;return a})();fe(Ie,Ae).catch(a=>console.error(a));