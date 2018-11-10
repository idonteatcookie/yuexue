// 初始化数据库 sql 语句
module.exports.user_info_ddl =
  `CREATE TABLE IF NOT EXISTS user_info
    (
      id         INTEGER PRIMARY KEY autoincrement,
      username   VARCHAR(20)  NOT NULL,
      password   VARCHAR(50)  NOT NULL,
      email      VARCHAR(50)  NULL,
      age        INT          NULL,
      gender     VARCHAR(20)  NULL,
      tel        VARCHAR(11)  NULL,
      wechat     VARCHAR(50)  NULL,
      qq         VARCHAR(20)  NULL,
      city       VARCHAR(50)  NULL,
      remark     VARCHAR(255) NULL,
      UNIQUE (email)
    )`

module.exports.order_info_ddl =
  `CREATE TABLE IF NOT EXISTS order_info
    (
      id            INTEGER PRIMARY KEY autoincrement,
      create_time   DATETIME     NOT NULL,
      creator_name  VARCHAR(20)  NOT NULL,
      creator_id    INT          NOT NULL,
      update_time   DATETIME     NOT NULL,
      status        INT          NOT NULL,
      receiver_name VARCHAR(20)  NULL,
      receiver_id   INT          NULL,
      receive_time  DATETIME     NULL,
      start_time    DATETIME     NOT NULL,
      end_time      DATETIME     NOT NULL,
      location      VARCHAR(255) NOT NULL,
      remark        VARCHAR(255) NULL,
      title         VARCHAR(255) NOT NULL,
      city          VARCHAR(255) NOT NULL,
      foreign key (creator_id) references user_info(id),
      foreign key (receiver_id) references user_info(id)
    );`

module.exports.user_info_data = [
    ['小一最酷了', 'e10adc3949ba59abbe56e057f20f883e', 'xie_ym@qq.com', 17, 'male', '13344556677', 'nottellyou', '100000', '北京市,北京市', '等一个备注'],
    ['测试账号', 'e10adc3949ba59abbe56e057f20f883e', 'test@qq.com', 17, 'male', '13535353535', 'heiheihei', '12306', '北京市,北京市', '愿得一学霸？']
]
module.exports.order_info_data = [
]