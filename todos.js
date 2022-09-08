const fs = require('fs');

const readToDos = function (path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

const writeToDos = function (path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
}


module.exports = {
    readToDos,
    writeToDos
}