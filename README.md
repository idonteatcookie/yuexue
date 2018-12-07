# 约学 - 可以寻找一起自习的小伙伴的Web APP

一个基于 Vue & Node 的移动端全栈小项目

## [在线演示（请使用移动端查看效果）](http://yuexue.tk:3001)

## 技术栈
```
前端：Vue2 vue-router Webpack axios sass MintUI Iconfont

后端：NodeJS(v8.11.1) Koa2 Sqlite node-cache log4js
```

## 启动项目

我将前后端项目到同一个github repo了

```bash
# 克隆项目
git clone https://github.com/G-lory/yuexue.git

# 启动后端项目
# 到后端项目
cd yuexue-server
# 安装依赖
# 可以通过 npm install --registry=https://registry.npm.taobao.org 重新指定 registry 来解决 npm 安装速度慢的问题
npm install
# 修改 yuexue/yuexue-server/config.js 中 emailAuth 配置你自己的邮箱地址和授权码 （否则不能实现发送邮件功能
# 运行后端项目 打开浏览器访问 http://localhost:3001 （可通过 test@qq.com/123456 直接登录
npm run start

# 启动前端项目
# 到前端目录
cd yuexue-frontend
# 安装依赖
npm install
# 热加载启动 打开浏览器访问 http://localhost:8080 （保证后端项目已启动
npm run dev
# 生产环境压缩打包
npm run build
```

## 实现功能
- [x] 邮箱注册
- [x] 邮箱密码登录
- [x] 查看个人信息
- [x] 修改个人信息
- [x] 上传头像
- [x] 退出登录
- [x] 密码找回
- [x] 首页信息展示
- [x] 未读消息提示
- [x] 发布邀约
- [x] 删除已发布邀约
- [x] 查看邀约
- [x] 根据城市信息和关键字搜索邀约
- [x] 接受邀约
- [x] 密码加密存储
- [x] 打印日志且保存到文件

## 未实现 & bug
- [ ] 邀约列表页在某些浏览器中 列表不能完全加载
- [ ] 后端代码未加单元测试

## 项目结构
### [前端](https://github.com/G-lory/yuexue/blob/master/yuexue-frontend/README.md)
### [后端](https://github.com/G-lory/yuexue/blob/master/yuexue-server/README.md)
