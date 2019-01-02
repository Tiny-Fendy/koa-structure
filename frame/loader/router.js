/**
 * 自动遍历controller下的文件，并挂载router
 * */

const Router = require('koa-router');
const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');
const CtrlPath = getPathname('/controller');

module.exports = async function () {
    const root = new Router();
    const router = new Router();

    // 挂载接口api
    await mapDir(CtrlPath, (Controller, pathname) => {
        const ctrl = new Controller();
        const { methods } = Controller;
        pathname = pathname.replace(CtrlPath, '');

        for (const [key, func] of ctrl) {
          const route = key === 'index' ? '' : `/${key}`;
          let method = 'get';

          if (methods) {
            method = methods[key] || 'get';
          }
          console.log(method);
          router[method](`${pathname}${route}`, func);
        }
    });

    root.use('', router.routes(), router.allowedMethods());

    return root;
};
