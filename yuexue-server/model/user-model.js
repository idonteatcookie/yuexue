const dbUtils = require('../utils/db-util')

/**
 * 新建用户
 * @param {Object} user 用户数据
 * @returns {Promise.<*>}
 */
async function createUser(user) {
    let result = await dbUtils.insertData('user_info', user)
    return result
}

/**
 * 根据 id 查询用户
 * @param name
 * @param pwd
 * @returns {Promise.<*>}
 */
async function queryUserById(userId) {
    let result = await dbUtils.findDataById('user_info', userId)
    return result && result[0]
}

/**
 * 根据 用户名 查询用户
 * @param name
 * @param pwd
 * @returns {Promise.<*>}
 */
function queryUserByName(name) {
    let sql = `SELECT * FROM user_info WHERE username = "${name}"`
    return dbUtils.query(sql)
}

/**
 * 根据 邮箱 查询用户 -> 邮箱是唯一的
 * @param email
 * @returns {*}
 */
async function queryUserByEmail(email) {
    let sql = `SELECT * FROM user_info WHERE email = "${email}"`
    let result = await dbUtils.query(sql)
    return result && result[0]
}

/**
 * 根据 用户名和密码 查询用户
 * @param username
 * @param password
 * @returns {Promise.<*>}
 */
function queryUserByNameAndPwd(username, password) {
    let sql = `SELECT * FROM user_info WHERE 
                username = "${username}" AND password = "${password}"`
    return dbUtils.query(sql)
}

function queryUserByEmailAndPwd(email, password) {
    let sql = `SELECT * FROM user_info WHERE 
                email = "${email}" AND password = "${password}"`
    return dbUtils.query(sql)
}

function updateUserById(user) {
    return dbUtils.updateDataById('user_info', user, user.id)
}

module.exports = {
    createUser,
    queryUserById,
    queryUserByName,
    queryUserByEmail,
    queryUserByNameAndPwd,
    queryUserByEmailAndPwd,
    updateUserById
}