let nodeMailer = require('nodemailer')
let { emailAuth } = require('../config')

module.exports = function sendEmail(to, pin) {

    // Use Smtp Protocol to send Email
    let transporter = nodeMailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',          // 标注为QQ，不能为其他
        port: 465,              // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: emailAuth         // user: 邮箱地址, pass: 授权码
    })

    // setup e-mail data with unicode symbols
    let mailOptions = {
        to,             // 接收者
        from: `约学 <${emailAuth.user}>`,
        subject: '约学',  // 标题
        // text 和 html 两者只支持一种  正文
        text: `验证码：${pin}（请确保是本人操作，否则请忽略）。\n\n——约学\n\n（这是一封自动产生的email，请勿回复。）`
    }

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                reject(error)
            }
            transporter.close()
            resolve(info)
        })
    })

}