<template>
  <div id="app">
    <app-header class="main-header"></app-header>
    <router-view class="main-content"/>
    <app-footer class="main-footer"></app-footer>
    <Loading v-if="$root.$data.loading"></Loading>
  </div>
</template>

<script>
import AppHeader from 'components/app-header.vue'
import AppFooter from 'components/app-footer.vue'
import Loading from 'components/loading.vue'
import { getUser } from '@/api/user'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Loading
  },
  methods: {
    /**
     * 检查登录状态
     */
    checkLogin() {
      if (!this.getCookie('koa:sess')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
        return false
      } else {
        if (this.$route.path === '/login') {
          this.getLoginUser()
          this.$router.push('/homepage')
        }
        return true
      }
    },
    /**
     * 获取指定名称的cookie值
     * @param name
     * @returns {RegExpMatchArray | any | Array | {index: number, input: string} | string | *}
     */
    getCookie(name) {
      let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
      return arr && arr[2]
    },
    getLoginUser() {
      getUser().then(res => {
        if (res.success) {
          this.$root.$data.setUser(res.data.id)
        }
      })
    }
  },
  created() {
    this.checkLogin() && this.getLoginUser()
  },
  watch: {
    '$route': 'checkLogin'
  }
}
</script>

<style>
.main-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.main-content {
  margin-top: 50px;
  margin-bottom: 40px;
}
.main-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
