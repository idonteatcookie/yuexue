const config = require('../config').database

const mysql = require('mysql')

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
})

function query(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}


/******  一些通用的数据库操作函数  ******/

/**
 * 新建一条数据
 * @param {String} table 数据库表名
 * @param {Object} values 要插入的数据 键值对形式
 */
function insertData(table, values) {
    let sql = 'INSERT INTO ?? SET ?'
    return query(sql, [table, values])
}

function findDataById(table, id) {
    let sql = 'SELECT * FROM ?? WHERE id = ?'
    return query(sql, [table, id])
}

function updateDataById(table, values, id) {
    let sql = 'UPDATE ?? SET ? WHERE id = ?'
    return query(sql, [table, values, id])
}

function deleteDataById(table, id) {
    let sql = 'DELETE FROM ?? WHERE id = ?'
    return query(sql, [table, id])
}

function findDataByOptions(table, options, sorts) {
    let queryStr = ''
    for (let key in options) {
        queryStr += `${key} = '${options[key]}' AND `
    }
    if (queryStr) {
        queryStr = ' WHERE ' + queryStr.slice(0, -5)
    }
    let sql = 'SELECT * FROM ??' + queryStr
    if (sorts) {
        let sortStr = Object.keys(sorts).map(key => `${key} ${sorts[key]}`).join(',')
        sql += ' ORDER BY ' + sortStr
    }
    return query(sql, [table])
}

module.exports = {
    query,
    insertData,
    findDataById,
    updateDataById,
    deleteDataById,
    findDataByOptions
}

