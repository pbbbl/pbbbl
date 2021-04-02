var libSlug = window.location.pathname;
libSlug = libSlug.split('/');
var slugIndex = libSlug.length - 1;
libSlug = libSlug[slugIndex];


window.addEventListener('DOMContentLoaded', function (event) {
    requireSlug();
    setTimeout(function () {
        var htmlEl = document.querySelectorAll('html')[0];
        var bodyEl = document.querySelectorAll('body')[0];
        var campusBodyEl = document.querySelectorAll('.campus-body')[0];
        var els = [htmlEl, bodyEl, campusBodyEl];
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            el.className += " authorized show";
        }
    }, 3000);
});
window.addEventListener('authorized', function (e) {
    setFormValues(e.detail.auth.user);
});
awaiting.push(editButtonSetup);

function editButtonSetup() {
    $('.form-group.read-only').each(function () {
        var id = $(this).attr('id');
        if (!id) {
            $(this).attr('id', $(this).find('[id]').attr('id') + '-group');
            id = $(this).attr('id');

        }
        var t = $('#' + id);
        var input = $('#' + id + ' .control');
        if (!input) {
            input = $('#' + id + ' input, #' + id + ' textarea, #' + id + ' select');
            if (!input) {
                return;
            }
        }
        var label = $('#' + id + ' label');
        var value = input.val();
        var name = input.attr('name');

        $(this).prepend('<button type="button" class="button button-text edit-button" aria-label="Edit ' + name + ' (' + value + ')">Edit</button>');
        var button = $(this).find('.edit-button');
        editButtonListen(button, t, label, input);
        setTimeout(function () {
            input = $('#' + id + ' .control');
            value = input.val();

            if (!value || value.trim() === "") {

                button.remove();
                t.removeClass('read-only');
                return;
            }
            button.attr('aria-label', 'Edit ' + name + ' (' + value + ')');
        }, 5000);
    });
}

function editButtonClicked(parent, button) {
    parent.removeClass('read-only');
    button.remove();
}

function editButtonListen(button, parent, label, input) {

    button.on('click', function () {
        editButtonClicked(parent, button);
    });
}

function requireSlug(els) {
    if (!els) {
        els = document.querySelectorAll('[data-require-slug]');
    }

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var reqSlug = el.dataset.requireSlug;
        if (reqSlug.indexOf(',') > -1) {
            var reqSlugs = reqSlug.split(',');
            var slugsMatch = false;
            for (var iSlug = 0; iSlug < reqSlugs.length; iSlug++) {
                if (slugsMatch || reqSlugs[iSlug] == libSlug) {
                    slugsMatch = true;
                }
                if (iSlug + 1 >= reqSlugs.length) {
                    if (!slugsMatch) {
                        el.remove();
                    }
                }
            }
        } else if (reqSlug.indexOf('!') > -1) {
            if (libSlug === reqSlug) {
                el.remove();
            }
        } else if (libSlug !== reqSlug) {
            el.remove();
        }
    }
}

function setFormValues(user) {
    var els = document.querySelectorAll('[data-get-value]');
    var valData = {
        uid: user.uid,
        name: (user.first || "") + " " + (user.last || ""),
        email: user.email || auth.email || auth.user.email || "",
        location: window.location.href
    };
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var valKey = el.dataset.getValue;
        if (valData[valKey]) {
            el.value = valData[valKey];
        }
    }
}















// 
// 

var ranShowIf = false;

function at$(callback){
    if(typeof $ != 'undefined' && callback){
        return $(function(){ callback() })
    }
    window.addEventListener('$',function(){

        if($ && callback){
       
               return $(function () {
                   callback();
               });
        }
        let $$ready = false;
        while(!$ || typeof $ == 'undefined' || $ == 'undefined') {
            $$ready = true;
        }   
        while($$ready){
            return $(function(){
                callback();
            });
        }
    });
}
function onAuthorized_inHead(){
    campus.addEventListener('authorized', (event) => {
        return runPostIfShow(event.detail.user);
    });

    console.log('onAuthorized_inHead ran!');
    awaitUserData();
}

at$(onAuthorized_inHead);

// 
function awaitUserData() {
    return setTimeout(function () {


        if (!ranShowIf && (!auth || !auth.user || !auth.user.id)) {
            return awaitUserData();
        }
        if (!ranShowIf && auth.user.id) {
            return runPostIfShow(auth.user, true);
        }
        return;
    }, 50);
}
function runPostIfShow(authUser, timedOut) {

    if (!ranShowIf) {
        ranShowIf = true;

        var fbPro = $('[data-fallback]');
        var isPro = $('[data-is-pro]');
        var noPro = $('[data-no-pro]');
        var els;

        if (!proPost || proPost != true) {
            els = noPro;
            return runIfShow(els);
        } else {
            if (!authUser.premium || authUser.premium === false) {
                els = fbPro;
                return runIfShow(els);
            }
            else {
                els = isPro;
                return runIfShow(els);
            }
        }
    }
}

