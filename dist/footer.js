"use strict";var authorizedRanJquery=!1;function sideNavInit(){var t=$("#campus-side-nav");if(t){var e=$("html"),a=$("body"),o=$("#campus-side-nav-toggle-button"),n=$("#campus-side-nav-close-button"),r=function toggleSidenav(){var r=$("body").hasClass("side-nav-open");t.attr("tabindex","".concat(r?-1:0));var i=r?"Close Side Navigation":"Open Side Navigation";o.attr("aria-label",i),r?(a.removeClass("side-nav-open"),e.removeClass("side-nav-open"),n.attr("tabindex",-1),t.attr("tabindex",-1),setTimeout((function(){a.removeClass("side-nav-show"),e.removeClass("side-nav-show"),o.focus()}),250)):(a.addClass("side-nav-show"),e.addClass("side-nav-show"),t.attr("tabindex",0),setTimeout((function(){a.addClass("side-nav-open"),e.addClass("side-nav-open"),n.attr("tabindex",0),t.focus()}),50))};$(".side-nav-inner a").click(r),n.click(r),o.click(r)}}function dispatchHash(){window.dispatchEvent(new HashChangeEvent("hashchange"))}function tabsListen(){$("a").click((function(){if($(this).attr("href").indexOf("#")>-1){if("tab"==$(this).attr("role"))return;var t=$(this).attr("href");if(t.indexOf("/")>-1)if(t.indexOf(window.location.origin)>-1)t=new URL(t).hash;else t=new URL(window.location.origin+t).hash;var e=$('html [role="tab"][href="'+t+'"]');return e&&e.length?e.click():void 0}}))}function runTabs(){var t=window.location.hash;if(t&&""!=t.trim()){var e=$('html [role="tab"][href="'+t+'"]');if(e&&e.length)return e.click()}}function ownKeys(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,o)}return a}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach((function(e){_defineProperty(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function _defineProperty(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}window.addEventListener("authorized",(function(t){var e=t.detail.auth;authorizedRanJquery=!0,$((function(){runAwaitJquery(e)}))})),$((function(){jq$()})),sideNavInit(),window.addEventListener("hashchange",(function(){runTabs()}),!1),$((function(){tabsListen(),runTabs()}));var dbVotes={};if(window.location.href.indexOf("library/vote")>-1){var votesInit=function votesInit(){voteItems.each((function(){var t=$("#".concat($(this).attr("id"))),e=t.attr("data-id");if(!e)return t.remove();var a=t.parents(".item-wrapper");a.attr("id","parent-".concat(e)),a=$("#parent-".concat(e));$("#parent-".concat(e," .item-data"));var o="#parent-".concat(e," .data.card-body"),n=$(o).html(),r=t.attr("id"),i={dbID:e,dbCID:"items",itemID:e,cid:t.attr("data-cid"),title:t.attr("data-title"),slug:t.attr("data-slug"),open:t.attr("data-open"),opens:t.attr("data-opens"),closes:t.attr("data-closes"),cardBodySelector:o,votes:[],renderId:r},d=buildVote(_objectSpread(_objectSpread({},i),{},{voted:!1,voteCount:"-",enabled:!0,loading:!0,cardBody:n}));dbVotes[e]=i,renderVote({html:d,renderId:r});getVote(i,(function(t){var a=t.cardBodySelector,o=$(a).html(),n=_objectSpread(_objectSpread({},t),{},{loading:!1,voted:getUserVoted(t.votes),voteCount:getVoteCount(t),cardBody:o});n.enabled=!n.voted&&"true"==n.open;var r=buildVote(n);return dbVotes[e]=t,renderVote({html:r,renderId:i.renderId})}))}))},voteItems=$("[data-render-vote]")||!1;votesInit()}function renderVote(t){var e=t.html,a=t.renderId;$("#"+a).html(e)}function dbVoteAction(t){var e=t.dataset.target,a=dbVotes[e],o=a.cardBodySelector,n=$(o).html();renderVote({html:buildVote(_objectSpread(_objectSpread({},a),{},{enabled:!0,loading:!0,voted:!1,voteCount:getVoteCount(a),cardBody:n})),renderId:a.renderId}),runVote(a)}function buildVote(t){return t.cardBody=t.cardBody.replace("<p>","").replace("</p>",""),'<div data-req-path="/library/vote" class="card-item vote '.concat(t.loading?"loading":"not-loading"," ").concat(t.enabled?"enabled":"disabled",'" id="rendered-vote-').concat(t.itemID,'">\n        <div class="card-item-row">\n            <div class="card-item-body">\n                <h4 class="card-title">').concat(t.title,'</h4>\n                <p class="card-body small">').concat(t.cardBody,'</p>\n                <div class="pt-20 vote-learn-more">\n                    <a href="/learn/').concat(t.slug,'" class="button small primary-flat w-inline-block">\n                        <div>Learn more</div>\n                        <div class="sr">&nbsp;about&nbsp;</div>\n                        <div class="sr">').concat(t.title,'</div>\n                    </a>\n                </div>\n            </div>\n            <div class="db-action-wrapper">\n                <').concat(t.enabled?'button type="button"':"div",' class="db-action" aria-label="').concat(t.enabled?"Vote now! (Total votes: "+t.voteCount+")":"You voted already. (Total Votes: "+t.voteCount+")",'" onClick="').concat(t.enabled?"dbVoteAction(this)":"",'" data-target="').concat(t.itemID,'"id="db-action-').concat(t.itemID,'">\n                    <div class="action-icon-wrapper" style="position:relative" aria-hidden="true">\n                        <div class="action-icon if-enabled"></div>\n                        <div class="action-icon if-loading spinner"></div>\n                    </div>\n                    <div class="action-text"><span class="sr">Total votes: </span>').concat(t.voteCount,"</div>\n                </").concat(t.enabled?"button":"div",">\n            </div>\n        </div>\n    </div>")}function getVoteCount(t){var e,a=t.votes||!1;return!a||!a.length||a.length<1?e=0:((e=a.length)>999&&(e=(e=e.toString()).subString(0,2)+"k"),e=e.toString()),e}function getUserVoted(t){var e=auth.uid||!1;return!(!(t&&e&&t.length)||t.length<0)&&!!(t.filter((function(t){return t==auth.uid}))[0]||!1)}function runVote(t){var e=_objectSpread(_objectSpread({},t),{},{uid:auth.uid});if("true"==e.open&&0==getUserVoted(t)){var a={url:"https://us-central1-skill-flow.cloudfunctions.net/vote",method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify(e)};$.ajax(a)}}function addVoteItem(t){var e=_objectSpread(_objectSpread({},t),{},{uid:auth.uid}),a={url:"https://us-central1-skill-flow.cloudfunctions.net/addItem",method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify(e)};return $.ajax(a)}function setItem(t){var e=_objectSpread(_objectSpread({},t),{},{uid:auth.uid}),a={url:"https://us-central1-skill-flow.cloudfunctions.net/setDBItem",method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify(e)};return $.ajax(a)}function getVote(t,e){return db.collection(t.dbCID).doc(t.itemID).onSnapshot((function(a){var o=!!a.exists&&a.data();if(o||addVoteItem(t),o&&e){for(var n in o)o[n]!=t[n]&&"string"==typeof o[n]&&!0&&setItem({dbID:o.dbID,dbCID:o.dbCID,itemID:t.dbID,cid:t.cid,title:t.title,slug:t.slug,open:t.open,opens:t.opens,closes:t.closes,cardBodySelector:t.cardBodySelector,votes:o.votes,renderId:t.renderId});return e(o)}return o}))}function defaultVote(t,e){return{dbID:t,library:e,votes:[],scores:[],season:{start:null,end:null}}}function editorToolsInit(){var t=$('[data-toggle-editor-mode="test"]'),e=$('[data-toggle-editor-mode="live"]'),a=new URL(window.location.href),o=window.location.origin.indexOf("test-campus.skillstruck.com")>-1,n="true"==a.searchParams.get("live")&&o;e.addClass("active-"+n),e.removeClass("active-"+!n),t.addClass("active-"+n),t.removeClass("active-"+!n),e.attr("href",window.location.href+"?live=true"),t.attr("href",window.location.href+""),o&&$("a").each((function(){if(!$(this).attr("data-toggle-editor-mode")){var t=$(this).attr("href");t&&(t.indexOf("?")>-1&&!t.indexOf("live=true")>-1&&(t+="&live=true"),$(this).attr("href",t))}}))}function renderCaptivate(t){t.fullscreen=!1;t._id;var e=t.id,a=t.outer,o=t.frame,n=t.controls,r=t.toggle,i=t.url,d=t.width,s=t.height,c=(t.ratio,t.doc,t.fullscreen),l=$("#".concat(e));l.height(s),l.width(d),l.css({width:"".concat(d+0,"px"),height:"".concat(s+0,"px")}),l.html('\n        <div class="captivate-outer" id="'.concat(a,'" style="width: ').concat(d,"px; height: ").concat(s,'px;">\n            \n            <div class="captivate-controls" id="').concat(n,'">\n                <button class="button captivate-enter" id="').concat(r,'" data-target="captivate-outer-').concat(e,'" aria-expanded="').concat(c,'" aria-controls="captivate-frame ').concat(e,'" type="button" aria-has-popup="true">Start Lesson</button>\n            </div>\n            <iframe tabindex="0" title="Interactive Lesson" id="').concat(o,'" class="captivate-frame" style="width: ').concat(d,"px; height: ").concat(s,'px;" src="').concat(i,'">\n            </iframe>\n        </div>\n\n        '));var u=$("#".concat(a)),h=$("#".concat(o)),p=$("#".concat(a)),v=$("#".concat(r)),f=$("html"),m=function adjustSize(){d=l.width(),s=l.height();var e=l.height();t.fullscreen&&1==t.fullscreen&&(d=f.width(),e=(s=f.height())-60),p.width(d),p.height(s),p.css({width:"".concat(d,"px"),height:"".concat(s,"px")}),h.width(d),h.height(e),h.css({width:"".concat(d,"px"),height:"".concat(e,"px")})};v.click((function(){t.fullscreen=!t.fullscreen,v.toggleClass("theme-light"),u.toggleClass("fullscreen"),f.toggleClass("captivate-fullscreen captivate-overlay");var e,a="Start Lesson";t.fullscreen&&1==t.fullscreen?(a="Exit Lesson",e=h):(e=v,h.attr("src",""),h.attr("src",i)),m(),v.text(a),v.attr("aria-expanded",t.fullscreen),e.focus()})),window.onresize=m}function setDataInit(){var t=$("html").width()<992,e=$("html").width()/$("html").height(),a=t?$("html").width()/$("html").height():.5625;$("[data-sets]").each((function(){var t=$(this).attr("data-sets"),o=$(this).attr("data-id"),n=$(this).attr("id"),r=$("#"+n);"captivate"==t&&renderCaptivate({_id:o,id:n,render:r.attr("data-render-id"),outer:"captivate-outer-".concat(n),frame:"captivate-frame-".concat(n),toggle:"captivate-toggle-".concat(n),controls:"captivate-controls-".concat(n),url:r.attr("data-url"),width:r.width(),height:r.width()*a,ratio:a,doc:{screenRatio:e,docWidth:$("html").width(),docHeight:$("html").height()}})}))}window.addEventListener("authorized",(function(t){t.detail.auth.user;$((function(){auth&&auth.user&&auth.user.image?$("[data-set-user-image-bg]").css("background-image","url(".concat(auth.user.image,")")):window.addEventListener("authorized",(function(t){$("[data-set-user-image-bg]").css("background-image","url(".concat(auth.user.image))}));var t=$(".show-if-first"),e=$('.set-html-first,[data-set-user-first="true"]');if(auth&&auth.user&&auth.user.first){var a=auth.user.first;e.html(a)}else t.remove()}))})),$((function(){auth.isTest?($("[data-get-href-portal]").attr("href","https://test.skillstruck.com"),$("[data-get-href-logout]").attr("href","https://test.skillstruck.com/logout")):($("[data-get-href-portal]").attr("href","https://my.skillstruck.com"),$("[data-get-href-logout]").attr("href","https://my.skillstruck.com/logout"))})),editorToolsInit(),$((function(){setDataInit()}));var proRequestWaitDays=7;function checkRequested(){$(".campus-pro-form form").prepend('\n<textarea hidden="true" class="d-none" name="message">\nThere is no message for this one-click-form. \n\nUser will not be shown this form again for '.concat(proRequestWaitDays," days.\n    \nIf you have questions, concerns, or want to change that ").concat(proRequestWaitDays," day duration, contact Tyler.\n</textarea>\n"));var t="u"+auth.uid,e=window.localStorage.getItem("campusProRequested")?JSON.parse(window.localStorage.getItem("campusProRequested")):{},a=(new Date).getTime();e&&e[t]?e[t].expires>a?($(".campus-pro-form").remove(),$("[data-pro-requested-show]").show(),$("[data-pro-requested-remove]").remove()):$("[data-pro-requested-show]").hide():$("[data-pro-requested-show]").hide();$(".campus-pro-form form").submit((function(){$(".campus-pro-form").hide(),$("[data-pro-requested-remove]").hide(),$("[data-pro-requested-show]").show();var e=new Date;e.setDate(e.getDate()+proRequestWaitDays),e=e.getTime();var a=window.localStorage.getItem("campusProRequested")?JSON.parse(window.localStorage.getItem("campusProRequested")):{};a[t]={uid:auth.uid,expires:e},window.localStorage.setItem("campusProRequested",JSON.stringify(a))}))}function proSetup(){proPost=proPost||!1;var t=$("[data-is-pro]"),e=$("[data-no-pro]"),a=$("[data-fallback]");proPost?(e.remove(),auth.user.premium?a.remove():t.remove()):(t.remove(),a.remove())}function userDropdown(){var t=$("#user-dropdown-toggle"),e=$("#user-dropdown"),a=!1,o={top:"60px",right:$(window).width()-t[0].getBoundingClientRect().right+$(window).scrollLeft()+"px",left:"auto",bottom:"auto","z-index":1e4,"max-width":"280px","min-width":"280px",width:"280px",position:"fixed"};e.css(o),t.click((function(){a||(a=!0,$("body").append(e),e=$("#user-dropdown"))}))}$((function(){checkRequested()})),window.addEventListener("authorized",(function(t){t.detail.auth.user;$((function(){proSetup()}))})),userDropdown(),window.addEventListener("resize",(function(){userDropdown()}));