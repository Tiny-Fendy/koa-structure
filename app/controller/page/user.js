/**
 * 登陆相关
 * */

const { Controller } = global.Skc;

class IndexController extends Controller {
    async index(ctx) {
        ctx.body = await ctx.render('home', {
            title: '这里来试试'
        });
    }
}

module.exports = IndexController;
