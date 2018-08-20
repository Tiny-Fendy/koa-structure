/**
 * 挂载中间件
 * */

const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');

module.exports = async (app, config) => {
    const map = {};
    const { middlewareConfig = {}, middleware } = config;

    // 先将middleware目录下的中间件全部遍历出来，然后按照config中的顺序进行挂载
    await mapDir(getPathname('/middleware'), (middleware, pathname, filename) => {
        map[filename] = middleware;
    });

    (middleware || []).forEach(name => {
        if (map[name]) {
            app.use(map[name](app, middlewareConfig[name]));
        } else {
            console.error(`[中间件错误]：未查询到中间件-${name}，请检查`)
        }
    });
};
