(this["webpackJsonpwet-dry-app-3.0"]=this["webpackJsonpwet-dry-app-3.0"]||[]).push([[0],{15:function(t,e,n){},23:function(t,e,n){},30:function(t,e,n){"use strict";n.r(e);var c=n(0),o=n.n(c),i=n(17),s=n.n(i),a=(n(23),n(15),n(8)),r=n(2),j=n(10),u=n(1);var b=function(){var t=Object(c.useState)(),e=Object(j.a)(t,2),n=e[0],o=e[1],i=Object(c.useState)(),s=Object(j.a)(i,2),a=s[0],r=s[1],b=Object(c.useState)(!1),l=Object(j.a)(b,2),d=l[0],p=l[1];return Object(c.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(t){o(t.coords.latitude),r(t.coords.longitude)}))}),[d]),navigator.geolocation.watchPosition((function(t){console.log("Latitude is :",t.coords.latitude),console.log("Longitude is :",t.coords.longitude)})),Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("header",{className:"App-header",children:[Object(u.jsx)("p",{children:"Welcome to Wet-Dry Mapping!"}),Object(u.jsx)("button",{onClick:function(){p(!d)},children:"Update coords!"}),Object(u.jsxs)("h1",{children:["Your coords are ",n,", ",a]}),Object(u.jsxs)("p",{children:[Object(u.jsx)("button",{className:"App-button",type:"button",onClick:function(){window.location.href="/#/Login"},children:"Login"}),Object(u.jsx)("button",{className:"App-button",type:"button",onClick:function(){window.location.href="/#/Login"},children:"Sign up"})]}),Object(u.jsxs)("p",{children:[Object(u.jsx)("button",{className:"App-button",type:"button",onClick:function(){window.location.href="/#/About"},children:"About"}),Object(u.jsx)("button",{className:"App-button",type:"button",onClick:function(){window.location.href="/#/About"},children:"Help"})]})]})})};var l=function(){return Object(u.jsx)("div",{className:"Login",children:Object(u.jsx)("p",{children:"this is the login page"})})};var d=function(){return Object(u.jsx)("div",{className:"About",children:Object(u.jsx)("p",{children:"this is the about page"})})},p=function(){return Object(u.jsx)(a.b,{basename:"/wet-dry",children:Object(u.jsxs)(r.c,{children:[Object(u.jsx)(r.a,{exact:!0,path:"/",component:b}),Object(u.jsx)(r.a,{path:"/Login",component:l}),Object(u.jsx)(r.a,{path:"/About",component:d})]})})};var h=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(p,{})})};s.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(a.a,{children:Object(u.jsx)(h,{})})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.98e71380.chunk.js.map