/**
 * 注册各种乱七八糟的东西
 * */

// koa相关模块
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const xtpl = require('xtpl/lib/koa2');

require('../skc');

// utils
const getPathname = require('../utils/getPathname');
// loader
const mountApiRouter = require('../loader/router');
const serviceLoader = require('../loader/service');
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
     * body-parser
     * */
    app.use(bodyParser());

    /**
     * 静态资源
     * */
    app.use(koaStatic(getPathname('/public')));

    /**
     * 注册中间件
     * */


    /**
     * 挂载路由
     * */
    const router = await mountApiRouter();
    app.use(router.routes());
    app.use(router.allowedMethods());
    console.log('router挂载完毕');

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
};
