/**
 * 数据库连接
 * */

const { Service } = require('../../main');

class IndexService extends Service {
    async connect(data) {
        return `${data}加点东西`;
    }
}

module.exports = IndexService;
