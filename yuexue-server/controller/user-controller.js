const fs = require('fs')

const userService = require('../service/user-service')
const CustomError = require('../utils/CustomError')

const TEL_REG = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/

function _checkModifyUserInfo(user) {
    let { id, username, email, gender, tel } = user
    let errStr = ''
    if (!id) errStr += '[用户ID]为空;'
    if (!username) errStr += '[用户名]为空;'
    if (!email) errStr += '[邮箱]为空;'
    if (!gender) errStr += '[用户性别]为空;'
    if (tel && !TEL_REG.test(tel)) errStr += '[用户电话号码]不合法'
    return errStr
}

module.exports = {
    async getUser(ctx) {
        let userId = ctx.query.userId || ctx.session.userId
        if (!userId) {
            ctx.body = {
                success: false,
                msg: '[用户ID]为空'
            }
            return
        }
        let user = await userService.queryUserById(userId)
        if (user) {
            ctx.body = {
                success: true,
                data: user
            }
        } else {
            ctx.body = {
                success: false,
                msg: '用户不存在'
            }
        }
    },
    async createUser(ctx) {
        try {
            let data = ctx.request.body
            let { pin, email, password } = data
            let errStr = ''
            if (!email) errStr += '[邮箱]为空;'
            if (!password) errStr += '[密码]为空;'
            if (!pin) errStr += '[验证码]为空;'
            if (errStr) {
                ctx.body = {
                    success: false,
                    msg: errStr
                }
                return
            }
            let result = await userService.createUser(email, password, pin)
            let userId = result.insertId
            // session 中保存登录状态
            ctx.session.userId = userId
            ctx.body = {
                success: true,
                msg: '注册成功'
            }
        } catch (e) {
            if (e instanceof CustomError) {
                ctx.body = e.toReturnVo()
            } else {
                console.error('创建用户出错：', e)
                ctx.body = {
                    success: false,
                    msg: '注册失败'
                }
            }
        }
    },
    async modifyUserInfo(ctx) {
        let data = ctx.request.body
        let errStr = _checkModifyUserInfo(data)
        if (errStr) {
            ctx.body = {
                success: false,
                msg: errStr
            }
            return
        }
        try {
            let result = await userService.modifyUser(data)
            ctx.body = {
                success: true,
                msg: '修改用户信息成功'
            }
        } catch (e) {
            if (e instanceof CustomError) {
                ctx.body = e.toReturnVo()
            } else {
                console.error('修改用户信息出错：', e)
                ctx.body = {
                    success: false,
                    msg: '修改用户信息出现异常'
                }
            }
        }
    },
    async login(ctx) {
        let data = ctx.request.body
        let { email, password } = data
        let errStr = ''
        if (!email) errStr += '[邮箱]为空;'
        if (!password) errStr += '[密码]为空;'
        if (errStr) {
            ctx.body = {
                success: false,
                msg: errStr
            }
            return
        }
        let result = await userService.getUser(email, password)
        if (result) {
            // 在 session 中保存登录状态
            ctx.session.userId = result.id
            console.log(result.username + '登录...')
            ctx.body = {
                success: true,
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '邮箱或密码错误'
            }
        }
    },
    async logout(ctx) {
        if (ctx.session && ctx.session.userId) {
            let result = await userService.queryUserById(ctx.session.userId)
            console.log(result.username + '登出...')
            ctx.session = null
        }
        ctx.body = {
            success: true,
            msg: '退出登录'
        }
    },
    async getUserInfo(ctx) {
        if (!ctx.session || !ctx.session.userId) {
            ctx.body = {
                success: false,
                msg: '用户未登录'
            }
            return
        }
        let userId = ctx.request.body.userId || ctx.session.userId
        try {
            let data = await userService.getUserInfo(userId)
            ctx.body = {
                success: true,
                data
            }
        } catch (e) {
            console.log('获取用户信息出现异常：', e)
            ctx.body = {
                success: false,
                msg: '获取用户信息出现异常'
            }
        }
    },
    async modifyAvatar(ctx) {
        let userId = ctx.request.body && ctx.request.body.userId
        let file = ctx.request.files && ctx.request.files.avatarFile
        let errStr = ''
        if (!userId) errStr += '[用户ID]为空;'
        if (!file) errStr += '[头像文件]为空;'
        if (errStr) {
            ctx.body = {
                success: false,
                msg: errStr
            }
            return
        }
        try {
            const reader = fs.createReadStream(file.path) // 创建可读流
            // const ext = file.name.split('.').pop() // 获取上传文件扩展名
            const upStream = fs.createWriteStream(`avatar/avatar_${userId}`) // 创建可写流
            reader.pipe(upStream)
            ctx.body = {
                success: true,
                msg: '上传成功'
            }
        } catch (e) {
            console.log('上传头像失败：', e)
            ctx.body = {
                success: false,
                msg: '上传失败'
            }
        }
    },
    async resetUserPwd(ctx) {
        let { email, password, pin } = ctx.request.body
        let errStr = ''
        if (!email) errStr += '[邮箱]为空;'
        if (!password) errStr += '[密码]为空;'
        if (!pin) errStr += '[验证码]为空;'
        if (errStr) {
            ctx.body = {
                success: false,
                msg: errStr
            }
            return
        }
        try {
            let result = await userService.resetUserPwd(email, password, pin)
            ctx.body = {
                success: true,
                msg: `重置密码成功`
            }
        } catch (e) {
            if (e instanceof CustomError) {
                ctx.body = e.toReturnVo()
            } else {
                console.error('重置用户密码出错：', e)
                ctx.body = {
                    success: false,
                    msg: '重置用户密码失败'
                }
            }
        }
    },
    async sendPinCode(ctx) {
        let { email, isReset } = ctx.request.body
        if (!email) {
            ctx.body = {
                success: false,
                msg: '[邮箱]为空'
            }
            return
        }
        try {
            await userService.sendPinCode(email, isReset)
            ctx.body = {
                success: true,
                msg: `发送验证码成功`
            }
        } catch (e) {
            if (e instanceof CustomError) {
                ctx.body = e.toReturnVo()
            } else {
                console.error('发送验证码失败：', e)
                ctx.body = {
                    success: false,
                    msg: `发送验证码失败`
                }
            }
        }
    }
}
