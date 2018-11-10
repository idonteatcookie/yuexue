let { changeKey2$Key, camel2_, _2Camel, _2Camel4Arr } = require('../utils/index')
let { run, get, all } = require('../database/sqlite')
const { orderStatus } = require('../utils/constants')

function createOrder(order) {
    let sql = `INSERT INTO order_info (create_time, creator_name, creator_id, update_time, status, `
        + ` receiver_name, receiver_id, receive_time, start_time, end_time, location, remark, title, city) `
        + ` VALUES ($createTime, $creatorName, $creatorId, $updateTime, $status, $receiverName, $receiverId, `
        + ` $receiveTime, $startTime, $endTime, $location, $remark, $title, $city)`
    return run(sql, changeKey2$Key(order))
}

function updateOrderById(order) {
    let sql = `UPDATE order_info SET create_time = $createTime, creator_name = $creatorName, creator_id = $creatorId, `
        + ` update_time = $updateTime, status = $status, receiver_name = $receiverName, receiver_id = $receiverId, `
        + ` receive_time = $receiveTime, start_time = $startTime, end_time = $endTime, location = $location, `
        + ` remark = $remark, title = $title, city = $city WHERE id = $id`
    return run(sql, changeKey2$Key(order))
}

function deleteOrderById(id) {
    let sql = `DELETE FROM order_info WHERE id = ${id}`
    return run(sql)
}

async function queryOrderById(id) {
    let sql = `SELECT * FROM order_info WHERE id = ${id}`
    let result = await get(sql)
    return _2Camel(result)
}

/**
 * 根据给定条件查询订单 返回符合条件的订单数组
 * @param {Object}  options     指定查询的字段和值
 * @param {String}  search      搜索关键字
 * @param {String=} offset      查询开始位置
 * @param {String=} limit       查询条数
 * @return {Promise<Array>}
 */
async function findOrderByOptions(options, search, offset, limit) {
    let opt = camel2_(options)
    let sql = `SELECT * FROM order_info WHERE TRUE `
    for (let key in opt) {
        if (opt[key]) sql += ` AND ${key} = "${opt[key]}" `
    }
    if (search) {
        sql += ` AND (title LIKE "%${search}%" OR location LIKE "%${search}%" OR remark LIKE "%${search}%") `
    }
    sql += ` ORDER BY create_time DESC `
    if (offset && limit) {
        sql += ` LIMIT ${offset}, ${limit} `
    }
    let result = await all(sql)
    return _2Camel4Arr(result)
}

function readAllUnreadOrder(userId) {
    let sql = ` UPDATE order_info SET status = ${orderStatus.RECEIVED_READ} `
      + ` WHERE status = ${orderStatus.RECEIVED_UNREAD} AND creator_id = ${userId} `
    return run(sql)
}

module.exports = {
    createOrder,
    updateOrderById,
    deleteOrderById,
    queryOrderById,
    findOrderByOptions,
    readAllUnreadOrder
}