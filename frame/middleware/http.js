/**
 * 提供发送请求的方法
 * */

const axios = require('axios');

module.exports = (options = {}) => {
    return async (ctx, next) => {
        axios.host = options.hostname;
        ctx.$http = axios.create(options);
        await next();
    };
};
