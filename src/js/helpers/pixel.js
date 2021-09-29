function skillStruckPixel() {
    var pixel = document.getElementById('skill-struck-pixel');
    var url, validOrigin;
    var host = window.location.host;
    if (isDemo) {
        url = `https://test.skillstruck.com/account/auth.pixel?key=${adminSessionId}`;
        validOrigin = "https://test.skillstruck.com";
    } else if (host === 'test-campus.skillstruck.com') {
        url = `https://test.skillstruck.com/account/auth.pixel`;
        validOrigin = "https://test.skillstruck.com";
    } else {
        url = `https://my.skillstruck.com/account/auth.pixel`;
        validOrigin = "https://my.skillstruck.com";
    }
    window.addEventListener("message", (event) => {
        if (event.origin !== validOrigin) {
            return;
        } else {
            // console.log('pixel', event);
        }

    }, false);
    pixel.src = url;
}