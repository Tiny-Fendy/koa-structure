
module.exports = (options) => {
    return async (ctx, next) => {

        await next();
    }
};
