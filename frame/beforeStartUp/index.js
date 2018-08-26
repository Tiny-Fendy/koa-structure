/**
 * 注册各种乱七八糟的东西
 * */

// koa相关模块
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const xtpl = require('xtpl/lib/koa2');
const session = require('koa-session');
const CSRF = require('koa-csrf');

require('../skc');

// utils
const getPathname = require('../utils/getPathname');
// loader
const routerLoader = require('../loader/router');
const serviceLoader = require('../loader/service');
const middlewareLoader = require('../loader/middleware');
// config
const defaultConfig = require('../config/config.default');
let config = require(getPathname('root', 'config/config.default.js'));

module.exports = async app => {
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
     * */
    if (!config.csrf || config.csrf.enable) {
        app.use(new CSRF());
    }

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
};
