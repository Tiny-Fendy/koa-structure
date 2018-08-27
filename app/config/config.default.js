/**
 * 应用默认配置
 * */

module.exports = {
    keys: ['csrfToken'],
    port: 6001,
    middleware: ['userInfo'],
    request: {
        baseURL: 'http://localhost:6001'
    }
};
