<template>
  <div class="order-view">
    <mt-header fixed	title="邀约列表">
    </mt-header>
    <template>
      <div class="search">
        <input @keyup.enter="fetch" v-model="search" type="text" placeholder="请输入查询内容">
        <i @click="fetch" class="iconfont icon-sousuo"></i>
      </div>
      <div class="order-list">
        <ul>
          <li @click="goDetail(item.id)" :key="index" v-for="(item, index) in orderList">
            <div class="order-title">
              <span>{{item.title}}</span>
            </div>
            <div class="order-secondary">
              <span class="creator">{{item.creatorName}}</span>
              <span class="time">{{getInterval(item.createTime)}}</span>
            </div>
          </li>
          <li class="loading" v-if="loading && !allLoaded">加载中...</li>
        </ul>
      </div>
      <div class="to-top">
        <i class="iconfont icon-tabshouqi" @click="toTop"></i>
      </div>
    </template>
    <router-view></router-view>
    <app-footer class="main-footer"></app-footer>
  </div>
</template>

<script>
import { queryCurrentOrders } from '@/api/order'
import Toast from '@/components/toast'
import AppFooter from 'components/app-footer.vue'
import { getInterval, smoothScrollTo } from '@/utils'

export default {
  data() {
    return {
      orderList: [],
      search: '',
      page: 1,
      loading: false,
      allLoaded: false
    }
  },
  components: {
    AppFooter
  },
  methods: {
    toTop() {
      smoothScrollTo()
    },
    goDetail(id) {
      this.$router.push(`/order-view/order-detail/${id}`)
    },
    fetch() {
      this.$root.$data.setLoading(true)
      queryCurrentOrders({ search: this.search, start: 1, size: 10 }).then(res => {
        this.$root.$data.setLoading(false)
        if (res.success) {
          this.orderList = res.data
          this.page = 1
          this.allLoaded = false
        } else {
          Toast(res.msg)
        }
      })
    },
    getNextPage() {
      this.loading = true
      setTimeout(() => {
        queryCurrentOrders({ search: this.search, start: this.page * 10, size: 10 }).then(res => {
          if (res.success) {
            if (res.data.length === 0) this.allLoaded = true
            this.orderList = this.orderList.concat(res.data)
            this.loading = false
            this.page++
          } else {
            Toast(res.msg)
          }
        })
      }, 1000)
    },
    onScroll() {
      if (this.loading || this.allLoaded) return
      let top = document.documentElement.scrollTop || document.body.scrollTop // 滚动条在Y轴上的滚动距离
      let vh = document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight // 浏览器视口的高度
      let height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) // 文档的总高度
      if (top + vh >= height) { // 滚动到底部
        this.getNextPage() // 如果已经滚到底了 获取数据
      }
    },
    getInterval
  },
  created() {
    this.fetch()
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss">
  .order-view {
    padding-bottom: 50px;
    padding-top: 50px;
    .mint-header {
      background: #000;
      height: 50px;
    }
    .search {
      height: 50px;
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      box-shadow: 0px 1px 1px 0px #f9f9f9;
      padding: 10px 0 10px 10px;
      background: #e6e6e6;
      input {
        height: 100%;
        flex-grow: 1;
        border-right: 1px solid #f9f9f9;
        padding: 10px;
      }
      i {
        font-size: 25px;
        line-height: 30px;
        margin: 0 5px;
      }
    }
    .order-list {
      li {
        height: 75px;
        padding: 0 10px;
        line-height: 25px;
        border-bottom: 1px solid #e8e8e8;
        &.loading {
          line-height: 50px;
          text-align: center;
          color: #c7c7c7;
        }
        .order-title {
          height: 50px;
          overflow: hidden;
        }
        .order-secondary {
          height: 25px;
          display: flex;
          font-size: 12px;
          .creator {
            flex-grow: 1;
            color: #888;
          }
          .time {
            font-family: Helvetica, Tahoma, Arial;
            color: #adadad;
          }
        }
      }
    }
    .to-top {
      position: fixed;
      right: 20px;
      bottom: 60px;
      i {
        color: #9a9a9a;
        background: #eee;
        font-size: 32px;
      }
    }
  }
</style>
