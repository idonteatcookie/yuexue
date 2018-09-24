<template>
  <transition name="user-order-fade">
  <div class="user-order">
    <header>
      <i class="iconfont icon-xitongfanhui" @click="back"></i>
      <span>我的邀约</span>
    </header>
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
    <div class="no-date" v-if="orderList.length === 0">
      <img src="../../assets/no-date.png">
    </div>
    <router-view></router-view>
  </div>
  </transition>
</template>

<script>
import { queryOrder } from '@/api/order'
import Toast from '@/components/toast'
import { getInterval } from '@/utils'

export default {
  data() {
    return {
      orderList: []
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    goDetail(id) {
      this.$router.push('/user-info/user-order/order-detail/' + id)
    },
    fetch() {
      queryOrder(this.$route.query).then(res => {
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

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .user-order {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: #fff;
    color: #484848;
    overflow-y: auto;
    padding-top: 50px;
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      background-color: $themeColor;
      color: #fff;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #fff;
      i {
        position: absolute;
        left: 15px;
      }
    }
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
    .no-date {
      width: 80%;
      margin: 100px auto;
      img {
        width: 100%;
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
  .user-order-fade-enter-active, .user-order-fade-leave-active {
    transition: all 0.3s;
  }
  .user-order-fade-enter, .user-order-fade-leave-to {
    transform: translateX(100%);
  }
</style>
