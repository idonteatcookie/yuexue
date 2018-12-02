<template>
  <div id="app">
    <keep-alive include="userInfo">
      <router-view></router-view>
    </keep-alive>
    <Loading v-if="$root.$data.loading"></Loading>
  </div>
</template>

<script>
import Loading from 'components/loading.vue'
import { getUser } from '@/api/user'

export default {
  name: 'App',
  components: {
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
          this.$root.$data.setUser(res.data)
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
</style>
