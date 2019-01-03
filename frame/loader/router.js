/**
 * 自动遍历controller下的文件，并挂载router
 * */

const Router = require('koa-router');
const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');
const CtrlPath = getPathname('/controller');

module.exports = async function (app, config) {
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
          router[method](`${pathname}${route}`, async (ctx, next) => {
            try {
              await func.bind({
                ctx,
                app,
                config,
                service: ctx.service
              })();
              await next();
            } catch (e) {
              console.error(`[router error]${pathname}${route}:${e}`);
            }
          });
        }
    });

    root.use('', router.routes(), router.allowedMethods());

    return root;
};
