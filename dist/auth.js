"use strict";var authLoc=window.location.href,authDevMode=authLoc.indexOf("dev=true")>-1,authTestMode=authLoc.indexOf("https://test-campus.skillstruck.com")>-1,authDemoMode=Cookies.get("demostruck")||authLoc.indexOf("demo=true")>-1,authTestLiveMode=authLoc.indexOf("live=true")>-1,authDomain=authTestMode||authDemoMode?"test.skillstruck.com":"my.skillstruck.com",demoKey=!!authDemoMode&&(Cookies.get("demostruck")?Cookies.get("demostruck"):authParams("admin",authLoc));if(demoKey){var demoExpiration=new Date((new Date).getTime()+432e5);Cookies.set("demostruck",demoKey,{expires:demoExpiration})}var auth,skillstruck,cdnLoginSuffix=authTestMode?"?test=true":"",returnPath=authLoc.replace(window.location.origin,"");function authParams(e,t){e=e.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}"/"!=returnPath.charAt(0)&&(returnPath="/".concat(returnPath)),auth={sessionId:Cookies.get("sessionId")||null,user:null,uid:null,authorized:null,userCookie:Cookies.get("_user")||null,demo:demoKey||!1,isDemo:authDemoMode,isDev:authTestLiveMode&&authDevMode?!!authDevMode:authTestMode,isTest:!authTestLiveMode&&authTestMode,isLive:!!authTestLiveMode||!authTestMode,urls:{auth:"https://".concat(authDomain,"/account/auth/"),login:"https://".concat(authDomain,"/homepage/login/?next=/account/auth.campus?next=").concat(encodeURI(returnPath)),portal:"https://".concat(authDomain,"/")},treat:{path:"",domain:".skillstruck.com"},campusTreat:{path:"",domain:authTestMode?"test-campus.skillstruck.com":"campus.skillstruck.com"},mode:{dev:authTestMode&&authDevMode,test:authTestMode,live:!authTestMode&&!authDevMode}};
