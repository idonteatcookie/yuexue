const config = {
    port: 3001, // 服务启动端口

    database: {
        DATABASE: 'yuexue',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    },

    keys: ['date study >_<'],

    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: false, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        // rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    },

    emailAuth: {
        user: '邮箱，例如 mdzz@163.com',
        pass: '授权码，例如 qwertyhbsdjk' // 这里密码不是邮箱密码，是 smtp 密码（授权码）
    }

}

module.exports = config