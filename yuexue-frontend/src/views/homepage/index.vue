<template>
  <div class="homepage">
    <app-header class="main-header"></app-header>
    <div class="text">
      <p>欢迎! {{ userInfo.username }}</p><br>
      <p>你已成功约学 <span class="count">{{ userInfo.ordersTotal }}</span> 次</p>
      <p>获得称号: <span class="title">{{ title }}</span></p>
    </div>
    <div class="opt">
      <button @click="newOrder">约<span class="right-arrow">▶</span></button>
    </div>
    <router-view></router-view>
    <app-footer class="main-footer"></app-footer>
  </div>
</template>

<script>
import { getUserInfo } from 'api/user'
import Toast from 'components/toast'
import AppHeader from 'components/app-header.vue'
import AppFooter from 'components/app-footer.vue'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    title() {
      if (this.userInfo.ordersTotal === 0) {
        return '新人'
      } else if (this.userInfo.ordersTotal < 10) {
        return '初学者'
      } else if (this.userInfo.ordersTotal < 30) {
        return '学霸'
      } else {
        return '学神'
      }
    }
  },
  components: {
    AppHeader,
    AppFooter,
  },
  methods: {
    newOrder() {
      if (!this.userInfo.hasContactInfo) {
        Toast('请先填写至少一种联系方式才可以发起邀约')
        return
      }
      this.$router.push('/homepage/new-order')
    }
  },
  created() {
    getUserInfo().then(res => {
      if (res.success) {
        this.userInfo = res.data
      } else {
        Toast(res.msg)
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';
.homepage {
  padding: 40px 0 50px;
  height: 100vh;
  background-color: $backColor;
  .text {
    height: 70%;
    padding-top: 30%;
    line-height: 35px;
    font-size: 22px;
    color: $themeColor;
    text-align: center;
    .count {
      font-family: TrebuchetMS,Rotobo,"Microsoft YaHei",sans-serif;
    }
    .title {
      color: #008fff;
      font-family: serif;
    }
  }
  .opt {
    text-align: center;
    height: 30%;
    button {
      width: 100px;
      background: $themeColor;
      height: 38px;
      border-radius: 19px;
      font-size: 16px;
      color: #fff;
      position: relative;
      padding-right: 10px;
      .right-arrow {
        font-size: 12px;
        line-height: 23px;
        position: absolute;
        left: 65px;
      }
    }
  }
}
</style>
