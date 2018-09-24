const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const session = require('koa-session')


const routers = require('./router/index')
const config = require('./config')
const logger = require('./middleware/logger')
const getAvatar = require('./middleware/getAvatar')

const app = new Koa()
// 加密cookie的字符串
app.keys = ['some secret hurr']
// session
app.use(session(config.session, app))
// 解决跨域问题
app.use(cors({
    credentials: true
}))
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

app.listen(3001)
console.log('服务启动....')