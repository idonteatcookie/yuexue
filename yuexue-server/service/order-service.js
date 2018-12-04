const orderModel = require('../model/order-model-sqlite')
const userModel = require('../model/user-model-sqlite')
const { orderStatus } = require('../utils/constants')
const CustomError = require('../utils/CustomError')
const log4js = require('../utils/logger')
const logger = log4js.getLogger('order-service')

/**
 * 新建订单
 * @param order
 * @returns {Promise.<*>}
 */
async function createOrder(order) {
    logger.info('创建订单: ', JSON.stringify(order))
    let user = await userModel.queryUserById(order.creatorId)
    if (!user) {
        throw new CustomError('用户不存在')
    }
    order.creatorName = user.username
    order.createTime = order.updateTime = new Date().format('yyyy-MM-dd hh:mm:ss')
    order.status = orderStatus.PUBLISHED_UNRECEIVED
    return orderModel.createOrder(order)
}

/**
 * 更新订单
 * @param order
 * @returns {Promise.<boolean>}
 */
async function updateOrder(order) {
    logger.info('更新订单: ', JSON.stringify(order))
    let oldOrder = await orderModel.queryOrderById(order.id)
    if (!oldOrder) {
        throw new CustomError('订单不存在')
    }
    oldOrder.updateTime = new Date().format('yyyy-MM-dd hh:mm:ss')
    if (order.startTime) oldOrder.startTime = order.startTime
    if (order.endTime) oldOrder.endTime = order.endTime
    if (order.location) oldOrder.location = order.location
    if (order.remark) oldOrder.remark = order.remark
    return orderModel.updateOrderById(oldOrder)
}

/**
 * 接单啦
 * @param order
 * @returns {Promise.<boolean>}
 */
async function receiveOrder(order) {
    logger.info('接收订单: ', JSON.stringify(order))
    let oldOrder = await orderModel.queryOrderById(order.id)
    if (!oldOrder) {
        throw new CustomError('订单不存在')
    }
    if (oldOrder.creatorId === order.receiverId) {
        throw new CustomError('不能接受自己的邀约')
    }
    if (oldOrder.status == orderStatus.RECEIVED_UNREAD ||
        oldOrder.status == orderStatus.RECEIVED_READ) {
        throw new CustomError('订单已被其他人抢到啦')
    }
    if (oldOrder.status == orderStatus.PUBLISHED_REMOVED) {
        throw new CustomError('订单已被删除')
    }
    let receiver = await userModel.queryUserById(order.receiverId)
    if (!receiver) {
        throw new CustomError('接单人不存在')
    }
    oldOrder.receiverId = receiver.id
    oldOrder.receiverName = receiver.username
    oldOrder.receiveTime = new Date().format('yyyy-MM-dd hh:mm:ss')
    oldOrder.status = orderStatus.RECEIVED_UNREAD
    return orderModel.updateOrderById(oldOrder)
}

/**
 * 删除订单
 * @param id
 * @returns {Promise.<boolean>}
 */
async function deleteOrder(userId, orderId) {
    logger.info(`删除订单: userId=${userId}, orderId=${orderId}`)
    let order = await orderModel.queryOrderById(orderId)
    if (!order) {
        throw new CustomError('订单不存在')
    }
    // 只能删除自己创建的订单
    if (order.creatorId !== userId) {
        throw new CustomError('删除订单不合法')
    }
    return orderModel.deleteOrderById(orderId)
}

/**
 * 根据查询条件查询订单
 * @param options
 * @returns {Promise.<*>}
 */
function findOrderByOptions(options) {
    logger.info('查询订单: ', JSON.stringify(options))
    return orderModel.findOrderByOptions(options)
}

async function findCurrentOrders(search, city, start, size) {
    logger.info(`查询订单: search=${search}, city=${city}, start=${start}, size=${size}`)
    let options = {
        status: orderStatus.PUBLISHED_UNRECEIVED,
        city
    }
    return orderModel.findOrderByOptions(options, search, start, size)
}

async function readAllUnreadOrder(userId) {
    logger.info(`所有未读标记为已读: userId=${userId}`)
    let user = await userModel.queryUserById(userId)
    if (!user) {
        throw new CustomError('用户不存在')
    }
    return orderModel.readAllUnreadOrder(userId)
}

module.exports = {
    createOrder,
    updateOrder,
    receiveOrder,
    deleteOrder,
    findOrderByOptions,
    findCurrentOrders,
    readAllUnreadOrder
}