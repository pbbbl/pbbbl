console.log('v-0.3.3');
var postItem, db, dbItems;
var proPost = false;
var dbData = {
    ready: false,
    items: {},
    item: {},
    libraries: {},
    library: {},
    user: {}
};
const campus = document.getElementsByTagName('html')[0];
const app = {
    ready: {
        db: false,
        jquery: false,
        authorized: false
    },
    db: false,
    auth: null,
    user: null
};
const $onReady = (callback) =>{
    console.log('$onReadyRan');
    if(typeof $ != 'undefined'){
        return callback($);
    }
    window.addEventListener('$',e=>{
        var _$ = e.details.$;
        while( typeof _$ != 'undefined'){
            function $runCallback(c){
                return c(_$);
            }
            return $runCallback(()=>{
                return callback(newJquery);
            })
        }
    });
}

// @codekit-append "./helpers/events.js";


const isDev = authLoc.indexOf('dev=true') > -1;

var awaitJquery = [];
var awaiting = [];



var adminSessionId = universalCookie("adminSessionId", function() {
    var paramData = getUrlParam('admin', window.location.href) || false;
    paramData = paramData && paramData != "" ? paramData : false;

    return paramData;
});

var isDemo = universalCookie("skillStruckDemo", function() {
    var isDemoParam = getUrlParam('demo', window.location.href) || false;
    isDemoParam = isDemoParam && isDemoParam != "" ? true : false;

    var paramData = isDemoParam && adminSessionId ? adminSessionId : false;
    return paramData;
});


window.addEventListener('dbReady', function(event) {
    $(function() {
        runAwaiting(dbData);
    });
});

function devRun(callback) {
    if (callback && window.location.href.indexOf("dev=true") > -1) {
        callback();
    }
}

function lastStepToRender(data) {

    if (data.authorized) {
        $('html, body,.campus-body').addClass('show authorized');
    }
}

function runAwaiting(data) {
    if (awaiting && awaiting.length) {
        for (var i = 0; i < awaiting.length; i++) {
            awaiting[i](data);
        }
        // if (i + 1 >= awaiting.length) {


        // }
    }
}


function runAwaitJquery(authReadyData) {
    if (awaitJquery && awaitJquery.length) {
        for (var i = 0; i < awaitJquery.length; i++) {
            awaitJquery[i](authReadyData);
        }
        if (i + 1 >= awaitJquery.length) {


            lastStepToRender(auth);

        }
    }
}

function getTs() {
    const dts = new Date();
    return dts.getTime();
}

function getThisEl(el, index) {
    el = $(el);
    let id = el.attr("id") || false;
    if (!id) {
        el.attr("id", `campus-id-${ index }`);
        id = el.attr("id");
    }
    el = $(`#${ id }`);
    return el;
}

function getStateData(key, obj) {
    // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])

    let isArray = key.indexOf(".") > -1 ? key.split(".") : false;
    return isArray ? multiIndex(obj, isArray) : obj[key] || false;
}

function multiIndex(obj, is) {
    // obj,['1','2','3'] -> ((obj['1'])['2'])['3']

    return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj ? obj : false;
}
/*
END - Send to helpers
*/

/*
START - FROM WEBFLOW TOP
*/





