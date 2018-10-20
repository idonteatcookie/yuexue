<template>
  <div class="new-order">
    <header>
      <span>用户登录</span>
      <i class="iconfont icon-shouye" @click="back"></i>
    </header>
    <div class="user-form">
      <p class="input"><input type="text" placeholder="用户名" v-model="username"></p>
      <p v-if="this.type === 'register'" class="input"><input type="text" placeholder="邮箱" v-model="email"></p>
      <p class="input"><input type="password" placeholder="密码（不少于6位）" v-model="password"></p>
      <p v-if="this.type === 'register'" class="input password">
        <input type="password" placeholder="再次输入密码" v-model="pwdRepeat">
      </p>
      <p v-if="password && pwdRepeat && password !== pwdRepeat" class="input-error">两次输入密码不一致</p>
      <button v-if="this.type === 'login'" @click="login">登 录</button>
      <button v-else @click="register">注 册</button>
    </div>
    <div class="tips">
      <span v-if="this.type === 'login'"  @click="forgetPwd">忘记密码？</span>
      <span @click="changeType">
        {{ this.type === 'login' ? '创建账户' : '已有账户' }}
      </span>
    </div>
    <Dialog class="reset-password-dialog" v-show="dlgVis">
      <div class="text">你的账号为 <span class="userId">{{username}}</span>，点击确定新密码将会发送至你的邮箱，确定重置密码吗？</div>
      <template slot="footer">
        <div class="btn-group">
          <button class="ok" @click="resetPassword">确定</button>
          <button class="cancel" @click="() => { this.dlgVis = false }">取消</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { login, register, resetUserPwd } from 'api/user'
import Toast from 'components/toast'
import Dialog from '@/components/dialog.vue'
export default {
  data() {
    return {
      type: 'login',
      username: 'xiaoyi',
      password: '123456',
      email: 'xie_ym@qq.com',
      pwdRepeat: '',
      dlgVis: false
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
      let { username, email, password, pwdRepeat } = this.$data
      if (username && email && password && password.length >= 6 && pwdRepeat === password) {
        let param = { username, email, password }
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
    },
    resetPassword() {
      this.$root.$data.setLoading(true)
      resetUserPwd(this.username).then(res => {
        this.$root.$data.setLoading(false)
        if (res.success) {
          Toast(res.msg)
          this.dlgVis = false
        } else {
          Toast(res.msg)
        }
      }).catch(err => {
        this.$root.$data.setLoading(false)
        console.log('登录页面>重置密码-resetPassword()出错：', err)
      })
    },
    forgetPwd() {
      if (!this.username) {
        Toast('请输入用户名')
      } else {
        this.dlgVis = true
      }
    }
  },
  components: {
    Dialog
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
    .reset-password-dialog {
      line-height: 1.5;
      .userId {
        color: #2308ff;
      }
      button {
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
