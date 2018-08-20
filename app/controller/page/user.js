/**
 * 登陆相关
 * */

const { Controller } = global.Skc;

class IndexController extends Controller {
    async index(ctx) {
        const title = await await ctx.service.db.connect('加点东西吧');

        ctx.body = await ctx.render('home', {
            title
        });
    }
}

module.exports = IndexController;
