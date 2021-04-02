function userDropdown() {
    var toggle = $('#user-dropdown-toggle');
    var nav = $('#user-dropdown');
    var changedDom = false;
    var position = {
        right: $(window).width() - toggle[0].getBoundingClientRect().right + $(window)['scrollLeft'](),
    }
    var navCSS = {
        "top": "60px",
        "right": position.right + 'px',
        "left": 'auto',
        "bottom": 'auto',
        "z-index": 10000,
        "max-width": "280px",
        "min-width": "280px",
        "width": "280px",
        "position": "fixed"
    };


    nav.css(navCSS);
    // $('body').append(nav);


    toggle.click(function() {
        // console.log('clicked')
        if (!changedDom) {
            changedDom = true;
            $('body').append(nav);
            nav = $('#user-dropdown');
        }
    });

}
userDropdown();

window.addEventListener('resize', function() {
    userDropdown();
});