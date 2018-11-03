const Router = require('koa-router')
const orderController = require('../controller/order-controller')

const router = new Router()

const routers = router
  .post('/create', orderController.createOrder)
  .post('/update', orderController.updateOrder)
  .post('/receive', orderController.receiveOrder)
  .post('/delete', orderController.deleteOrder)
  .post('/query', orderController.queryOrder)
  .post('/queryCurrentOrders', orderController.findCurrentOrders)
  .post('/readAllUnreadOrder', orderController.readAllUnreadOrder)

module.exports = routers