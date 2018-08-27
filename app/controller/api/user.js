/**
 * 用户登录登出
 * */

const { Controller } = require('../../../main');

class IndexController extends Controller {
    async login(ctx, next) {
        const { request } = ctx;

        ctx.body = {
            success: true,
            message: '登录成功',
            data: request.body
        };

        await next();
    }

    async logout(ctx, next) {
        ctx.body = {
            success: true,
            message: '退出成功'
        };

        await next();
    }

    async getInfo(ctx, next) {
        ctx.body = {
            success: true,
            message: '',
            data: {
                list: []
            }
        };

        await next();
    }
}

IndexController.methods = {
    login: 'post',
    logout: 'post',
    getInfo: 'get'
};

module.exports = IndexController;
