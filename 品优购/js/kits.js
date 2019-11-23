let kits = {};

// 封装获取本地存储的数据，默认是返回数组
/**
 * 
 * @param {变量} key 用来存数据的
 */
kits.loadData = function (key) {
    let json = localStorage.getItem(key);
    return JSON.parse(json) || [];
}
// 封装数据存到本地
/**
 * 
 * @param {String} key 
 * @param {object || Array} data 
 */
kits.saveData = function (key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}