function runIfShow(els) {
    els.each(function (index) {
        var el = $(this);
        var cssAttr = `data-if-show-display`;
        if (el.attr(cssAttr)) {
            var cssDisplay = el.attr(cssAttr);
            if (!cssDisplay) {
                cssDisplay = 'block';
            }
            var currentStyle = el.attr('style') || '';

            el.attr('style', currentStyle + 'display:' + cssDisplay + ' !important;');

        }
    });
}


$(function () {
    $('.main-section.tabs-list-section.w-tab-menu').attr('id', 'secondary-navbar');

    var navHeights = $('#primary-navbar').height() + ($('#secondary-navbar').height() * 1.5);
    topTarget = navHeights + (navHeights / 2);
    $('.toc-col .toc-list').html('');
    getToc();


});

// TOC BUILDER
function getToc() {
    var postMain = $('.post-main-content');
    if (postMain.length && postMain.length > 1) {
        console.log('too many .post-main-content waiting 150');
        return setTimeout(function () {
            return getToc();
        }, 150);
    }

    var postMainId = 'campus-post-main-content';
    postMain.attr('id', postMainId);




    var mainHash = '#' + postMainId;
    postMain = $(mainHash);
    var h2Sel = mainHash + ' h2';
    var h2s = $(h2Sel);
    var h3Sel = mainHash + ' h3';
    var h3s = $(h3Sel);
    var h4Sel = mainHash + ' h4';
    var h4s = $(h4Sel);
    var useH3s = h2s.length < 4 && h3s && h3s.length && h3s.length > 0;
    var useH4s = h3s.length < 4 && h4s && h4s.length && h4s.length > 0;
    var hTocSel = h2Sel;
    if (useH3s) {
        hTocSel += ', ' + h3Sel;
    }
    if (useH4s) {
        hTocSel += ', ' + h4Sel;

    }

    var hTocEls = $(hTocSel);

    var toc = $('.toc-col');
    var continueBuild = toc && toc.length && toc.length > 0 && hTocEls && hTocEls.length && hTocEls.length > 0;
    if (!continueBuild) {

        return;

    }

    var tocList = $('.toc-col .toc-list');
    var tocLength = hTocEls.length;
    tocList.html('');

    hTocEls.each(function (index) {
        var t, text, isHidden, idText, tId, linkText, linkHref, liCode;
        t = $(this);
        text = t.text();

        if (text && text.length) {

            text = text.toLowerCase();
            var idregex = /[\W_]+/g;

            if (idregex.test(text)) {
                text = text.replace(idregex, '-');
                var lastCharIndex = text.length - 1;
                if (text.charAt(lastCharIndex) === '-') {
                    text = text.slice(0, lastCharIndex);

                }
            }
            tId = text;


            // var prependStyle = 'content:" "; display: block; height:' + topTarget + 'px; margin:-' + topTarget + 'px 0 0;';
            // var prependDiv = '<div id="'+tId+'" style="' + prependStyle + '"></div>';
            // t.html(prependDiv + t.html());

            t.attr('id', tId);







            var tagName = t.prop('tagName').toLowerCase();
            liCode =
                '<li id="' + tId + '-link" class="toc-li">' +
                '<a href="#' + tId + '" class="toc-link is-' + tagName + '">' +
                '<span class="toc-link-text">' + t.text() + '</span>' +
                '</a>' +
                '</li>';
            tocList.append(liCode);
        }
        if (index + 1 >= tocLength) {
            toc.show();
            if (window.location.hash === tId) {
                scrollToHash();
            }

        }
    });
}


var topTarget = 60;
var navHeights = 0;
function scrollToHash() {


    var target = $(window.location.hash);
    console.log($('body').hasClass('show'));
    if (!$('body').hasClass('show') && !$('body').hasClass('authorized') && target) {
        return setTimeout(function () {
            return scrollToHash();

        }, 150);
    }



    console.log('trying'); $('html, body').animate({
        scrollTop: target.offset().top - topTarget
    }, 500);




}

function hashCheck() {

    $('.main-section.tabs-list-section.w-tab-menu').attr('id', 'secondary-navbar');

    var navHeights = $('#primary-navbar').height() + ($('#secondary-navbar').height() * 1.5);
    topTarget = navHeights + (navHeights / 2);
    $('a[href^="#"]::before').each(function () {
        var targetId = $(this).attr('href');
        if ($('#' + targetId)) {
            $('#' + targetId + ':before').attr('style', 'content:""; display:block; height:' + topTarget + 'px; margin:-' + topTarget + 'px 0 0; ');
        }
    });

    scrollToHash();

}
