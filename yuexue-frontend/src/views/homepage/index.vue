<template>
  <div class="homepage">
    <mt-header fixed>
      <img slot="left" class="logo" src="../../assets/yuexue.png">
      <mt-button v-if="unReadCnt" slot="right" @click="seeUnreadMsg">
        <mt-badge type="error">{{ unReadCnt > 99 ? '99+' : unReadCnt }}</mt-badge>
      </mt-button>
    </mt-header>
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
import {queryOrder, readAllUnreadOrder} from '@/api/order'
import { orderStatus } from '@/constant/index'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      userInfo: {},
      unReadCnt: 0
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
    AppFooter
  },
  methods: {
    seeUnreadMsg() {
      MessageBox.alert(`你有 ${this.unReadCnt} 个邀约被人接受啦！可去个人中心查看详情`).then(() => {
        this.unReadCnt = 0
        readAllUnreadOrder()
      })
    },
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
        queryOrder({ creatorName: this.userInfo.username, status: orderStatus.RECEIVED_UNREAD }).then(res => {
          this.unReadCnt = res.data.length
        })
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
  padding: 50px 0 40px;
  height: 100vh;
  .logo {
    height: 26px;
    margin: 12px 32px;
  }
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
