/**
 * 加载config
 * */

const extend = require('extend2');
const ENV = process.env.NODE_ENV || 'development';
const readDir = require('../utils/readDir');
const getPathname = require('../utils/getPathname');
const defaultConfig = require('../config/config.default');
const appDefaultConfig = require(getPathname('/config/config.default'));

module.exports = async () => {
    const config = {};
    const dirList = await readDir(getPathname('/config'));
    const has = dirList.find(filename => {
        const [conf, env, js] = filename.split('.');
        return conf === 'config' && env === ENV && js === 'js';
    });

    if (has) {
        const envConfig = require(getPathname(`/config/config.${ENV}.js`));
        extend(true, config, defaultConfig, appDefaultConfig, envConfig);
    } else {
        extend(true, config, defaultConfig, appDefaultConfig);
    }

    return config;
};
