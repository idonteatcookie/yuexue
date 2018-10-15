const dbUtils = require('../utils/db-util')
const { camel2_, _2Camel, _2Camel4Arr } = require('../utils')

/**
 * 新建订单
 * @param order
 * @returns {Promise.<*>}
 */
function createOrder(order) {
    return dbUtils.insertData('order', camel2_(order))
}

/**
 * 根据 id 查找订单
 * @param id
 * @returns {Promise.<*>}
 */
async function queryOrderById(id) {
    let result = await dbUtils.findDataById('order', id)
    if (result && result[0]) return _2Camel(result[0])
    return null
}

/**
 * 更新订单
 * @param order
 * @returns {Promise.<*>}
 */
function updateOrder(order) {
    return dbUtils.updateDataById('order', camel2_(order), order.id)
}

/**
 * 根据 id 删除订单
 * @param id
 * @returns {Promise.<*>}
 */
function deleteOrderById(id) {
    return dbUtils.deleteDataById('order', id)
}

async function findOrderByOptions(options) {
    let sort = { createTime: 'DESC' }
    let result = await dbUtils.findDataByOptions('order', camel2_(options), camel2_(sort))
    return _2Camel4Arr(result)
}

async function findCurrentOrders(status, search, start, size) {
    let sql = ` SELECT * FROM \`order\` WHERE status = ${status} `
    if (search) {
        sql += ` AND (title LIKE "%${search}%" OR location LIKE "%${search}%" OR remark LIKE "%${search}%") `
    }
    sql += ` ORDER BY create_time DESC LIMIT ${start}, ${size} `
    let result = await dbUtils.query(sql)
    return _2Camel4Arr(result)
}


module.exports = {
    createOrder,
    queryOrderById,
    updateOrder,
    deleteOrderById,
    findOrderByOptions,
    findCurrentOrders
}