/**
 * 程序执行入口
 * */

const Koa = require('koa');
const app = new Koa();
const config = require('./config/config.default');
const register = require('./frame/register');

async function beforeStartUp() {
    await register(app);

}

app.listen(config.port);
