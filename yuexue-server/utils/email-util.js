let nodeMailer = require('nodemailer')
let { emailAuth } = require('../config')

module.exports = function sendEmail(to, pwd) {

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
        subject: '找回密码',              // 标题
        // text 和 html 两者只支持一种  正文
        text: `你的新密码为：${pwd}（请确保是本人操作，否则请忽略）。\n\n——约学\n\n（这是一封自动产生的email，请勿回复。）`
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
// `
// { accepted: [ 'xie_ym@qq.com' ],
//   rejected: [],
//   envelopeTime: 204,
//   messageTime: 893,
//   messageSize: 506,
//   response: '250 Ok: queued as ',
//   envelope: { from: 'g_lory@qq.com', to: [ 'xie_ym@qq.com' ] },
//     messageId: '<fd946538-6aa2-ebbd-36b1-4503dd8dd546@qq.com>' }
// `

// sendEmail('xie_ym@qq.com', 'sdjhu236t7').then(res => {
//     console.log(re)
// })