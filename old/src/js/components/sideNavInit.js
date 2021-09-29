function sideNavInit() {
    const navEl = $("#campus-side-nav");
    if (!navEl) {
        return
    }
    const rootEl = $("html");
    const bodyEl = $("body");
    const buttonEl = $("#campus-side-nav-toggle-button");
    const closeButton = $("#campus-side-nav-close-button");
    const toggleSidenav = function() {
        const isOpen = $("body").hasClass("side-nav-open");
        navEl.attr("tabindex", `${isOpen ? -1 : 0}`);
        const buttonAriaLabel = isOpen ?
            "Close Side Navigation" :
            "Open Side Navigation";
        buttonEl.attr("aria-label", buttonAriaLabel);
        if (!isOpen) {
            bodyEl.addClass("side-nav-show");
            rootEl.addClass("side-nav-show");
            navEl.attr("tabindex", 0);
            setTimeout(function() {
                bodyEl.addClass("side-nav-open");
                rootEl.addClass("side-nav-open");
                closeButton.attr("tabindex", 0);
                navEl.focus();
            }, 50);
        } else {
            bodyEl.removeClass("side-nav-open");
            rootEl.removeClass("side-nav-open");
            closeButton.attr("tabindex", -1);
            navEl.attr("tabindex", -1);
            setTimeout(function() {
                bodyEl.removeClass("side-nav-show");
                rootEl.removeClass("side-nav-show");
                buttonEl.focus();
            }, 250);
        }
    };
    $(".side-nav-inner a").click(toggleSidenav);
    closeButton.click(toggleSidenav);
    buttonEl.click(toggleSidenav);
}
sideNavInit();