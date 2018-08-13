/**
 * 自动遍历controller/page && controller/api，并挂载router
 * */

const Router = require('koa-router');
const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');

const PageCtrlPath = getPathname('/controller/page');
const ApiCtrlPath = getPathname('/controller/api');

module.exports = async function () {
    const router = new Router();
    const api = new Router();
    const page = new Router();

    // 挂载页面controller
    await mapDir(PageCtrlPath, (pathname, filename, Controller) => {
        const ctrl = new Controller();
        pathname = pathname.replace(PageCtrlPath, '');

        for (const [key, func] of ctrl) {
            const route = key === 'index' ? '' : `/${key}`;

            page.get(`${pathname}${route}`, func);
        }
    });
    // 挂载接口api
    await mapDir(ApiCtrlPath, (pathname, filename, Controller) => {
        const ctrl = new Controller();
        const { methods } = Controller;
        pathname = pathname.replace(ApiCtrlPath, '');

        if (methods) {
            for (const [key, func] of ctrl) {
                const method = methods[key] || 'get';
                const route = key === 'index' ? '' : `/${key}`;
                
                api[method](`${pathname}${route}`, func);
            }
        } else {
            console.log(`[error]:文件${filename}缺少methods对象`)
        }
    });

    router.use('', page.routes(), page.allowedMethods());
    router.use('/api', api.routes(), api.allowedMethods());

    return router;
};
