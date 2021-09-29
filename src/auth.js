// let sessionId, session, user;
const authLoc = window.location.href;
const authDevMode = authLoc.indexOf('dev=true') > -1;
const authTestMode = authLoc.indexOf("https://test-campus.skillstruck.com") > -1;
const authDemoMode = Cookies.get('demostruck') || authLoc.indexOf("demo=true") > -1;
const authTestLiveMode = authLoc.indexOf("live=true") > -1;
const authDomain = authTestMode || authDemoMode ? "test.skillstruck.com" : "my.skillstruck.com";
const demoKey = authDemoMode ? Cookies.get('demostruck') ? Cookies.get('demostruck') : authParams('admin', authLoc) : false;
if (demoKey) {
    var demoExpiration = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
    Cookies.set('demostruck', demoKey, { expires: demoExpiration });
}


const cdnLoginSuffix = authTestMode ? "?test=true" : "";
let returnPath = authLoc.replace(window.location.origin, '');
if (returnPath.charAt(0) != '/') {
    returnPath = `/${ returnPath }`;
}

let auth;

auth = {
    sessionId: Cookies.get('sessionId') || null,
    user: null,
    uid: null,
    authorized: null,
    userCookie: Cookies.get('_user') || null,
    demo: demoKey || false,
    isDemo: authDemoMode,
    isDev: authTestLiveMode && authDevMode ? authDevMode ? true : false : authTestMode,
    isTest: authTestLiveMode ? false : authTestMode,
    isLive: authTestLiveMode ? true : !authTestMode,

    // Helper Data
    urls: {
        auth: `https://${ authDomain }/account/auth/`,
        login: `https://${ authDomain }/homepage/login/?next=/account/auth.campus?next=${ encodeURI( returnPath ) }`,
        portal: `https://${ authDomain }/`
    },
    treat: { // switch back to treat eventually

        path: "",
        domain: ".skillstruck.com"
    },

    campusTreat: {
        path: "",
        domain: authTestMode ? 'test-campus.skillstruck.com' : "campus.skillstruck.com"
    },
    mode: {

        dev: authTestMode && authDevMode,
        test: authTestMode,
        live: !authTestMode && !authDevMode
    }

};
var skillstruck;

function authParams(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}