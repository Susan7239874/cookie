// LocalStorage项目键与依赖它的Vue实例列表之间的映射
import Vue from 'vue';//vue-cli项目的vue文件导入此文件

const storeItemSubscribers = {};

// 当前正在初始化的Vue实例
let target = undefined;

const getItem = window.localStorage.getItem;
localStorage.getItem = (key) => {
    // 收集依赖的Vue实例
    if (!storeItemSubscribers[key]) storeItemSubscribers[key] = [];
    if (target) storeItemSubscribers[key].push(target);
    // 调用原始函数
    let item = getItem.call(localStorage, key);
    // 先将拿到的试着进行json转为对象的形式
    try {
        item = JSON.parse(item);
    } catch (error) {
        // eslint-disable-next-line no-self-assign
        item = item;
    }
    return item;
};

const setItem = window.localStorage.setItem;
localStorage.setItem = (key, value) => {
    // 更新相关Vue实例中的值
    if (storeItemSubscribers[key]) {
        storeItemSubscribers[key].forEach((dep) => {
            if (dep.hasOwnProperty(key)) dep[key] = value;
        });
    }
    // 调用原始函数
    if (Object.prototype.toString.call(value) == '[object Object]') {
        value = JSON.stringify(value);
    }
    if (Object.prototype.toString.call(value) == '[object Array]') {
        value = JSON.stringify(value);
    }
    setItem.call(localStorage, key, value);
};

Vue.mixin({
    beforeCreate() {
        target = this;
    },
    created() {
        target = undefined;
    }
});
