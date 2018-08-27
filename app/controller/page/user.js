/**
 * 登陆相关
 * */

const { Controller } = require('../../../main');

class IndexController extends Controller {
    async index(ctx, next) {
        const title = await ctx.service.db.connect('加点东西吧');
        const user = await ctx.$http.post('/api/user/login').then(res => res.data);

        console.log(user, 'user');

        ctx.body = await ctx.render('home', {
            title
        });

        await next();
    }
}

module.exports = IndexController;
