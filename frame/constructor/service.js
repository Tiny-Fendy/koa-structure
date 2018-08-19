/**
 * Service基类
 * */

const MapConstructor = require('./mapConstructor');

class Service extends MapConstructor {
    constructor(app, ctx, config) {
        super();
        this.app = app;
        this.ctx = ctx;
        this.config = config;
    }
}

module.exports = Service;
