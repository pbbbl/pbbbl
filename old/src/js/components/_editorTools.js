function editorToolsInit() {
    var testModeToggler = $('[data-toggle-editor-mode="test"]');
    var liveModeToggler = $('[data-toggle-editor-mode="live"]');
    var url = new URL(window.location.href);
    var isTest = window.location.origin.indexOf('test-campus.skillstruck.com') > -1;
    var isLive = url.searchParams.get('live') == 'true' && isTest;

    liveModeToggler.addClass('active-' + isLive);
    liveModeToggler.removeClass('active-' + !isLive);
    testModeToggler.addClass('active-' + isLive);
    testModeToggler.removeClass('active-' + !isLive);
    liveModeToggler.attr('href', window.location.href + '?live=true');
    testModeToggler.attr('href', window.location.href + '');
    if (!isTest) {
        return;
    }

    $('a').each(function() {
        if ($(this).attr('data-toggle-editor-mode')) {
            return;
        }
        var href = $(this).attr('href');
        var appendData = '?live=true';
        if (href) {

            if (href.indexOf("?") > -1 && !href.indexOf("live=true") > -1) {
                href = href + '&live=true';
            }
            $(this).attr('href', href);
        }
    });

}

editorToolsInit();