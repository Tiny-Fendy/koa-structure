/**
 * 注册各种乱七八糟的东西
 * */

const startTime = Date.now();

// koa相关模块
const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const xtpl = require('xtpl/lib/koa2');
const session = require('koa-session');

// utils
const getPathname = require('../utils/getPathname');
// loader
const routerLoader = require('../loader/router');
const serviceLoader = require('../loader/service');
const middlewareLoader = require('../loader/middleware');
// config
const defaultConfig = require('../config/config.default');
let config = require(getPathname('root', 'config/config.default.js'));

async function beforeStartUp (app) {
    /**
     * 获取配置数据
     * */
    config = Object.assign({}, defaultConfig, config);
    console.log('config信息获取完毕');

    /**
     * session
     * */
    app.keys = config.keys;
    app.use(session(config.session || {}, app));

    /**
     * body-parser
     * */
    app.use(bodyParser());

    /**
     * 安全处理
     * CSRF
     * 暂时先放这里
     * */


    /**
     * 静态资源
     * */
    app.use(koaStatic(getPathname('/public')));

    /**
     * 注册中间件
     * */
    await middlewareLoader(app, config);

    /**
     * 注册service
     * */
    const getService = serviceLoader(app, config);
    app.use(async (ctx, next) => {
        ctx.service = await getService(ctx);
        await next();
    });
    console.log('service挂载完毕');

    /**
     * 加载模板引擎-xtpl
     * */
    xtpl(app, {
        views: getPathname('/view')
    });

    /**
     * 挂载路由
     * */
    const router = await routerLoader();
    app.use(router.routes());
    app.use(router.allowedMethods());
    console.log('router挂载完毕');

    return config;
}

module.exports = async function () {
    const app = new Koa();
    const config = await beforeStartUp(app);
    await app.listen(config.port);
    console.log(`app is starting at port ${config.port}.`);
    console.log(`it took ${(Date.now() - startTime) / 1000}s to start.`);

    return { app, config }
};
