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

// 对fs.readdir的Promise化的封装
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

// 遍历指定目录下的文件或文件夹，执行回调
async function mapDir (url, callback) {
    const dirList = await readDir(url);

    for (let i = 0;i < dirList.length;i++) {
        let filename = dirList[i];

        if (filename.includes('.js')) {
            const content = require(`${url}/${filename}`);

            filename = filename.replace('.js', '');
            callback(`${url}/${filename}`, filename, content);
        } else {
            await mapDir(`${url}/${filename}`, callback);
        }
    }
}

// 自动挂载api
async function mountApiRouter() {
    const router = new Router();
    const api = new Router();
    const page = new Router();

    // 挂载页面controller
    await mapDir(PageCtrlPath, (pathname, filename, content) => {
        pathname = pathname.replace(PageCtrlPath, '');
        for (const [key, func] of Object.entries(content)) {
            page.get(`${pathname}/${key}`, func);
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

    router.use('/', page.routes(), page.allowedMethods());
    router.use('/api', api.routes(), api.allowedMethods());

    return router;
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
    const router = await mountApiRouter();
    app.use(router.routes());
    app.use(router.allowedMethods());
};
