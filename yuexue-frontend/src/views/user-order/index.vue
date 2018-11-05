<template>
  <transition mode="in-out">
    <div v-if="$route.name === 'userOrder'" class="user-order" key="userOrder">
      <mt-header fixed title="我的邀约">
        <router-link to="/user-info" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
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
    </div>
    <router-view v-else key="userOrderDetail"></router-view>
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
      this.$root.$data.setLoading(true)
      queryOrder(this.$route.query).then(res => {
        this.$root.$data.setLoading(false)
        if (res.success) {
          this.orderList = res.data
        } else {
          Toast(res.msg)
        }
      }).catch(e => this.$root.$data.setLoading(false))
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
    .order-list {
      padding-top: 50px;
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
</style>
