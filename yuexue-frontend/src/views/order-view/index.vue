<template>
  <div class="order-view">
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
        </ul>
      </div>
      <div class="to-top">
        <i class="iconfont icon-tabshouqi" @click="toTop"></i>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import { queryCurrentOrders } from '@/api/order'
import Toast from '@/components/toast'
import { getInterval, smoothScrollTo } from '@/utils'

export default {
  data() {
    return {
      orderList: [],
      search: ''
    }
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
      queryCurrentOrders({ search: this.search }).then(res => {
        this.$root.$data.setLoading(false)
        if (res.success) {
          this.orderList = res.data
        } else {
          Toast(res.msg)
        }
      })
    },
    getInterval
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
  .order-view {
    .search {
      height: 35px;
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      box-shadow: 0px 1px 1px 0px #f9f9f9;
      input {
        height: 100%;
        flex-grow: 1;
        border-right: 1px solid #f9f9f9;
        padding: 10px;
      }
      i {
        font-size: 25px;
        line-height: 35px;
        margin: 0 5px;
      }
    }
    .order-list {
      li {
        height: 75px;
        padding: 0 10px;
        line-height: 25px;
        border-bottom: 1px solid #e8e8e8;
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
