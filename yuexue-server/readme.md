```
用户   
  - id
  - 昵称
  - 密码
  - 年龄
  - 性别
  - 电话 |
  - 微信 | —— 这三个必填其中之一
  - QQ  |
  - 学校
  - 备注
  
订单
  创建时间
  发布人id
  发布人姓名
  更新时间
  状态（未发布、发布未被接单、发布被接单、发布被删除）
  接单人id
  接单人姓名
  接单时间
  
  开始时间
  结束时间
  地点
  备注
  
```

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
  university    VARCHAR(255) NOT NULL
  COMMENT '地点之学校...'
);
```
```sql
-- 用户表
CREATE TABLE user_info
(
  id         INT AUTO_INCREMENT
    PRIMARY KEY,
  username   VARCHAR(20)  NOT NULL
  COMMENT '用户名',
  password   VARCHAR(50)  NOT NULL
  COMMENT '密码',
  age        INT          NULL
  COMMENT '年龄',
  gender     VARCHAR(20)  NULL
  COMMENT '性别(male/female/unknown)',
  tel        VARCHAR(11)  NULL
  COMMENT '手机号',
  wechat     VARCHAR(50)  NULL
  COMMENT '微信号',
  qq         VARCHAR(20)  NULL
  COMMENT 'QQ号',
  university VARCHAR(50)  NULL
  COMMENT '学校名',
  remark     VARCHAR(255) NULL
  COMMENT '备注',
  CONSTRAINT user_info_username_uindex
  UNIQUE (username)
)
  COMMENT '用户信息表';


```


