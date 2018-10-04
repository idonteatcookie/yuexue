module.exports = async function (ctx, next) {
    let method = ctx.request.method
    let url = ctx.request.url
    console.log(`\x1b[34m${new Date().toLocaleString()}\x1b[0m    --> \x1b[1m${method}\x1b[0m ${url}`)
    if (method === 'POST') {
        console.log(JSON.stringify(ctx.request.body))
    }
    if (method === 'GET') {
        console.log(JSON.stringify(ctx.query))
    }
    await next()
    console.log(`\x1b[34m${new Date().toLocaleString()}\x1b[0m    <-- \x1b[1m${method}\x1b[0m ${url}`)
    console.log(JSON.stringify({ success: ctx.body && ctx.body.success, msg: ctx.body && ctx.body.msg }))
}