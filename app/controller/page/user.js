/**
 * 登陆相关
 * */

const { Controller } = global.Skc;

class IndexController extends Controller {
    async index(ctx, next) {
        const title = await ctx.service.db.connect('加点东西吧');


        ctx.body = await ctx.render('home', {
            title
        });

        await next();
    }
}

module.exports = IndexController;
