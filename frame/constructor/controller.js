/**
 * 定义Controller类，controller均需要继承此类
 * 定义class的Symbol接口，使得实例化对象可以被for of遍历;
 * */

module.exports = class Controller {
    constructor() {
        let keys = Object.getOwnPropertyNames(this.constructor.prototype);

        this.keys = keys.filter(key => !['constructor', 'next'].includes(key));
        this.$$mapMethodsIndex = 0;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        const { keys } = this;

        if (this.$$mapMethodsIndex === keys.length) {
            return {done: true, value: undefined};
        } else {
            const i = this.$$mapMethodsIndex;
            const name = keys[i];
            this.$$mapMethodsIndex++;
            return {
                done: false,
                value: [name, this[name]]
            }
        }
    }
};
