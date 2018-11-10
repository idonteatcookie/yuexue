const orderService = require('../service/order-service')
const CustomError = require('../utils/CustomError')

const DATETIME_REG = /^(\d{4})(-|\/)(\d{2})\2(\d{2})$/
/**
 * 检查创建订单必须字段
 * @param order
 * @returns {string}
 * @private
 */
function _checkCreateOrder(session, order) {
    let errStr = ''
    if (!session || !session.userId) {
        errStr += '用户未登录;'
    }
    if (!order.title) {
        errStr += '[标题]为空;'
    }
    if (!order.city) {
        errStr += '[城市]为空;'
    }
    if (!order.startTime) {
        errStr += '[开始时间]为空;'
    } else if (!DATETIME_REG.test(order.startTime)) {
        errStr += '[开始时间]不合法;'
    }
    if (!order.endTime) {
        errStr += '[结束时间]为空;'
    } else if (!DATETIME_REG.test(order.endTime)) {
        errStr += '[结束时间]不合法;'
    }
    if (!order.location) {
        errStr += '[地点]为空'
    }
    return errStr
}

/**
 * 检查更新订单必须字段
 * @param order
 * @returns {string}
 * @private
 */
function _checkUpdateOrder(order) {
    let errStr = ''
    if (!order.id) {
        errStr += '[订单ID]为空;'
    }
    if (order.startTime && !DATETIME_REG.test(order.startTime)) {
        errStr += '[开始时间]不合法;'
    }
    if (order.endTime && !DATETIME_REG.test(order.endTime)) {
        errStr += '[结束时间]不合法;'
    }
    return errStr
}

/**
 * 检查接收订单必须字段
 * @param order
 * @returns {string}
 * @private
 */
function _checkReceiveOrder(session, order) {
    let errStr = ''
    if (!session || !session.userId) {
        errStr += '用户未登录;'
    }
    if (!order.id) {
        errStr += '[订单ID]为空;'
    }
    return errStr
}

/**
 * 创建订单
 * @param ctx
 * @returns {Promise.<void>}
 */
async function createOrder(ctx) {
    let data = ctx.request.body
    let err = _checkCreateOrder(ctx.session, data)
    if (err) {
        ctx.body = {
            success: false,
            msg: err
        }
        return
    }
    let order = {
        creatorId: ctx.session.userId,
        title: data.title,
        city: data.city,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        remark: data.remark
    }
    try {
        await orderService.createOrder(order)
        ctx.body = {
            success: true,
            msg: '创建邀约成功'
        }
    } catch (e) {
        if (e instanceof CustomError) {
            ctx.body = e.toReturnVo()
        } else {
            console.error('创建订单出错：', e)
            ctx.body = {
                success: false,
                msg: '创建邀约出现异常'
            }
        }
    }
}

async function updateOrder(ctx) {
    let data = ctx.request.body
    let err = _checkUpdateOrder(data)
    if (err) {
        ctx.body = {
            success: false,
            msg: err
        }
        return
    }
    let order = {
        id: data.id,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        remark: data.remark
    }
    try {
        await orderService.updateOrder(order)
        ctx.body = {
            success: true,
            msg: '更新邀约成功'
        }
    } catch (e) {
        if (e instanceof CustomError) {
            ctx.body = e.toReturnVo()
        } else {
            console.error('修改订单出错：', e)
            ctx.body = {
                success: false,
                msg: '修改邀约出现异常'
            }
        }
    }
}

async function receiveOrder(ctx) {
    let data = ctx.request.body
    let err = _checkReceiveOrder(ctx.session, data)
    if (err) {
        ctx.body = {
            success: false,
            msg: err
        }
        return
    }
    let order = {
        id: data.id,
        receiverId: ctx.session.userId
    }
    try {
        await orderService.receiveOrder(order)
        ctx.body = {
            success: true,
            msg: '接受邀约成功'
        }
    } catch (e) {
        if (e instanceof CustomError) {
            ctx.body = e.toReturnVo()
        } else {
            console.error('接收订单出错：', e)
            ctx.body = {
                success: false,
                msg: '接受邀约出现异常'
            }
        }
    }
}

async function deleteOrder(ctx) {
    let data = ctx.request.body
    if (!data.id) {
        ctx.body = {
            success: false,
            msg: '[订单id]为空;'
        }
        return
    }
    let session = ctx.session
    if (!session || !session.userId) {
        ctx.body = {
            success: false,
            msg: '用户未登录'
        }
        return
    }
    let userId = session.userId
    try {
        await orderService.deleteOrder(userId, data.id)
        ctx.body = {
            success: true,
            msg: '删除订单成功'
        }
    } catch (e) {
        if (e instanceof CustomError) {
            ctx.body = e.toReturnVo()
        } else {
            console.error('删除订单出错：', e)
            ctx.body = {
                success: false,
                msg: '删除邀约出现异常'
            }
        }
    }
}

async function queryOrder(ctx) {
    let options = ctx.request.body
    try {
        let result = await orderService.findOrderByOptions(options)
        ctx.body = {
            success: true,
            data: result
        }
    } catch (e) {
        console.error('查询订单失败: ', e)
        ctx.body = {
            success: false,
            msg: '获取邀约数据失败'
        }
    }
}

async function findCurrentOrders(ctx) {
    let { search, city, start, size } = ctx.request.body
    try {
        let result = await orderService.findCurrentOrders(search, city, start, size)
        ctx.body = {
            success: true,
            data: result
        }
    } catch (e) {
        console.error('查询订单失败: ', e)
        ctx.body = {
            success: false,
            msg: '获取邀约数据失败'
        }
    }
}

async function readAllUnreadOrder(ctx) {
    let session = ctx.session
    if (!session || !session.userId) {
        ctx.body = {
            success: false,
            msg: '用户未登录'
        }
        return
    }
    let userId = session.userId
    try {
        await orderService.readAllUnreadOrder(userId)
        ctx.body = {
            success: true
        }
    } catch (e) {
        console.error('全部已读失败: ', e)
        ctx.body = {
            success: false,
            msg: '全部已读失败'
        }
    }
}

module.exports = {
    createOrder,
    updateOrder,
    receiveOrder,
    deleteOrder,
    queryOrder,
    findCurrentOrders,
    readAllUnreadOrder
}