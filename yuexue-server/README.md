# yuexue-server 约学后端项目

## 技术栈
## NodeJS(v8.11.1) Koa2 Sqlite node-cache log4js

## 项目结构
```c
├── avatar                     // 存储图片文件
├── controller                 // controller
├── database                   // 数据库文件 数据库操作、初始化文件
├── middleware                 // 自定义中间件
├── model                      // 操作数据
├── router                     // 路由
├── server                     // 服务层
├── static                     // 前端打包的文件
├── test                        // 测试文件
├── utils                       // 全局公用方法
├── .gitignore                  // git 忽略项
├── app.js                      // 项目入口 启动文件
├── config.js                   // 配置文件
├── package.json                // package.json
└── yuexue.log                  // 日志文件
```
## 数据库结构
开始选择使用 MySQL 后修改为 sqlite   
Mysql 相关操作文件都没有删除 这里给出 Mysql 数据库定义 。  
sqlite 定义可见 yuexue-server/database/init-sql.js

```sql
-- 订单表
CREATE TABLE `order`
(
  id            INT AUTO_INCREMENT
  COMMENT '唯一标识'
    PRIMARY KEY,
  create_time   DATETIME     NOT NULL
  COMMENT '创建时间',
  creator_name  VARCHAR(20)  NOT NULL
  COMMENT '创建人姓名',
  creator_id    INT          NOT NULL
  COMMENT '创建人id',
  update_time   DATETIME     NOT NULL
  COMMENT '更新时间',
  status        INT          NOT NULL
  COMMENT '未发布(1)|发布未被接单(2)|发布被接单(3)|发布被删除(4)',
  receiver_name VARCHAR(20)  NULL
  COMMENT '接单人姓名',
  receiver_id   INT          NULL
  COMMENT '接单人id',
  receive_time  DATETIME     NULL
  COMMENT '接单时间',
  start_time    DATETIME     NOT NULL
  COMMENT '约定开始时间',
  end_time      DATETIME     NOT NULL
  COMMENT '结束时间',
  location      VARCHAR(255) NOT NULL
  COMMENT '约定地点',
  remark        VARCHAR(255) NULL
  COMMENT '备注',
  title         VARCHAR(255) NOT NULL
  COMMENT '标题',
  city          VARCHAR(255) NOT NULL
  COMMENT '城市',
  CONSTRAINT order_ibfk_1
  FOREIGN KEY (creator_id) REFERENCES user_info (id),
  CONSTRAINT order_ibfk_2
  FOREIGN KEY (receiver_id) REFERENCES user_info (id)
)
  COMMENT '订单表';
CREATE INDEX creator_id
  ON `order` (creator_id);
CREATE INDEX receiver_id
  ON `order` (receiver_id);

-- 用户表
CREATE TABLE user_info
(
  id       INT AUTO_INCREMENT
    PRIMARY KEY,
  username VARCHAR(20)  NOT NULL
  COMMENT '用户名',
  password VARCHAR(50)  NOT NULL
  COMMENT '密码',
  email    VARCHAR(50)  NOT NULL
  COMMENT '邮箱',
  age      INT          NULL
  COMMENT '年龄',
  gender   VARCHAR(20)  NULL
  COMMENT '性别(male/female/unknown)',
  tel      VARCHAR(11)  NULL
  COMMENT '手机号',
  wechat   VARCHAR(50)  NULL
  COMMENT '微信号',
  qq       VARCHAR(20)  NULL
  COMMENT 'QQ号',
  city     VARCHAR(50)  NULL
  COMMENT '城市',
  remark   VARCHAR(255) NULL
  COMMENT '备注',
  CONSTRAINT user_info_email_uindex
  UNIQUE (email)
)
  COMMENT '用户信息表';

```


