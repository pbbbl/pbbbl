function on$(callback) {
    campus.addEventListener('jquery', function(event) {
        const data = event.detail.data;
        if (callback) {
            return callback(data, event);
        }
        return;
    })
}

function onAuth(callback) {
    campus.addEventListener('authorized', function(event) {
        const data = event.detail.data;
        if (callback) {
            return callback(data, event);
        }
        return;
    })
}

function onDb(callback) {
    campus.addEventListener('db', function(event) {
        const data = event.detail.data;
        if (callback) {
            return callback(data, event);
        }
        return;
    });
}

function onReady(callback) {
    campus.addEventListener('ready', function(event) {
        const data = event.detail.data;
        if (callback) {
            return callback(data, event);
        }
        return;
    });
}



function dispatchCampusEvent(name, data) {
    campus.dispatchEvent(
        new CustomEvent(name, {
            bubbles: true,
            detail: { data }
        })
    );
    checkIfReady(ready);
}

function checkIfReady() {
    const cr = {...app.ready };
    if (cr.jquery && cr.authorized && cr.db) {
        app.ready = true;
        return dispatchReady(...app);
    }
    return;
}

function dispatchReady(data) {
    return dispatchCampusEvent('ready', data);
}

function dispatchJquery(data) {
    return dispatchCampusEvent('$', data);
}

function dispatchAuthorized(data) {
    return dispatchCampusEvent('authorized', data);
}

function dispatchDb(data) {
    return dispatchCampusEvent('db', data);
}