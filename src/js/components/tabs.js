window.addEventListener("hashchange", function() {
    runTabs();
}, false);

function dispatchHash() {
    window.dispatchEvent(new HashChangeEvent("hashchange"));

}

function tabsListen() {
    $('a').click(function() {
        if ($(this).attr('href').indexOf('#') > -1) {
            if ($(this).attr('role') == 'tab') {

                return;
            }
            var hash = $(this).attr('href');
            if (hash.indexOf('/') > -1) {
                if (hash.indexOf(window.location.origin) > -1) {
                    var url = new URL(hash);
                    hash = url.hash;
                } else {
                    var url = new URL(window.location.origin + hash);
                    hash = url.hash;
                }
            }
            var tab = $('html [role="tab"][href="' + hash + '"]');
            if (tab && tab.length) {

                return tab.click();
            } else {

                return
            }

        }
    });
}

function runTabs() {
    var hash = window.location.hash;
    if (!hash || hash.trim() == '') {
        return;
    }
    var tab = $('html [role="tab"][href="' + hash + '"]');

    // //     var tab = tabs.eq(0);
    if (!tab || !tab.length) {
        return;
    }
    return tab.click();
}

$(function() {
    tabsListen();
    runTabs();
});