/**
 * 数据库连接
 * */

const { Service } = global.Skc;

class IndexService extends Service {
    async connect(data) {
        return data;
    }
}

module.exports = IndexService;
