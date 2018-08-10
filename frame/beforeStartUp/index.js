/**
 * 注册各种乱七八糟的东西
 * */

// koa相关模块
const koaStatic = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const xtpl = require('xtpl/lib/koa2');

// utils
const getPathname = require('../utils/getPathname');

const mountApiRouter = require('./router');

module.exports = async app => {
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

    /**
     * 注册service
     * */

    /**
     * 加载模板引擎-xtpl
     * */
    xtpl(app, {
        views: getPathname('/view')
    });
};
