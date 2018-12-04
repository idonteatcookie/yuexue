const crypto = require('crypto');

// ---- 驼峰式与下划线命名的转换 ----
function camel2_(obj) {
    const result = {}
    for (let key in obj) {
        let newKey = key.replace(/[A-Z]/g, c => '_' + c.toLowerCase())
        result[newKey] = obj[key]
    }
    return result
}

function _2Camel(obj) {
    const result = {}
    for (let key in obj) {
        let newKey = key.replace(/_([a-z])/g, (m, g) => g.toUpperCase())
        result[newKey] = obj[key]
    }
    return result
}

function _2Camel4Arr(arr) {
    return arr.map(item => _2Camel(item))
}

/**
 * md5 加密数据
 * @param str
 * @returns {*}
 */
function md5(str) {
    let md5 = crypto.createHash('md5')
    md5.update(str); // update数据
    return md5.digest('hex') // 十六进制输出
}

/**
 * 获取一个随机密码 [0-9a-z]{n}
 */
function getRandomString(n) {
    return Math.random().toString(36).substr(2, n)
}

/**
 * 把一个对象的key都改成$key {k: 'v'} -> {$k: 'v'}
 */
function changeKey2$Key(obj) {
    let _obj = {}
    for (let key of Object.keys(obj)) {
        _obj['$' + key] = obj[key]
    }
    return _obj
}

/**
 * 在 Date 原型链上添加时间格式化方法
 * @param fmt
 * @returns {*}
 */
/* eslint-disable */
Date.prototype.format = function(fmt) {
    var o = {
        'M+' : this.getMonth()+1,                 // 月份
        'd+' : this.getDate(),                    // 日
        'h+' : this.getHours(),                   // 小时
        'm+' : this.getMinutes(),                 // 分
        's+' : this.getSeconds(),                 // 秒
        'q+' : Math.floor((this.getMonth()+3)/3), // 季度
        'S'  : this.getMilliseconds()             // 毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp('('+ k +')').test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
        }
    }
    return fmt
}

module.exports = {
    camel2_,
    _2Camel,
    _2Camel4Arr,
    md5,
    getRandomString,
    changeKey2$Key
}