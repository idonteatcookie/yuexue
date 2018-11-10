let { changeKey2$Key } = require('../utils/index')
let { run, get } = require('../database/sqlite')

/**
 * 新建用户
 * @param user
 * @returns {Promise<Object>}
 */
function createUser(user) {
    let sql = `INSERT INTO user_info (username, password, email, age, gender, tel, wechat, qq, city, remark) `
      + ` VALUES ($username, $password, $email, $age, $gender, $tel, $wechat, $qq, $city, $remark)`
    return run(sql, changeKey2$Key(user))
}

/**
 * 更新用户信息
 * @param user
 * @returns {*}
 */
function updateUserById(user) {
    let sql = `UPDATE user_info SET username = $username, password = $password, email = $email, `
        + ` age = $age, gender = $gender, tel = $tel, wechat = $wechat, qq = $qq, city = $city, `
        + ` remark = $remark WHERE id = $id`
    return run(sql, changeKey2$Key(user))
}

/**
 * 根据 id 查询用户
 * @param userId
 * @returns {Promise<Object>}
 */
function queryUserById(userId) {
    let sql = `SELECT * FROM user_info WHERE id = ${userId}`
    return get(sql)
}

/**
 * 根据邮箱查询用户 查询不到时返回 Promise<undefined>
 * @param email
 * @returns {Promise<Object>}
 */
function queryUserByEmail(email) {
    let sql = `SELECT * FROM user_info WHERE email = "${email}"`
    return get(sql)
}

/**
 * 根据邮箱和密码查询用户
 * @param email
 * @param password
 * @returns {*}
 */
function queryUserByEmailAndPwd(email, password) {
    let sql = `SELECT * FROM user_info WHERE email = "${email}" AND password = "${password}"`
    return get(sql)
}

module.exports = {
    createUser,
    updateUserById,
    queryUserById,
    queryUserByEmail,
    queryUserByEmailAndPwd
}
