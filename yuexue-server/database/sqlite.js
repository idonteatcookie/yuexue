let sqlite3 = require('sqlite3').verbose()
let path = require('path')
let dbPath = path.resolve(__dirname, 'yx.sqlite3')
// ※ 划重点！！这里要用绝对路径！否则会在调用的那个文件下面创建数据库文件！
let db = new sqlite3.Database(dbPath)
const sqlLog = (str) => console.log(`\x1b[32m${str}\x1b[0m`)

/**
 * 适合于增删改时调用
 * @param sql
 * @param param
 * @returns {Promise}
 */
function run(sql, param) {
    sqlLog(sql + (param ? ', ' + JSON.stringify(param) : ''))
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
    sqlLog(sql + (param ? ', ' + JSON.stringify(param) : ''))
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
    sqlLog(sql + (param ? ', ' + JSON.stringify(param) : ''))
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