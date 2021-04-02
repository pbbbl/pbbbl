function authFailed(url) {
    console.log('authFailed');
    const lastUser = Cookies.get('_user') || false;
    if (lastUser) {
        Cookies.set('_lastCampusUser', lastUser);
    }
    Cookies.set('_user', false);
    Cookies.remove('_user');
    if (!url) {
        url = encodeURI(window.location.href);
    }
    if (isDev || window.location.href.indexOf('test-campus') > -1 && window.location.href.indexOf('dev=true') > -1) {
        window.location.replace(`https://${ authDomain }/login?next=${ url }`);
        return;
    }
    window.location.replace(`https://${ authDomain }/login/`);
    return;
}

function dispatchAuth(validAuthData) {
    window.dispatchEvent(
        new CustomEvent("authorized", {
            bubbles: true,
            detail: { auth: validAuthData }
        })
    );
}


(function() {
    skillstruck = new SkillStruckPixel({
        id: 'user-pixel',
        demo: auth.demo || false,
        test: auth.isTest || false,
        hosts: {
            live: 'campus.skillstruck.com',
            test: 'test-campus.skillstruck.com'
        },
        onUser: data => checkUser(data),
        onFailed: () => authFailed(`https://${ authDomain }/homepage/login/`)
    });


    function checkUser(data) {
        auth.user = {};
        auth.authorized = true;
        auth.user = {...data };
        auth.user.pro = auth.user.premium ? true : false;
        auth.user.basic = !auth.user.pro;
        auth.user.sessionId = auth.sessionId;
        auth.user.educator = auth.user.account != 'student';
        auth.user.student = !auth.user.student;
        auth.uid = auth.user.id || false;
        auth.user.uid = auth.user.id || false;
        Cookies.set('_user', JSON.stringify(auth.user).trim(), {
            ...auth.treat,
            expires: 1
        });
        return dispatchAuth(auth);
    }


})();