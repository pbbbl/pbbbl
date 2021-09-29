"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function authFailed(url) {
  console.log('authFailed');
  var lastUser = Cookies.get('_user') || false;

  if (lastUser) {
    Cookies.set('_lastCampusUser', lastUser);
  }

  Cookies.set('_user', false);
  Cookies.remove('_user');

  if (!url) {
    url = encodeURI(window.location.href);
  }

  if (isDev || window.location.href.indexOf('test-campus') > -1 && window.location.href.indexOf('dev=true') > -1) {
    window.location.replace("https://".concat(authDomain, "/login?next=").concat(url));
    return;
  }

  window.location.replace("https://".concat(authDomain, "/login/"));
  return;
}

function dispatchAuth(validAuthData) {
  window.dispatchEvent(new CustomEvent("authorized", {
    bubbles: true,
    detail: {
      auth: validAuthData
    }
  }));
}

(function () {
  skillstruck = new SkillStruckPixel({
    id: 'user-pixel',
    demo: auth.demo || false,
    test: auth.isTest || false,
    hosts: {
      live: 'campus.skillstruck.com',
      test: 'test-campus.skillstruck.com'
    },
    onUser: function onUser(data) {
      return checkUser(data);
    },
    onFailed: function onFailed() {
      return authFailed("https://".concat(authDomain, "/homepage/login/"));
    }
  });

  function checkUser(data) {
    auth.user = {};
    auth.authorized = true;
    auth.user = _objectSpread({}, data);
    auth.user.pro = auth.user.premium ? true : false;
    auth.user.basic = !auth.user.pro;
    auth.user.sessionId = auth.sessionId;
    auth.user.educator = auth.user.account != 'student';
    auth.user.student = !auth.user.student;
    auth.uid = auth.user.id || false;
    auth.user.uid = auth.user.id || false;
    Cookies.set('_user', JSON.stringify(auth.user).trim(), _objectSpread(_objectSpread({}, auth.treat), {}, {
      expires: 1
    }));
    return dispatchAuth(auth);
  }
})();


