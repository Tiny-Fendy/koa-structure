/**
 * 提供对mongodb的支持
 * */

const { MongoClient } = require('mongodb');

module.exports = async (options = {}) => {
    const db = await MongoClient.connect(`mongodb://${options.hostname}:${options.port}`, { useNewUrlParser: true });

    return async (ctx, next) => {
        ctx.db = db;
        await next();
    }
};
