/**
 * 登陆相关
 * */

const { Controller } = require('../../../main');

class IndexController extends Controller {
    async index(ctx, next) {
        const title = await ctx.service.db.connect('加点东西吧');

        ctx.body = await ctx.render('home', {
            title,
            csrf: ctx.csrf
        });

        await next();
    }
}

module.exports = IndexController;
