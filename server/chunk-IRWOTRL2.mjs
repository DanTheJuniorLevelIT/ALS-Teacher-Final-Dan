import './polyfills.server.mjs';
import{b as I,d as M,e as N,f as A,g as k,h as v,j as O,m as T,n as U,t as D,u as j,v as B,w as h}from"./chunk-PSR5IDXJ.mjs";import{a as L}from"./chunk-FHE7QMUQ.mjs";import{n as F,t as E}from"./chunk-QFD7N3DA.mjs";import{$ as w,Bb as b,Ka as P,Oa as a,Pa as C,bb as S,db as c,fb as t,gb as o,hb as u,lb as m,mb as _,qc as x,sb as n,tb as g,tc as y,ub as f}from"./chunk-CV33BXM4.mjs";var R=(()=>{let s=class s{};s.\u0275fac=function(r){return new(r||s)},s.\u0275cmp=w({type:s,selectors:[["app-accountmain"]],standalone:!0,features:[b],decls:1,vars:0,template:function(r,e){r&1&&u(0,"router-outlet")},dependencies:[E,F]});let d=s;return d})();function H(d,s){if(d&1&&u(0,"img",39),d&2){let G=_();c("src",G.profilePic,P)}}var V=(()=>{let s=class s{constructor(i,r){this.apiserve=i,this.fb=r,this.showOldPassword=!1,this.showNewPassword=!1,this.showConfirmPassword=!1,this.newPasswordCharCount=0,this.confirmPasswordCharCount=0,this.selectedFile=null,this.profilePicOfStudent={},this.progress=0,this.isUploading=!1,this.updateForm=new A({oldpassword:new v(null),password:new v(null),password_confirmation:new v(null)})}ngOnInit(){let i=localStorage.getItem("authToken");this.id=localStorage.getItem("id"),console.log(this.id),this.profilePic=localStorage.getItem("profile_picture"),this.admin=this.getAdminDetails()}togglePasswordVisibility(i){switch(i){case"old":this.showOldPassword=!this.showOldPassword;break;case"new":this.showNewPassword=!this.showNewPassword;break;case"confirm":this.showConfirmPassword=!this.showConfirmPassword;break}}updateCharacterCount(i,r){let e=r.target.value;i==="new"?this.newPasswordCharCount=e.length:i==="confirm"&&(this.confirmPasswordCharCount=e.length)}getAdminDetails(){let i=localStorage.getItem("adminDetails");return i?JSON.parse(i):null}onFileSelect(i){this.selectedFile=i.target.files[0],console.log(this.selectedFile);let r=i.target;if(r.files&&r.files[0]){let e=r.files[0],l=new FileReader;l.onload=p=>{this.profilePic=p.target?.result},l.readAsDataURL(e)}}uploadProfilePicture(){if(!this.selectedFile){alert("Please select a file first");return}let i=new FormData;i.append("profile_picture",this.selectedFile),i.append("id",this.id),this.apiserve.uploadProfilePicture(i,this.id).subscribe(r=>{let e=`http://localhost:8000/storage/profile_pictures/${r.image_name}`;localStorage.setItem("profile_picture",e),console.log(r),this.isUploading=!0,this.progress=20;let l=setInterval(()=>{this.progress<100?this.progress+=20:(clearInterval(l),this.isUploading=!1,h.fire({position:"center",icon:"success",title:"Profile Picture Uploaded Successfully",showConfirmButton:!1,timer:1500}),this.apiserve.updateProfilePic(e))},100)})}onSubmit(){this.updateForm.valid?this.apiserve.updateAdminPassword(this.updateForm.value,this.id).subscribe(i=>{i&&i.message==="Password updated successfully"?(h.fire({position:"center",icon:"success",title:"Password Updated Successfully",showConfirmButton:!1,timer:1500}),this.updateForm.reset()):console.log("Unexpected response:",i)},i=>{i.status===400?h.fire({position:"center",icon:"warning",title:"Old password does not match",showConfirmButton:!1,timer:1500}):h.fire({position:"center",icon:"error",title:"An error occurred",text:"Please try again",showConfirmButton:!0})}):h.fire({position:"center",icon:"warning",title:"Invalid Form",text:"Please fill out all fields correctly.",showConfirmButton:!1,timer:1500})}};s.\u0275fac=function(r){return new(r||s)(C(L),C(D))},s.\u0275cmp=w({type:s,selectors:[["app-account"]],standalone:!0,features:[b],decls:87,vars:14,consts:[[1,"py-5"],[1,"container"],[1,"row","justify-content-center","align-items-center"],[1,"col-lg-6"],[1,"ps-lg-5"],[1,"card","text-white","text-left","h-100"],[1,"card-body","bg-light","text-dark","p-4","p-xl-5"],[1,"card-body","text-center"],[1,""],[2,"width","170px","height","170px","object-fit","cover","border-radius","20px","padding","10px",3,"error","src"],["role","button","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"button-8"],["id","exampleModal","tabindex","-1","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],["action","","method","post","enctype","multipart/form-data",3,"ngSubmit"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],["type","file","id","formFile",1,"form-control",3,"change"],["alt","","style","width: 200px; height: 200px; object-fit: cover; margin-top: 10px;",3,"src",4,"ngIf"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","submit",1,"btn","btn-primary"],[1,"row","mt-3"],[1,"col-sm-6"],["method","post",3,"ngSubmit","formGroup"],[1,"mb-3"],["for","oldPassword",1,"form-label"],[1,"input-group"],["id","oldPassword","formControlName","oldpassword",1,"form-control",3,"type"],["type","button",1,"btn","btn-outline-secondary",3,"click"],["for","newPassword",1,"form-label"],["id","newPassword","formControlName","password",1,"form-control",3,"input","type"],[1,"text-muted"],["for","confirmPassword",1,"form-label"],["id","confirmPassword","formControlName","password_confirmation",1,"form-control",3,"input","type"],["type","submit",1,"btn","btn-primary","btn-lg"],[1,"mt-3","small","fst-italic","text-light"],["alt","",2,"width","200px","height","200px","object-fit","cover","margin-top","10px",3,"src"]],template:function(r,e){r&1&&(t(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"img",9),m("error",function(){return e.profilePic="assets/icon.jpg"}),o()(),t(10,"button",10),n(11,"Upload Profile Picture:"),o(),t(12,"div",11)(13,"div",12)(14,"form",13),m("ngSubmit",function(){return e.uploadProfilePicture()}),t(15,"div",14)(16,"div",15)(17,"h5",16),n(18,"Upload Profie Picture"),o(),u(19,"button",17),o(),t(20,"div",18)(21,"input",19),m("change",function(p){return e.onFileSelect(p)}),o(),S(22,H,1,1,"img",20),o(),t(23,"div",21)(24,"button",22),n(25,"Close"),o(),t(26,"button",23),n(27,"Save changes"),o()()()()()()(),t(28,"div",24)(29,"div",25)(30,"h5")(31,"strong"),n(32,"First Name:"),o()()(),t(33,"div",25)(34,"h5")(35,"p"),n(36),o()()(),t(37,"div",25)(38,"h5")(39,"strong"),n(40,"Middle Name:"),o()()(),t(41,"div",25)(42,"h5")(43,"p"),n(44),o()()(),t(45,"div",25)(46,"h5")(47,"strong"),n(48,"Last Name:"),o()()(),t(49,"div",25)(50,"h5")(51,"p"),n(52),o()()()()()()()(),t(53,"div",3)(54,"div",4)(55,"div",5)(56,"div",6)(57,"form",26),m("ngSubmit",function(){return e.onSubmit()}),t(58,"div",27)(59,"label",28),n(60,"Current Password"),o(),t(61,"div",29),u(62,"input",30),t(63,"button",31),m("click",function(){return e.togglePasswordVisibility("old")}),n(64),o()()(),t(65,"div",27)(66,"label",32),n(67,"New Password"),o(),t(68,"div",29)(69,"input",33),m("input",function(p){return e.updateCharacterCount("new",p)}),o(),t(70,"button",31),m("click",function(){return e.togglePasswordVisibility("new")}),n(71),o()(),t(72,"small",34),n(73),o()(),t(74,"div",27)(75,"label",35),n(76,"Confirm Password"),o(),t(77,"div",29)(78,"input",36),m("input",function(p){return e.updateCharacterCount("confirm",p)}),o(),t(79,"button",31),m("click",function(){return e.togglePasswordVisibility("confirm")}),n(80),o()(),t(81,"small",34),n(82),o()(),t(83,"button",37),n(84,"Update"),o(),t(85,"p",38),n(86,"*Lorem ipsum dolor sit amet, consectetur adipiscing elit."),o()()()()()()()()()),r&2&&(a(9),c("src",e.profilePic,P),a(13),c("ngIf",e.profilePic!=null),a(14),g(e.admin.firstname),a(8),g(e.admin.middlename),a(8),g(e.admin.lastname),a(5),c("formGroup",e.updateForm),a(5),c("type",e.showOldPassword?"text":"password"),a(2),f(" ",e.showOldPassword?"Hide":"Show"," "),a(5),c("type",e.showNewPassword?"text":"password"),a(2),f(" ",e.showNewPassword?"Hide":"Show"," "),a(2),f("",e.newPasswordCharCount," / 8 characters"),a(5),c("type",e.showConfirmPassword?"text":"password"),a(2),f(" ",e.showConfirmPassword?"Hide":"Show"," "),a(2),f("",e.confirmPasswordCharCount," / 8 characters"))},dependencies:[y,x,B,O,I,M,N,T,U,j,k],styles:[".button-8[_ngcontent-%COMP%]{background-color:#e1ecf4;border-radius:3px;border:1px solid #7aa7c7;box-shadow:#ffffffb3 0 1px inset;box-sizing:border-box;color:#39739d;cursor:pointer;display:inline-block;font-family:-apple-system,system-ui,Segoe UI,Liberation Sans,sans-serif;font-size:13px;font-weight:400;line-height:1.15385;margin:0;outline:none;padding:8px .8em;position:relative;text-align:center;text-decoration:none;user-select:none;-webkit-user-select:none;touch-action:manipulation;vertical-align:baseline;white-space:nowrap}.button-8[_ngcontent-%COMP%]:hover, .button-8[_ngcontent-%COMP%]:focus{background-color:#b3d3ea;color:#2c5777}.button-8[_ngcontent-%COMP%]:focus{box-shadow:0 0 0 4px #0095ff26}.button-8[_ngcontent-%COMP%]:active{background-color:#a0c7e4;box-shadow:none;color:#2c5777}"]});let d=s;return d})();var oe=[{path:"main",component:R,children:[{path:"account",component:V},{path:"",redirectTo:"account",pathMatch:"full"}]},{path:"",redirectTo:"main",pathMatch:"full"}];export{oe as a};