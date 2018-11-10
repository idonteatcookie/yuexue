const userModel = require('../model/user-model-sqlite')
const orderModel = require('../model/order-model-sqlite')
const { gender, orderStatus } = require('../utils/constants')
const sendEmail = require('../utils/email-util')
const { md5, getRandomString } = require('../utils')
const CustomError = require('../utils/CustomError')
const { getCacheItem, setCacheItem } = require('../utils/cache')

/**
 * 新建用户
 * @param user
 * @returns {Promise.<*>}
 */
async function createUser(email, password, pin) {
    // 邮箱不能重复
    let result = await userModel.queryUserByEmail(email)
    if (result) {
        throw new CustomError('该邮箱已被注册')
    }
    if (getCacheItem(email) !== pin) {
        throw new CustomError('验证码错误')
    }
    let _user = {
        username: email.substr(0, email.indexOf('@')), // 截取邮箱的前缀做用户名 (反正可以改是吧..
        email: email,
        password: md5(password),                    // 密码 md5 加密
        gender: gender.UNKNOWN,                     // 性别设为未知
        age: 0
    }
    return userModel.createUser(_user)
}

/**
 * 修改用户信息
 * @param user
 * @returns {Promise.<*>}
 */
async function modifyUser(user) {
    let oldUser = await userModel.queryUserById(user.id)
    if (!oldUser) {
        throw new CustomError('用户不存在')
    }

    let password = oldUser.password
    if (user.password && user.newPassword) {
        if (md5(user.password) !== password) {
            throw new CustomError('密码错误')
        }
        password = md5(user.newPassword)
    }
    let _user = {
        id: user.id,
        username: user.username,
        password,
        age: user.age,
        gender: user.gender || gender.UNKNOWN,
        email: user.email,
        tel: user.tel,
        wechat: user.wechat,
        qq: user.qq,
        city: user.city,
        remark: user.remark,
    }

    return userModel.updateUserById(_user)
}


/**
 * 通过用户名和密码获取用户
 * @param username
 * @param password
 * @returns {Promise.<boolean>}
 */
async function getUser(email, password) {
    let result = await userModel.queryUserByEmailAndPwd(email, md5(password))
    return result
}

/**
 * 根据 id 获取用户全部信息
 * @param userId
 * @returns {Promise.<*>}
 */
async function queryUserById(userId) {
    let result = await userModel.queryUserById(userId)
    if (result) delete result.password // 不返回密码信息
    return result
}

/**
 * 获取用户名/用户参数邀约次数/是否有联系方式
 * @param userId
 * @returns {Promise.<TResult>}
 */
function getUserInfo(userId) {
    let p1 = orderModel.findOrderByOptions({ creatorId: userId, status: orderStatus.RECEIVED_UNREAD })
    let p4 = orderModel.findOrderByOptions({ creatorId: userId, status: orderStatus.RECEIVED_READ })
    let p2 = orderModel.findOrderByOptions({ receiverId: userId })
    let p3 = userModel.queryUserById(userId)
    return Promise.all([p1, p2, p3, p4]).then(res => {
        let user = res[2]
        let ordersTotal = res[0].length + res[1].length + res[3].length
        let username = user.username
        return {
            ordersTotal,
            username,
            hasContactInfo: Boolean(user.tel || user.wechat || user.qq)
        }
    })
}

/**
 * 重置密码
 * @param username
 * @returns {Promise.<T>}
 */
async function resetUserPwd(email, password, pin) {
    let user = await userModel.queryUserByEmail(email)
    if (!user) {
        throw new CustomError('用户不存在')
    }
    if (getCacheItem(email) !== pin) {
        throw new CustomError('验证码错误')
    }
    userModel.updateUserById({...user, password: md5(password)})
}

/**
 * 发送验证码到指定邮箱
 * @param email
 * @returns {Promise.<Promise.<T>|*>}
 */
async function sendPinCode(email, isReset) {
    if (isReset) {
        let user = await userModel.queryUserByEmail(email)
        if (!user) {
            throw new CustomError('该邮箱未被注册')
        }
    }
    let pin = getRandomString(4)
    setCacheItem(email, pin)
    return sendEmail(email, pin)
}

module.exports = {
    createUser,
    getUser,
    queryUserById,
    modifyUser,
    getUserInfo,
    resetUserPwd,
    sendPinCode
}