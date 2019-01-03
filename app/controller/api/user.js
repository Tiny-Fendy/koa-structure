/**
 * 用户登录登出
 * */

const { Controller } = require('../../../main');

class IndexController extends Controller {
    async login() {
        const { ctx } = this;
        const { request } = ctx;

        ctx.body = {
            success: true,
            message: '登录成功',
            data: request.body
        };
    }

    async logout() {
        const { ctx } = this;

        ctx.body = {
            success: true,
            message: '退出成功'
        };
    }

    async getInfo() {
        const { ctx } = this;

        ctx.body = {
            success: true,
            message: '',
            data: {
                list: []
            }
        };
    }
}

IndexController.methods = {
    login: 'post',
    logout: 'post',
    getInfo: 'get'
};

module.exports = IndexController;
