const userModel = require('../model/user-model')
const orderModel = require('../model/order-model')
const { gender, orderStatus } = require('../utils/constants')
const sendEmail = require('../utils/email-util')
const { md5, getRandomString } = require('../utils')
const CustomError = require('../utils/CustomError')

/**
 * 新建用户
 * @param user
 * @returns {Promise.<*>}
 */
async function createUser(user) {
    // 用户名不能重复
    let result = await userModel.queryUserByName(user.username)
    if (result && result.length > 0) {
        throw new CustomError('用户名重复')
    }
    let _user = {
        username: user.username,
        email: user.email,
        password: md5(user.password),
        gender: gender.UNKNOWN,
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
    let sameNameUser = await userModel.queryUserByName(user.username)
    if (sameNameUser && sameNameUser.length > 1) {
        throw new CustomError('用户名重复')
    }
    let _user = {
        id: user.id,
        username: user.username,
        password: oldUser.password,
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
async function getUser(username, password) {
    let result = await userModel.queryUserByNameAndPwd(username, md5(password))
    return result && result[0]
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
 * 重置密码 并给用户发送邮件
 * @param username
 * @returns {Promise.<T>}
 */
async function resetUserPwd(username) {
    let user = await userModel.queryUserByName(username)
    if (!user && !user.length) {
        throw new CustomError('用户不存在')
    }
    user = user[0]
    if (!user.email) {
        throw new CustomError('用户邮箱为空')
    }
    // 保存到数据库和发邮件是两件事 要保持一致性...i dont know how to do it...qaq
    let pwd = getRandomString()
    let t = {...user, password: md5(pwd)}
    console.log(JSON.stringify(t))
    await userModel.updateUserById({...user, password: md5(pwd)})
    return sendEmail(user.email, pwd)
        .then(res => {
            return true
        })
        .catch(async e => {
            await userModel.updateUserById(user)
            return false
        })
}

module.exports = {
    createUser,
    getUser,
    queryUserById,
    modifyUser,
    getUserInfo,
    resetUserPwd
}