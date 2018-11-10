const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'yx.sqlite3')
// ※ 划重点！！这里要用绝对路径！否则会在调用的那个文件下面创建数据库文件！
const db = new sqlite3.Database(dbPath)
const log4js = require('../utils/logger')
const logger = log4js.getLogger('sqlite')

/**
 * 适合于增删改时调用
 * @param sql
 * @param param
 * @returns {Promise}
 */
function run(sql, param) {
    logger.debug(sql + (param ? ', ' + JSON.stringify(param) : ''))
    return new Promise(function(resolve, reject) {
        db.run(sql, param, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

/**
 * 返回一条符合条件的数据
 * @param sql
 * @param param
 * @returns {Promise}
 */
function get(sql, param) {
    logger.debug(sql + (param ? ', ' + JSON.stringify(param) : ''))
    return new Promise(function (resolve, reject) {
        db.get(sql, param, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 返回所有符合条件的数据
 * @param sql
 * @param param
 * @returns {Promise<Array>}
 */
function all(sql, param) {
    logger.debug(sql + (param ? ', ' + JSON.stringify(param) : ''))
    return new Promise(function (resolve, reject) {
        db.all(sql, param, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = {
    run, get, all
}