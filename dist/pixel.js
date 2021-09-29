"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var skillstruckDemo;
var skillstruckHelp = {
  example: "\nvar skillstruck = new SkillStruckPixel({\n    id: 'skill-struck-pixel',\n    hosts: {\n        live: 'campus.skillstruck.com',\n        test: 'test-campus.skillstruck.com'\n    },\n    onUser: (data) => {\n        return dispatchUser(data);\n    }\n});",
  hosts: 'Please provide an object with valid url hosts (window.location.hosts) for live and test sites.',
  user: 'This object will contain user data or it will be false if the user is unauthorized',
  id: 'You must provide a valid DOM id for this property.',
  onUser: 'Event that is ran by the pixel whenever auth changes. \nYou can also listen for the frame event "user"; "user" event bubbles, and can be heard on "window", too.'
};

function SkillStruckPixel(options) {
  var pixel = _objectSpread({
    user: {
      authorized: false
    },
    env: false,
    origin: null,
    frame: frame,
    src: null,
    host: window.location.host,
    on: {
      user: function user(data) {
        var userEventData = _objectSpread({}, data.user);

        window.dispatchEvent(new CustomEvent('user', {
          bubbles: true,
          detail: _objectSpread({}, userEventData)
        }));
        return data.onUser(_objectSpread({}, userEventData));
      },
      failed: function failed(data) {
        var userEventData = _objectSpread({}, data.user);

        window.dispatchEvent(new CustomEvent('user', {
          bubbles: true,
          detail: _objectSpread({}, userEventData)
        }));

        if (!data.onFailed) {
          return data.on.user(data);
        }

        return data.onFailed(_objectSpread({}, userEventData));
      },
      imposter: function imposter(data) {
        if (!data.onImposter) {
          return;
        }

        return data.onImposter(_objectSpread({}, data));
      }
    },
    help: buildSkillStruckHelp()
  }, options);

  var origins = {
    demo: "https://test.skillstruck.com",
    test: "https://test.skillstruck.com",
    live: "https://my.skillstruck.com"
  };

  if (options.demo) {
    pixel.src = "https://test.skillstruck.com/account/auth.pixel?key=".concat(options.demo);
    pixel.origin = origins.demo;
    pixel.env = 'demo';
  } else if (options.test) {
    pixel.src = "https://test.skillstruck.com/account/auth.pixel";
    pixel.origin = origins.test;
    pixel.env = 'test';
  } else {
    pixel.src = "https://my.skillstruck.com/account/auth.pixel";
    pixel.origin = origins.live;
    pixel.env = 'live';
  }

  var validFrameEvent = false;

  function frameEvent(event) {
    if (event.data.authorized && event.origin !== pixel.origin) {
      return pixel.on.imposter(event);
    }

    if (event.origin === pixel.origin && !validFrameEvent) {
      validFrameEvent = true;
      pixel.user = _objectSpread({}, event.data);
      pixel.user.pro = pixel.user.premium || false;

      if (!pixel.user.authorized) {
        return pixel.on.failed(pixel);
      }

      return pixel.on.user(pixel);
    }

    return;
  }

  window.addEventListener("message", function (event) {
    frameEvent(event);
  });
  var frame = skillstruckPixelDOM(options);

  if (!frame) {
    return console.error('Element not found with ID: ' + options.id);
  }

  frame.src = pixel.src;
  pixel.frame = frame;
  return pixel;
}

function buildSkillStruckHelp() {
  var obj = skillstruckHelp;
  var helpStr = '=============== BEGIN HELP ===============\n';
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    helpStr += "\n".concat(key.toUpperCase(), ": \n").concat(obj[key], "\n\n");

    if (i + 1 >= keys.length) {
      helpStr += '\n=============== END HELP ===============';
      return helpStr;
    }
  }
}

function skillstruckPixelDOM(_ref) {
  var id = _ref.id,
      src = _ref.src;
  var container = document.createElement('div');
  container.setAttribute('id', "".concat(id, "-container"));
  container.style.cssText = 'display: none !important;';
  container.classList.add('d-none');
  document.body.appendChild(container);
  container = document.getElementById("".concat(id, "-container"));
  container.innerHTML = "<iframe style=\"display: none;\" id=\"".concat(id, "\" src=\"\"></iframe>");
  var frame = document.getElementById(id);
  return frame;
}

function skillstruckParams(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function skillstruckCookie(cookieName, tryValue) {
  var cookieValue = Cookies.get(cookieName) || window.sessionStorage.getItem(cookieName) || window.localStorage.getItem(cookieName) || tryValue ? tryValue() : false;

  if (cookieValue) {
    Cookies.set(cookieName, cookieValue, {
      expires: 30
    });
    window.sessionStorage.setItem(cookieName, cookieValue);
    window.localStorage.setItem(cookieName, cookieValue);
    cookieValue = Cookies.get(cookieName);
    return cookieValue;
  }

  return false;
}


