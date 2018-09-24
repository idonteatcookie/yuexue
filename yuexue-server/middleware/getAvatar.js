const send = require('koa-send')
var path = require("path")
const fs = require('fs')

module.exports = async function (ctx, next) {
    if (ctx.request.url.includes('/avatar')) {
        let url = ctx.request.url.split('?')[0]
        let filePath = path.join(__dirname, '..', url)
        try {
            fs.statSync(filePath)
            await send(ctx, url)
        } catch (e) {
            await send(ctx, '/avatar/default')
        }

    } else {
        await next()
    }
}