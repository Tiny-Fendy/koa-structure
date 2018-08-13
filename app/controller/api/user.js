/**
 * 用户登录登出
 * */

const Controller = require('../../../frame/skc').Controller;

class IndexController extends Controller {
    async login(ctx) {
        const { request } = ctx;

        ctx.body = {
            success: true,
            message: '登录成功',
            data: request.body
        }
    };

    async logout(ctx) {
        ctx.body = {
            success: true,
            message: '退出成功'
        }
    };
}

IndexController.methods = {
    login: 'post',
    logout: 'post'
};

module.exports = IndexController;
