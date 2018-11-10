const log4js = require('../utils/logger')
const logger = log4js.getLogger('middleware-logger')

module.exports = async function (ctx, next) {
    let method = ctx.request.method
    let url = ctx.request.url
    logger.info(`--> ${method} ${url}`, method === 'POST' ? JSON.stringify(ctx.request.body) : '')
    await next()
    logger.info(`<-- ${method} ${url}`)
}