module.exports = (options, app) => {
    return async (ctx, next) => {
        if (ctx.method === 'GET') {
            // ctx.body = ctx.csrf;
        }

        await next();
    }
};
