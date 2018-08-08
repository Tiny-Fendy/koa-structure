/**
 * 程序执行入口
 * */

const Koa = require('koa');
const app = new Koa();
const config = require('./config/config.default');
const beforeStartUp = require('./frame/beforeStartUp');

beforeStartUp(app).then(() => {
    app.listen(config.port, () => {
        console.log(`app is starting at port ${config.port}`);
    });
});
