const path = require('path');

// 根目录的绝对路径
const root = path.dirname(require.main.filename);

module.exports = function (name) {
    return path.join(root, `/app${name}`);
};
