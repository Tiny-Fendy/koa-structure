/**
 * 遍历自动挂载service
 * */

const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');
const ServicePath = getPathname('/service');

module.exports = (app, config) => {
    return async function (ctx) {
        const service = {};
        const start = Date.now();

        await mapDir(ServicePath, (Service, pathname, filename) => {
            pathname = pathname.replace(ServicePath, '');
            pathname.split('/').reduce((prev, name, index) => {
                if (index === 1) {
                    if (name === filename) {
                        service[name.replace('.js', '')] = new Service(app, ctx, config);
                    } else {
                        service[name] = service[name] || {};
                        return service[name];
                    }
                } else {
                    if (name === filename) {
                        prev[name.replace('.js', '')] = new Service(app, ctx, config);
                    } else {
                        prev[name] = prev[name] || {};
                        return prev[name];
                    }
                }
            });
        });

        console.log(`本次遍历service消耗时间：${(Date.now() - start) / 1000}s`);

        return service;
    };
};
