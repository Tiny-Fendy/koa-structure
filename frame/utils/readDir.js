/**
 * 对fs.readdir的Promise化的封装
 * */
const fs = require('fs');

module.exports = function (dirPath) {
    return new Promise((res, rej) => {
        fs.readdir(dirPath, (err, file) => {
            !err ? res(file) : rej(err);
        });
    }).then(file => file, err => {
        console.log(`[error-读取controller目录出错]:${err}`);
        return false;
    });
};
