const Controller = require('./frame/constructor/mapConstructor');
const Service = require('./frame/constructor/service');
const { getApp, start } = require('./frame/lifeCycle/start');

module.exports = {
    Controller,
    Service,
    getApp,
    start,
};
