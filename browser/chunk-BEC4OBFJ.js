import{j as z,k as R,l as V,o as M,p as $}from"./chunk-OWBCPQNA.js";import{Ab as T,Fb as C,Gb as k,Hb as H,Kb as x,Mb as v,Oa as S,Sa as a,Ta as P,fa as h,fb as p,hb as r,jb as n,jc as F,kb as o,kc as L,lb as g,lc as D,nc as j,oa as O,ob as w,oc as N,pa as b,pb as _,qb as m,rb as I,wb as l,xb as f,yb as E}from"./chunk-RNXY7ZYS.js";var A=(()=>{let i=class i{};i.\u0275fac=function(s){return new(s||i)},i.\u0275cmp=h({type:i,selectors:[["app-homemain"]],standalone:!0,features:[C],decls:1,vars:0,template:function(s,c){s&1&&g(0,"router-outlet")},dependencies:[M,z]});let e=i;return e})();var q=e=>({show:e}),B=()=>["/main/Message/main/message"];function K(e,i){e&1&&(n(0,"div",17),g(1,"div",18),o())}function Q(e,i){if(e&1&&(n(0,"div",20)(1,"h1"),l(2,"No Classes for Today"),o(),n(3,"p",21),l(4),x(5,"date"),o()()),e&2){let t=m(2);a(4),f(v(5,1,t.currentDate,"MMMM d, y | h:mm a"))}}function W(e,i){if(e&1&&(n(0,"div",8),p(1,Q,6,4,"div",19),o()),e&2){let t=m();a(),r("ngIf",t.sub==0)}}function X(e,i){if(e&1&&(n(0,"div",20)(1,"h1"),l(2),o(),n(3,"p",21),l(4),x(5,"date"),o()()),e&2){let t=m(2);a(2),E("Classes of the Day | ",t.shl.school,""),a(2),f(v(5,2,t.currentDate,"MMMM d, y | h:mm a"))}}function Y(e,i){if(e&1&&(n(0,"div",8),p(1,X,6,5,"div",19),o()),e&2){let t=m();a(),r("ngIf",t.sub!=0)}}function Z(e,i){if(e&1){let t=w();n(0,"div",23)(1,"a",24),_("click",function(){let s=O(t).$implicit,c=m(2);return b(c.navigateToModules(s.classid))}),n(2,"div",25),g(3,"img",26),o(),n(4,"div",27)(5,"h5",28),l(6),o(),n(7,"div",29)(8,"p",30),l(9),o()()()()()}if(e&2){let t=i.$implicit;a(3),I("src","/assets/",t.image,"",S),a(3),f(t.subject_name),a(3),f(t.schedule)}}function ee(e,i){if(e&1&&(n(0,"div",11),p(1,Z,10,4,"div",22),o()),e&2){let t=m();a(),r("ngForOf",t.sub)}}function te(e,i){if(e&1&&(n(0,"li",33),l(1),o()),e&2){let t=i.$implicit;r("routerLink",k(4,B)),a(),T(" ",t.messages," -",t.firstname," ",t.lastname," ")}}function ne(e,i){if(e&1&&(n(0,"ul"),p(1,te,2,5,"li",32),o()),e&2){let t=m(2);a(),r("ngForOf",t.messages)}}function ie(e,i){e&1&&(n(0,"p"),l(1,"No new notifications"),o())}function oe(e,i){if(e&1&&(n(0,"div",31)(1,"div",15)(2,"h2"),l(3,"Recent Notifications"),o(),p(4,ne,2,1,"ul",16)(5,ie,2,0,"p",16),o()()),e&2){let t=m();a(4),r("ngIf",t.messages.length),a(),r("ngIf",!t.messages.length)}}function ae(e,i){e&1&&(n(0,"div",17),g(1,"div",18),o())}function re(e,i){if(e&1&&(n(0,"div",20)(1,"h1"),l(2,"No Classes for Today"),o(),n(3,"p",21),l(4),x(5,"date"),o()()),e&2){let t=m(2);a(4),f(v(5,1,t.currentDate,"MMMM d, y | h:mm a"))}}function se(e,i){if(e&1&&(n(0,"div",8),p(1,re,6,4,"div",19),o()),e&2){let t=m();a(),r("ngIf",t.sub==0)}}function ce(e,i){if(e&1&&(n(0,"div",20)(1,"h1"),l(2),o(),n(3,"p",21),l(4),x(5,"date"),o()()),e&2){let t=m(2);a(2),E("Classes of the Day | ",t.shl.school,""),a(2),f(v(5,2,t.currentDate,"MMMM d, y | h:mm a"))}}function le(e,i){if(e&1&&(n(0,"div",8),p(1,ce,6,5,"div",19),o()),e&2){let t=m();a(),r("ngIf",t.sub!=0)}}function de(e,i){if(e&1){let t=w();n(0,"div",35)(1,"a",24),_("click",function(){let s=O(t).$implicit,c=m(2);return b(c.navigateToModules(s.classid))}),n(2,"div",25),g(3,"img",26),o(),n(4,"div",27)(5,"h5",28),l(6),o(),n(7,"div",29)(8,"p",30),l(9),o()()()()()}if(e&2){let t=i.$implicit;a(3),I("src","/assets/",t.image,"",S),a(3),f(t.subject_name),a(3),f(t.schedule)}}function me(e,i){if(e&1&&(n(0,"div",11),p(1,de,10,4,"div",34),o()),e&2){let t=m();a(),r("ngForOf",t.sub)}}function pe(e,i){if(e&1&&(n(0,"li",33),l(1),o()),e&2){let t=i.$implicit;r("routerLink",k(4,B)),a(),T(" ",t.messages," -",t.firstname," ",t.lastname," ")}}function fe(e,i){if(e&1&&(n(0,"ul"),p(1,pe,2,5,"li",32),o()),e&2){let t=m();a(),r("ngForOf",t.messages)}}function ge(e,i){e&1&&(n(0,"p"),l(1,"No new notifications"),o())}var J=(()=>{let i=class i{constructor(d,s){this.apiserv=d,this.route=s,this.isLoading=!1,this.isModalOpen=!1,this.notificationsOpen=!1,this.notifications=[{message:"Emma Johnson have message you"},{message:"Liam Smith submitted his activity"},{message:"Ava Garcia sent a message"}],this.currentDate=new Date}openModal(){this.isModalOpen=!0}closeModal(){this.isModalOpen=!1}toggleNotifications(){this.notificationsOpen=!this.notificationsOpen}ngOnInit(){this.isLoading=!0,this.loadClasses()}loadMessage(d){let s=this.getAdminDetails();if(s){let c=s.firstname+" "+s.lastname;this.apiserv.getMessages(d).subscribe(u=>{this.messages=u.filter(y=>y.sender_name!==c),console.log(this.messages)})}else console.error("Admin details not found in localStorage.")}getAdminDetails(){let d=localStorage.getItem("adminDetails");return d?JSON.parse(d):null}loadClasses(){let d=localStorage.getItem("id");this.teacherid=d,this.loadMessage(d),this.apiserv.getTeacherSubjects(this.teacherid).subscribe(s=>{this.sub=s.subject,this.shl=s.school,console.log(this.sub),console.log(this.shl),this.isLoading=!1},s=>{console.error("Error fetching users:",s),this.isLoading=!1})}navigateToModules(d){localStorage.setItem("classid",d.toString()),this.route.navigate(["/main/Subject/main/subject/modulesmain",d])}};i.\u0275fac=function(s){return new(s||i)(P($),P(R))},i.\u0275cmp=h({type:i,selectors:[["app-home"]],standalone:!0,features:[C],decls:26,vars:14,consts:[[1,"wrapper","second-design"],[1,"content"],[1,"classes-column"],["class","loader-container",4,"ngIf"],["class","header",4,"ngIf"],["class","cards-container",4,"ngIf"],["class","notifications-column",4,"ngIf"],[1,"wrapper","first-design"],[1,"header"],[1,"notification-icon",3,"click"],["aria-hidden","true",1,"fa","fa-bell-o","fa-2x"],[1,"cards-container"],[1,"modal",3,"click","ngClass"],[1,"modal-content",3,"click"],[1,"close",3,"click"],[1,"notification-section"],[4,"ngIf"],[1,"loader-container"],[1,"spinner"],["class","title-and-date",4,"ngIf"],[1,"title-and-date"],[1,"current-date"],["class","card","style","width: 12rem;",4,"ngFor","ngForOf"],[1,"card",2,"width","12rem"],[3,"click"],[1,"image"],["alt","...",1,"card-img-top","border","border-bottom",3,"src"],[1,"card-body"],[1,"card-title"],[1,"card-details"],[1,"card-text"],[1,"notifications-column"],["style","cursor: pointer;",3,"routerLink",4,"ngFor","ngForOf"],[2,"cursor","pointer",3,"routerLink"],["class","card","style","width: 22rem;",4,"ngFor","ngForOf"],[1,"card",2,"width","22rem"]],template:function(s,c){s&1&&(n(0,"div",0)(1,"div",1)(2,"div",2),p(3,K,2,0,"div",3)(4,W,2,1,"div",4)(5,Y,2,1,"div",4)(6,ee,2,1,"div",5),o(),p(7,oe,6,2,"div",6),o()(),n(8,"div",7)(9,"div",8),p(10,ae,2,0,"div",3)(11,se,2,1,"div",4)(12,le,2,1,"div",4),n(13,"div",9),_("click",function(){return c.openModal()}),g(14,"i",10),o()(),n(15,"div",11),p(16,me,2,1,"div",5),o()(),n(17,"div",12),_("click",function(){return c.closeModal()}),n(18,"div",13),_("click",function(y){return y.stopPropagation()}),n(19,"span",14),_("click",function(){return c.closeModal()}),l(20,"\xD7"),o(),n(21,"div",15)(22,"h2"),l(23,"Recent Notifications"),o(),p(24,fe,2,1,"ul",16)(25,ge,2,0,"p",16),o()()()),s&2&&(a(3),r("ngIf",c.isLoading),a(),r("ngIf",!c.isLoading),a(),r("ngIf",!c.isLoading),a(),r("ngIf",!c.isLoading),a(),r("ngIf",!c.isLoading),a(3),r("ngIf",c.isLoading),a(),r("ngIf",!c.isLoading),a(),r("ngIf",!c.isLoading),a(4),r("ngIf",!c.isLoading),a(),r("ngClass",H(12,q,c.isModalOpen)),a(7),r("ngIf",c.messages.length),a(),r("ngIf",!c.messages.length))},dependencies:[N,F,L,D,j,M,V],styles:[".content-loader-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%;width:100%;position:absolute;background-color:#fffc;z-index:999}.spinner[_ngcontent-%COMP%]{border:8px solid #f3f3f3;border-top:8px solid #3498db;border-radius:50%;width:40px;height:40px;animation:_ngcontent-%COMP%_spin .5s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.content[_ngcontent-%COMP%]{position:relative}.wrapper[_ngcontent-%COMP%]{margin:0 auto;max-width:1300px;padding-left:40px}.second-design[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.content[_ngcontent-%COMP%]{display:flex;width:100%}.classes-column[_ngcontent-%COMP%]{flex:0 0 60%;margin-right:20px}.notifications-column[_ngcontent-%COMP%]{flex:0 0 40%;padding:20px;border-radius:8px;box-shadow:0 2px 5px #0000001a}.notification-section[_ngcontent-%COMP%]{background-color:#fff;border:1px solid #ddd;border-radius:8px;padding:15px;max-width:400px}.notification-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:18px;margin-bottom:10px}.notification-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}.notification-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:8px;margin-bottom:5px;background-color:#f5f5f5;border-radius:5px}.cards-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:20px;margin-top:20px;position:relative}.card[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.subjecttime[_ngcontent-%COMP%]{padding-top:15px;color:#f2f2f2;text-align:center;font-weight:700}.card[_ngcontent-%COMP%]{width:300px;height:350px;margin-bottom:25px}.card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{font-size:14px;font-weight:500;height:50px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]{font-size:10px}img[_ngcontent-%COMP%]   .card-image-top[_ngcontent-%COMP%]{border-bottom:1px black}img[_ngcontent-%COMP%]{height:180px}.first-design[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.notification-icon[_ngcontent-%COMP%]{cursor:pointer}.modal[_ngcontent-%COMP%]{display:none;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#0006;transition:display .5s ease}.modal.show[_ngcontent-%COMP%]{display:block}.modal-content[_ngcontent-%COMP%]{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:80%;max-width:500px}.close[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700;cursor:pointer}.close[_ngcontent-%COMP%]:hover, .close[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none}@media (min-width: 769px){.first-design[_ngcontent-%COMP%]{display:none}.second-design[_ngcontent-%COMP%]{display:flex}}@media (max-width: 768px){.second-design[_ngcontent-%COMP%]{display:none}.first-design[_ngcontent-%COMP%]{display:block}.cards-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-around;gap:20px;margin-top:20px}.card[_ngcontent-%COMP%]{width:calc(50% - 20px)}@media (max-width: 576px){.card[_ngcontent-%COMP%]{width:100%}}}"]});let e=i;return e})();var be=[{path:"main",component:A,children:[{path:"home",component:J},{path:"",redirectTo:"home",pathMatch:"full"}]},{path:"",redirectTo:"main",pathMatch:"full"}];export{be as a};