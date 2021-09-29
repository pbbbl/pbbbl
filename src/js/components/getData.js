window.addEventListener('authorized', function(event) {
    const user = event.detail.auth.user;
    $(function() {
        // Sets user image

        if (auth && auth.user && auth.user.image) {
            $('[data-set-user-image-bg]').css('background-image', `url(${auth.user.image})`);
        } else {

            window.addEventListener('authorized', function(data) {
                $('[data-set-user-image-bg]').css('background-image', `url(${auth.user.image}`);
            });
        }


        // Sets First Name
        var showIfFirst = $('.show-if-first');
        var setHtmlFirst = $('.set-html-first,[data-set-user-first="true"]');

        if (auth && auth.user && auth.user.first) {
            var userFirstName = auth.user.first;
            setHtmlFirst.html(userFirstName);
        } else {
            showIfFirst.remove();
        }
    })
})
$(function() {
    if (auth.isTest) {
        $('[data-get-href-portal]').attr('href', 'https://test.skillstruck.com');
        $('[data-get-href-logout]').attr('href', 'https://test.skillstruck.com/logout');
    } else {
        $('[data-get-href-portal]').attr('href', 'https://my.skillstruck.com');
        $('[data-get-href-logout]').attr('href', 'https://my.skillstruck.com/logout');
    }


});