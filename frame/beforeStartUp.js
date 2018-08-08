/**
 * 注册各种乱七八糟的东西
 * */

const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');

// koa先关模块
const Router = require('koa-router');
const koaStatic = require('koa-static');

function pathname (name) {
    return path.join(__dirname, `../app${name}`);
}

function readDir(dirPath) {
    return new Promise((res, rej) => {
        fs.readdir(dirPath, (err, file) => {
            !err ? res(file) : rej(err);
        });
    }).then(file => file, err => {
        console.log(`[error-读取controller目录出错]:${err}`);
        return false;
    });
}

// 自动挂载api
async function mountApiRouter() {

}

const PageCtrlPath = pathname('/controller/page');
const ApiCtrlPath = pathname('/controller/api');

module.exports = async app => {
    /**
     * body-parser
     * */
    app.use(bodyParser());

    /**
     * 静态资源
     * */
    app.use(koaStatic(pathname('/public')));

    /**
     * 注册路由
     * */
    const router = new Router();
    const api = new Router();
    const page = new Router();
    const pageDir = await readDir(PageCtrlPath);
    const apiDir = await readDir(ApiCtrlPath);

    apiDir.forEach(dir => {
        if (dir.includes('.js')) {
            const apiList = require(`${ApiCtrlPath}/${dir}`);

            dir = dir.replace('.js', '');
            if (apiList.methods) {
                for (const [key, method] of Object.entries(apiList.methods)) {
                    api[method](`/${dir}/${key}`, apiList[key]);
                }
            } else {
                console.log(`[error]:文件${dir}缺少methods对象`)
            }
        } else {
            readDir(`${ApiCtrlPath}/${dir}`).then(file => {

            });
        }
    });
    console.log(1111);
    router.use('/', page.routes(), page.allowedMethods());
    router.use('/api', api.routes(), api.allowedMethods());
    app.use(router.routes());
    app.use(router.allowedMethods());
};