awaitJquery.push(function(data) {
    if (data.isLive) {
        $('[data-is-live-remove]').each(function() {
            if (window.location.hostname == 'test-campus.skillstruck.com') {
                var isLiveTest = $(this).attr('data-is-live-test-show') || false;
                if (isLiveTest) {
                    return;
                }
            }
            $(this).remove();
        });
        $('[data-is-live-show]').each(function() {
            if (window.location.hostname == 'test-campus.skillstruck.com') {
                var isLiveTestRemove = $(this).attr('data-is-live-test-remove') || false;
                if (isLiveTestRemove) {
                    $(this).remove();
                    return;
                }
            }
            return;
        });
    }
    if (data.isLive) {
        $('[data-is-test-remove]').each(function() {
            if (window.location.hostname == 'test-campus.skillstruck.com') {
                var isLiveTest = $(this).attr('data-is-live-test-show') || false;
                if (isLiveTest) {
                    return;
                }
            }
            $(this).remove();
        });
        $('[data-is-test-show]').each(function() {
            if (window.location.hostname == 'test-campus.skillstruck.com') {
                var isLiveTestRemove = $(this).attr('data-is-live-test-remove') || false;
                if (isLiveTestRemove) {
                    $(this).remove();
                    return;
                }
            }
            return;
        });
    }
    // DEMO
    if (data.isDemo) {
        $('[data-pro-remove]').remove();
        $('[data-demo-remove]').remove();
        $('[data-demo-show]').show();

    } else {
        $('[data-demo-only]').remove();
        $('[data-demo-show]').remove();


    }

    if (data.user.pro) {
        $('[data-pro-remove]').remove();
        $('[data-pro-required]').remove();
    } else {
        $('[data-pro-show]').remove();
    }
    if (typeof postItem == undefined || !postItem) {

    } else {
        if (postItem && !postItem.proItem) {
            $('[data-pro-remove]').remove();
            $('[data-pro-required]').remove();
        } else {
            $('[data-pro-remove]').remove();
            $('[data-pro-required]').remove();
            if (data.user.pro) {
                $('[data-pro-remove]').remove();
            } else {
                $('[data-pro-required]').remove();
            }
        }
    }
    if (data.user.image) {
        var getsUserImg = $('[data-set-user-image-bg]') || false;
        if (getsUserImg) {
            getsUserImg.css('background-image', 'url(' + data.user.image + ')');
        }
    }
    var requiresPath = $('[data-req-path]') || false;
    if (requiresPath) {
        $('[data-req-path]').each(function() {
            var reqPathName = $(this).attr('data-req-path') || false;
            if (reqPathName) {
                if (window.location.pathname != reqPathName) {
                    $(this).remove();
                }
            }
        });
    }
    var allForms = document.querySelectorAll('form') || false;
    if (allForms && allForms.length) {
        $('form').each(function(index) {
            var getForm = newEl($(this), index);
            var form = getNonSearchForm(getForm);
            if (!form) {
                return;
            }
            const inputsToAdd = [{
                    name: "accountIsDemo",
                    value: data.isDemo
                },
                {
                    name: "user_organization",
                    value: data.user.organization || "Failed to find Data"
                },
                {
                    name: "user_school",
                    value: data.user.school || "Failed to find Data"
                },

            ];
            for (var i = 0; i < inputsToAdd.length; i++) {
                var input = inputsToAdd[i];
                var newId = `added-input-${ input.name }-${ i }`;

                form.append(`<input hidden="true" style="display: none !important" id="added-input-${ newId }" name="${ input.name }" value="${ input.value || 'false' }"/>`);
            }
        });
    }
});


function getUrlParam(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function universalCookie(cookieName, tryValue) {
    var cookieValue = tryValue ? tryValue() : Coookies.get(cookieName) || false;
    if (cookieValue) {
        Cookies.set(cookieName, cookieValue);
        cookieValue = Cookies.get(cookieName);
        return cookieValue;
    }

    return false;
}

function devlog(data) {
    if (isDev) {
        return console.log(data);
    }
    return;
}

function newEl(el, index) {

    var id = el.attr('id') || false;

    if (!id) {
        id = `custom-${ el.prop( "tagName" ).toLowerCase() }-${ index }`;
        el.attr('id', id);

    }
    el = $(`#${ id }`);

    return el;

}

function getNonSearchForm(form) {
    var action = form.attr('action') || false;
    var isSearch = action ? form.attr('action') == '/search' || form.attr('action').indexOf('search') > -1 : false;
    if (isSearch) {
        return false;
    }
    return form;
}