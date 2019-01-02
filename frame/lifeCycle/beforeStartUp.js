/**
 * 应用程序启动前的操作
 * */

// koa相关模块
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const xtpl = require('xtpl/lib/koa2');
const session = require('koa-session');
const cors = require('@koa/cors');

// 框架内部中间件
const httpMiddleware = require('./../middleware/http');
const mongodbMiddleware = require('./../middleware/mongodb');

// utils
const getPathname = require('../utils/getPathname');
// loader
const configLoader = require('../loader/config');
const routerLoader = require('../loader/router');
const serviceLoader = require('../loader/service');
const middlewareLoader = require('../loader/middleware');

module.exports = async function (app) {

    /**
     * 获取配置数据
     * */
    const config = await configLoader();
    Object.defineProperty(app, 'config', {
        writable: false,
        value: config
    });

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
    app.use(cors());

    /**
     * 注册应用中间件
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
     * 请求其他接口的方法
     * */
    app.use(httpMiddleware(config.request));

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

    /**
     * 开始连接数据库
     * */
    if (config.mongodb && config.mongodb.enable) {
        app.use(await mongodbMiddleware(config.mongodb));
    }

    return config;
};
