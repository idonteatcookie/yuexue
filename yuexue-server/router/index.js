const Router = require('koa-router')
const user = require('./user-router')
const order = require('./order-router')

const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())
router.use('/order', order.routes(), order.allowedMethods())

// const redirect = ctx => {
//     ctx.response.redirect('/404');
// };
//
// const _404 = ctx => {
//     ctx.response.body = '<a href="/">404</a>';
// };

// router.get('/404', _404)
// router.get('/error', redirect)

module.exports = router

