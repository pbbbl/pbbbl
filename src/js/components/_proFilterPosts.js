function proSetup() {
    proPost = proPost || false;
    var isPro = $('[data-is-pro]');
    var noPro = $('[data-no-pro]');
    var fbPro = $('[data-fallback]');
    if (!proPost) {
        isPro.remove();
        fbPro.remove();

    } else {
        noPro.remove();
        if (auth.user.premium) {
            fbPro.remove();
        } else {
            isPro.remove();
        }
    }

}
window.addEventListener('authorized', function (e) {
    const user = e.detail.auth.user;
    $(function () {
        proSetup();
    });
});