const fs = require('fs');
const files = [];
const dist = './dist/';

fs.readdirSync(dist).forEach(name => {
    processFile(name);
});
// let secondtry = false;
function processFile(name) {
    console.log(name);
    let file = `${ dist }${ name }`;

    if (name.indexOf('map') > -1) {
        return deleteFile(file);
    }
    let data;
    try {

        data = fs.readFileSync(file, 'utf-8');
    } catch (err){
        return;
    }
    const edited = editFile(data, name);
    return fs.writeFileSync(file, edited, 'utf-8');
}

function editFile(data, name) {
    try {
        
        if (name.indexOf('.js') > -1) {
    
            data = data.replace(/\"use strict\"\;/g, '');
            data = `"use strict";${ data }`;
            data = data.replace(/\/\/\# sourceMappingURL\=.*/g, '');
        } else if (name.indexOf('.css') > -1) {
            data = data.replace(/\/\*\# sourceMappingURL.*/g, '');
        }
    return data;

    } catch (err){
        return data;
    }
}

function deleteFile(file) {
    console.log(file);
    return fs.unlinkSync(file);
}