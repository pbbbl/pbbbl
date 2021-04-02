const fs = require('fs');
const files = [];
const dist = './dist/';

fs.readdirSync(dist).forEach(name => {
    processFile(name);
});

function processFile(name) {
    const file = `${ dist }${ name }`;
    if (name.indexOf('map') > -1) {
        return deleteFile(file);
    }
    let data = fs.readFileSync(file, 'utf-8');
    const edited = editFile(data, name);
    return fs.writeFileSync(file, edited, 'utf-8');
}

function editFile(data, name) {
    if (name.indexOf('.js') > -1) {

        data = data.replace(/\"use strict\"\;/g, '');

        data = `"use strict";${ data }`;
        data = data.replace(/\/\/\# sourceMappingURL\=.*/g, '');
    } else if (name.indexOf('.css') > -1) {
        data = data.replace(/\/\*\# sourceMappingURL.*/g, '');
    }
    return data;
}

function deleteFile(file) {
    return fs.unlinkSync(file);
}