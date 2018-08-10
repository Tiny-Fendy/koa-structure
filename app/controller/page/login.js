module.exports = async (ctx) => {
    ctx.body = await ctx.render('home', {
        title: '这里来试试'
    });
};
