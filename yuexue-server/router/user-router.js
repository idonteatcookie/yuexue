const Router = require('koa-router')
const userController = require('../controller/user-controller')

const router = new Router()

const routers = router
    .post('/register', userController.createUser)
    .post('/login', userController.login)
    .get('/logout', userController.logout)
    .get('/getUser', userController.getUser)
    .post('/modify', userController.modifyUserInfo)
    .get('/getUserInfo', userController.getUserInfo)
    .post('/modifyAvatar', userController.modifyAvatar)
    // .get('/getAvatar', userController.getAvatar)

module.exports = routers