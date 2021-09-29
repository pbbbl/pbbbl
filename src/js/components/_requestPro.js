var proRequestWaitDays = 7;


function checkRequested() {
    $('.campus-pro-form form').prepend(`
<textarea hidden="true" class="d-none" name="message">
There is no message for this one-click-form. 

User will not be shown this form again for ${proRequestWaitDays} days.
    
If you have questions, concerns, or want to change that ${proRequestWaitDays} day duration, contact Tyler.
</textarea>
`);
    var storedUserKey = 'u' + auth.uid;
    var requests = window.localStorage.getItem('campusProRequested') ? JSON.parse(window.localStorage.getItem('campusProRequested')) : {};
    var newDate = new Date();
    var nowTs = newDate.getTime();
    if (requests && requests[storedUserKey]) {
        var lastRequest = requests[storedUserKey];
        if (lastRequest.expires > nowTs) {
            $('.campus-pro-form').remove();
            // // console.log('show "Got request stuff, hide forms"');
            $('[data-pro-requested-show]').show();
            $('[data-pro-requested-remove]').remove();
        } else {
            // // console.log('hide "Got request stuff, show forms"');
            $('[data-pro-requested-show]').hide();

        }
    } else {
        // // console.log('hide "Got request stuff, show forms"');
        $('[data-pro-requested-show]').hide();
    }
    $('.campus-pro-form form').submit(function() {
        // // console.log('show "Got request stuff, hide forms"');
        $('.campus-pro-form').hide();
        $('[data-pro-requested-remove]').hide();
        $('[data-pro-requested-show]').show();
        var expires = new Date();
        expires.setDate(expires.getDate() + proRequestWaitDays);
        expires = expires.getTime();
        var prevRequested = window.localStorage.getItem('campusProRequested') ? JSON.parse(window.localStorage.getItem('campusProRequested')) : {};
        prevRequested[storedUserKey] = {
            uid: auth.uid,
            expires: expires
        }
        window.localStorage.setItem('campusProRequested', JSON.stringify(prevRequested));
    });
}

$(function() {

    checkRequested();
});