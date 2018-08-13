/**
 * 遍历自动挂载service
 * */

const mapDir = require('../utils/mapDir');
const getPathname = require('../utils/getPathname');
const ServicePath = getPathname('/service');

module.export = async () => {
    await mapDir(ServicePath, (pathname, filename, content) => {

    });
};
