let sqlite3 = require('sqlite3').verbose()
let { user_info_ddl, user_info_data, order_info_ddl, order_info_data } = require('./init-sql')

let db = new sqlite3.Database('yx.sqlite3')

db.serialize(function() {
    db.run(user_info_ddl)
    db.run(order_info_ddl)

    let user_stmt = db.prepare('INSERT INTO user_info (username, password, email, age, gender, tel, wechat, qq, city, remark) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    for (let row of user_info_data) {
        user_stmt.run(row)
    }
    user_stmt.finalize()

    let order_stmt = db.prepare('INSERT INTO order_info (create_time, creator_name, creator_id, update_time, status, receiver_name, receiver_id, receive_time, start_time, end_time, location, remark, title, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    for (let row of order_info_data) {
        order_stmt.run(row)
    }
    order_stmt.finalize()

    db.each("SELECT * FROM user_info", function(err, row) {
        console.log(row)
    })
    db.each("SELECT * FROM order_info", function(err, row) {
        console.log(row)
    })
})

db.close()
