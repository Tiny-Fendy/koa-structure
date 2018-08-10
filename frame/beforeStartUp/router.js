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
    await mapDir(PageCtrlPath, (pathname, filename, content) => {
        const type = typeof content;
        pathname = pathname.replace(PageCtrlPath, '');

        if (type === 'function') {
            page.get(pathname, content);
        } else if (type === 'object') {
            for (const [key, func] of Object.entries(content)) {
                page.get(`${pathname}/${key}`, func);
            }
        }
    });
    // 挂载接口api
    await mapDir(ApiCtrlPath, (pathname, filename, content) => {
        pathname = pathname.replace(ApiCtrlPath, '');
        if (content.methods) {
            for (const [key, method] of Object.entries(content.methods)) {
                api[method](`${pathname}/${key}`, content[key]);
            }
        } else {
            console.log(`[error]:文件${filename}缺少methods对象`)
        }
    });

    router.use('', page.routes(), page.allowedMethods());
    router.use('/api', api.routes(), api.allowedMethods());

    return router;
};
