/**
 * 登陆相关
 * */

const Controller = require('../../../frame/skc').Controller;

class IndexController extends Controller {
    async index(ctx) {
        ctx.body = await ctx.render('home', {
            title: '这里来试试'
        });
    }
}

module.exports = IndexController;
