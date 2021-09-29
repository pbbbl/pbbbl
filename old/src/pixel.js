var skillstruckDemo;
var skillstruckHelp = {
    example: `
var skillstruck = new SkillStruckPixel({
    id: 'skill-struck-pixel',
    hosts: {
        live: 'campus.skillstruck.com',
        test: 'test-campus.skillstruck.com'
    },
    onUser: (data) => {
        return dispatchUser(data);
    }
});`,
    hosts: 'Please provide an object with valid url hosts (window.location.hosts) for live and test sites.',
    user: 'This object will contain user data or it will be false if the user is unauthorized',
    id: 'You must provide a valid DOM id for this property.',
    onUser: 'Event that is ran by the pixel whenever auth changes. \nYou can also listen for the frame event "user"; "user" event bubbles, and can be heard on "window", too.'
}

function SkillStruckPixel(options) {
    // console.log(options, `https://${options.test || options.demo ? 'test' : 'my'}.skillstruck.com/account/auth.pixel?key=${auth.demo ? '?key=' + auth.demo : ''}`)
    const pixel = {
        user: {
            authorized: false
        },
        env: false,
        origin: null,
        frame,
        src: null,
        host: window.location.host,
        on: {
            user: (data) => {
                const userEventData = {...data.user };
                window.dispatchEvent(new CustomEvent('user', {
                    bubbles: true,
                    detail: {...userEventData }
                }));
                return data.onUser({...userEventData })
            },
            failed: (data) => {
                const userEventData = {...data.user };
                window.dispatchEvent(new CustomEvent('user', {
                    bubbles: true,
                    detail: {...userEventData }
                }));
                if (!data.onFailed) {
                    return data.on.user(data);
                }
                return data.onFailed({...userEventData })
            },
            imposter: (data) => {
                if (!data.onImposter) {
                    return;
                }
                return data.onImposter({...data })
            }
        },
        help: buildSkillStruckHelp(),
        ...options
    }
    const origins = {
        demo: "https://test.skillstruck.com",
        test: "https://test.skillstruck.com",
        live: "https://my.skillstruck.com"
    }
    if (options.demo) {
        pixel.src = `https://test.skillstruck.com/account/auth.pixel?key=${options.demo}`;
        pixel.origin = origins.demo;
        pixel.env = 'demo';
    } else if (options.test) {
        pixel.src = `https://test.skillstruck.com/account/auth.pixel`;
        pixel.origin = origins.test;
        pixel.env = 'test';
    } else {
        pixel.src = `https://my.skillstruck.com/account/auth.pixel`;
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
            pixel.user = {...event.data };
            pixel.user.pro = pixel.user.premium || false;
            if (!pixel.user.authorized) {
                return pixel.on.failed(pixel);
            }
            return pixel.on.user(pixel);
        }
        return;


    }
    window.addEventListener("message", (event) => {
        frameEvent(event);
    });
    const frame = skillstruckPixelDOM(options);
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
    var keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        helpStr += `\n${key.toUpperCase()}: \n${obj[key]}\n\n`;
        if (i + 1 >= keys.length) {
            helpStr += '\n=============== END HELP ===============';
            return helpStr;
        }
    }
}

function skillstruckPixelDOM({ id, src }) {
    var container = document.createElement('div');
    container.setAttribute('id', `${id}-container`);
    container.style.cssText = 'display: none !important;';
    container.classList.add('d-none');
    document.body.appendChild(container);
    container = document.getElementById(`${id}-container`);
    container.innerHTML = `<iframe style="display: none;" id="${id}" src=""></iframe>`;
    const frame = document.getElementById(id);
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