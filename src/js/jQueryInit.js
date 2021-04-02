var authorizedRanJquery = false;
window.addEventListener('authorized', function(event) {
    let authDetail = event.detail.auth;
    authorizedRanJquery = true;
    $(function() {
        runAwaitJquery(authDetail)
    });
});

$(function(){
    jq$();

});