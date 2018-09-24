<template>
  <div class="new-order">
    <header>
      <span>用户登录</span>
      <i class="iconfont icon-shouye" @click="back"></i>
    </header>
    <div class="user-form">
      <p class="input"><input type="text" placeholder="用户名" v-model="username"></p>
      <p class="input"><input type="password" placeholder="密码（不少于6位）" v-model="password"></p>
      <p v-if="this.type === 'register'" class="input password">
        <input type="password" placeholder="再次输入密码" v-model="pwdRepeat">
      </p>
      <p v-if="password && pwdRepeat && password !== pwdRepeat" class="input-error">两次输入密码不一致</p>
      <button v-if="this.type === 'login'" @click="login">登 录</button>
      <button v-else @click="register">注 册</button>
    </div>
    <div class="tips">
      <span @click="changeType">
        {{ this.type === 'login' ? '创建账户' : '已有账户' }}
      </span>
    </div>
  </div>
</template>

<script>
import { login, register } from 'api/user'
import Toast from 'components/toast'
export default {
  data() {
    return {
      type: 'login',
      username: 'xiaoyi',
      password: '123456',
      pwdRepeat: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    changeType() {
      this.type = this.type === 'login' ? 'register' : 'login'
    },
    login() {
      let { username, password } = this.$data
      if (username && password && password.length >= 6) {
        let param = { username, password }
        login(param).then(res => {
          if (res.success) {
            this.$router.push('/homepage')
          } else {
            Toast(res.msg)
          }
        }).catch(err => {
          console.log('登录页面>发送请求-login()出错：', err)
        })
      }
    },
    register() {
      let { username, password, pwdRepeat } = this.$data
      if (username && password && password.length >= 6 && pwdRepeat === password) {
        let param = { username, password }
        register(param).then(res => {
          if (res.success) {
            Toast(res.msg)
            this.$router.push('/homepage')
          } else {
            Toast(res.msg)
          }
        }).catch(err => {
          console.log('登录页面>发送请求-register()出错：', err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .new-order {
    margin-bottom: 0px;
    background-color: #fff;
    z-index: 100;
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    header {
      height: 50px;
      padding: 0 20px;
      background-color: $backColor;
      color: #000;
      line-height: 50px;
      font-size: 16px;
      font-weight: 900;text-align: center;
    }
    .user-form {
      text-align: center;
      margin-top: 50px;
      .input {
        margin: 15px auto;
        min-width: 150px;
        width: 70%;
        height: 30px;
        input {
          width: 100%;
          height: 100%;
          background: #00000000;
          border: none;
          border-bottom: 1px #e4e4e4 solid;
          font-size: 15px;
          &:focus {
            outline: none;
            border-bottom: 2px $themeColor solid;
          }
        }
      }
      .input-error {
        font-size: 12px;
        color: #ff0000;
        text-align: left;
        text-indent: 15%;
      }
      button {
        color: #fff;
        width: 70%;
        background-color: #000;
        height: 30px;
        border: none;
        margin: 15px 0;
        &:focus {
          outline: none;
        }
        &:active {
          background-color: #313131;
        }
      }
    }
    .tips {
      width: 70%;
      text-align: right;
      font-size: 12px;
      color: #888;
      margin: 0 auto;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
