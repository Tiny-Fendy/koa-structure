/**
 * 登陆相关
 * */

const { Controller } = require('../../../main');

class IndexController extends Controller {
    async index() {
        const { ctx } = this;
        const title = await ctx.service.db.connect('加点东西吧');

        ctx.body = await ctx.render('home', {
            title
        });
        throw 123;
    }
}

module.exports = IndexController;
