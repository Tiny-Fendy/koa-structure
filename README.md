# koa-structure
基于koa的web应用基础设施


临时想法记录
1. service主张一个文件就是一个单一的功能，使用module.export
2. controller page支持一个文件多个路由也支持一个文件一个路由，
api因为要提供methods对象，所以只能支持一对多
3. 模板使用xTemplate
