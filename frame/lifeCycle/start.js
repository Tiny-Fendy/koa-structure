/**
 * 启动应用程序
 * */

const Koa = require('koa');
const beforeStartUp = require('./beforeStartUp');
const startTime = Date.now();
const app = new Koa();

exports.start = async function () {
    const config = await beforeStartUp(app);

    app.listen(config.port);
    console.log(`app is starting at port ${config.port}.`);
    console.log(`it took ${(Date.now() - startTime) / 1000}s to start.`);

    return { app, config };
};

exports.getApp = () => app;
