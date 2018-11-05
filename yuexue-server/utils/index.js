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

module.exports = {
    camel2_,
    _2Camel,
    _2Camel4Arr,
    md5,
    getRandomString
}