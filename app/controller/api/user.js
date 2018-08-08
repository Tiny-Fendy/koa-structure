/**
 * 用户登录登出
 * */

exports.methods = {
    login: 'post',
    logout: 'post'
};

exports.login = async (ctx) => {
    const { request } = ctx;

    ctx.body = {
        success: true,
        message: '登录成功',
        data: request.body
    }
};

exports.logout = async () => {
    this.ctx.body = {
        success: true,
        message: '退出成功'
    }
};
