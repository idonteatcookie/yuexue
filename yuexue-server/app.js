const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const static = require('koa-static')

const routers = require('./router/index')
const config = require('./config')
const logger = require('./middleware/logger')
const getAvatar = require('./middleware/getAvatar')
const cors = require('./middleware/cors')
const staticPath = './static'

const app = new Koa()
// 加密cookie的字符串
app.keys = config.keys
// 配置前端文件
app.use(static(__dirname + '/' +  staticPath))
// session
app.use(session(config.session, app))
// 解决跨域问题
app.use(cors)
// post请求解析
app.use(koaBody({
    multipart: true
}))
// 控制台日志输出
app.use(logger)
// 获取静态文件
app.use(getAvatar)
// 路由
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port)
console.log('服务启动....')