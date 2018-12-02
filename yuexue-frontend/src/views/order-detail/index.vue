<template>
  <div class="order-detail">
    <div class="order-content">
      <mt-header fixed title="邀约详情">
        <mt-button slot="left" icon="back" @click="back()"></mt-button>
      </mt-header>
      <div class="content">
        <div class="order-title">
          <h1 class="title">{{ order.title }}</h1>
          <div class="base-info">
            <span class="city">{{ order.city }}</span>
            <span class="time">{{ getInterval(order.createTime) }}</span>
          </div>
        </div>
        <div class="info-item">
          <label>发起人:</label>
          <span @click="showUserDialog(order.creatorId, isReceiver)" class="username">{{ order.creatorName }}</span>
        </div>
        <div class="info-item" v-if="order.status === orderStatus.RECEIVED_UNREAD || order.status === orderStatus.RECEIVED_READ">
          <label>应邀人:</label>
          <span @click="showUserDialog(order.receiverId, isCreator)" class="username">{{ order.receiverName }}</span>
        </div>
        <div class="info-item">
          <label>时间:</label>
          <span>{{ new Date(order.startTime).format("yyyy-MM-dd") }} ~ {{ new Date(order.endTime).format("yyyy-MM-dd") }}</span>
        </div>
        <div class="info-item">
          <label>地点:</label>
          <span>{{ order.location }}</span>
        </div>
        <div class="info-item">
          <label>备注:</label>
          <span>{{ order.remark }}</span>
        </div>
      </div>
      <div class="opt">
        <button @click="canReceiver" v-if="order.status === 2">接受邀约</button>
        <button v-else-if="isReceiver" class="disabled">已应邀</button>
        <button v-else class="disabled">已有人应邀</button>
        <button v-if="isCreator && order.status === 2" class="remove-order" @click="() => { deleteDialog = true }">删 除</button>
      </div>
    </div>
    <!-- 发起人详情弹出框 -->
    <Dialog class="user-info-dialog" v-show="dialogVisible">
      <template slot="header">
        <h1>
          <img class="user-avatar" :src="imgUrl">
          <p>
            <i v-if="showUser.gender === gender.FEMALE" class="iconfont icon-sexw" style="color: deeppink"></i>
            <i v-if="showUser.gender === gender.MALE" class="iconfont icon-sexm" style="color: #48b1ff"></i>
            <i v-if="showUser.gender === gender.UNKNOWN" class="iconfont icon-intersex" style="color: #a6a6a6"></i>
            <span class="name">{{ showUser.username }}</span>
          </p>
        </h1>
      </template>
      <p>
        <i class="iconfont icon-Page" style="color: #ff7736"></i>
        <span>{{ showUser.age }}岁</span>
      </p>
      <p>
        <i class="iconfont icon-dangdi" style="color: #2308ff"></i>
        <span>{{ showUser.city }}</span>
      </p>
      <p>
        <i class="iconfont icon-phone"></i>
        <span v-if="canSeePrivate">{{ showUser.tel }}</span>
        <span v-else>********</span>
      </p>
      <p>
        <i class="iconfont icon-wechat" style="color: #00a82f"></i>
        <span v-if="canSeePrivate">{{ showUser.wechat }}</span>
        <span v-else>********</span>
      </p>
      <p>
        <i class="iconfont icon-QQ" style="color: #0086ff"></i>
        <span v-if="canSeePrivate">{{ showUser.qq }}</span>
        <span v-else>********</span>
      </p>
      <p>
        <i class="iconfont icon-remark"></i>
        <span>{{ showUser.remark }}</span>
      </p>
      <template v-if="!canSeePrivate">
        <p class="tips">{{ order.creatorId === showUser.id ? '接受' : '发起' }}邀约者可见联系方式</p>
      </template>

      <template slot="footer">
        <button @click="() => { this.dialogVisible = false }">确定</button>
      </template>
    </Dialog>
    <Dialog class="delete-order-dialog" v-show="deleteDialog">
      <div class="text">邀约删除后不可恢复，确定删除吗？</div>
      <template slot="footer">
        <div class="btn-group">
          <button class="ok" @click="deleteOrder">确定</button>
          <button class="cancel" @click="() => { deleteDialog = false }">取消</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { queryOrder, receiveOrder, deleteOrder } from '@/api/order'
import { getUser, getUserInfo } from '@/api/user'
import Toast from '@/components/toast'
import Dialog from '@/components/dialog.vue'

import { getInterval } from '@/utils'
import { gender, orderStatus } from '@/constant'

export default {
  data() {
    return {
      order: {},
      dialogVisible: false,
      showUser: {},
      gender,
      orderStatus,
      canSeePrivate: false,
      imgUrl: '',
      deleteDialog: false
    }
  },
  computed: {
    isCreator() {
      let id = this.$root.$data.user && this.$root.$data.user.id
      return id === this.order.creatorId
    },
    isReceiver() {
      let id = this.$root.$data.user && this.$root.$data.user.id
      return id === this.order.receiverId
    }
  },
  methods: {
    showUserDialog(userId, canSeePrivate) {
      this.imgUrl = process.env.BASE_API + '/avatar/avatar_' + userId
      getUser({ userId }).then(res => {
        if (res.success) {
          this.showUser = res.data
          this.dialogVisible = true
          this.canSeePrivate = canSeePrivate
        }
      })
    },
    back() {
      this.$router.back()
    },
    getOrderInfo() {
      let { orderId } = this.$route.params
      return queryOrder({ id: orderId }).then(res => {
        if (res.success && res.data && res.data[0]) {
          this.order = res.data && res.data[0]
        } else {
          this.$router.back()
          Toast(res.msg || '邀约不存在')
        }
      })
    },
    canReceiver() {
      getUserInfo().then(res => {
        if (res.success) {
          this.userInfo = res.data
          if (res.data.hasContactInfo) {
            this.receive()
          } else {
            Toast('请先填写至少一种联系方式才可以发起邀约')
          }
        } else {
          Toast(res.msg)
        }
      })
    },
    receive() {
      let { orderId } = this.$route.params
      receiveOrder({ id: orderId }).then(res => {
        if (res.success) {
          Toast('成功接受邀约，记得及时联系小伙伴哦~')
          this.getOrderInfo()
        } else {
          Toast(res.msg)
        }
      })
    },
    deleteOrder() {
      deleteOrder({ id: this.order.id }).then(res => {
        if (res.success) {
          Toast(res.msg)
          this.deleteDialog = false
          this.$router.push('/order-list')
        } else {
          Toast(res.msg)
        }
      })
    },
    getInterval
  },
  created() {
    this.getOrderInfo()
  },
  components: {
    Dialog
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .order-detail {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: $backColor;
    color: #484848;
    overflow: scroll;
    .content {
      padding: 50px 20px;
      .order-title {
        margin: 20px 0;
        .title {
          margin: 20px 0 10px;
          line-height: 1.5;
        }
        .base-info {
          font-size: 12px;
          color: #888;
          text-align: right;
        }
      }
      .info-item {
        line-height: 30px;
        padding-left: 70px;
        font-size: 14px;
        .username {
          cursor: pointer;
          color: #0ca2ff;
        }
        label {
          width: 60px;
          display: inline-block;
          text-align: right;
          margin: 0 10px 0 -75px;
        }
      }
    }
    .opt {
      width: 150px;
      margin: 20px auto;
      button {
        height: 30px;
        width: 100%;
        background-color: #b19dff;
        color: #fff;
        box-shadow: 1px 1px 1px 0px #00000050;
        &.disabled {
          background-color: #b5b5b5;
        }
      }
      .remove-order {
        margin-top: 10px;
        background-color: #ff5d47;
      }
    }
    .user-info-dialog {
      h1 {
        padding: 5px 20px;
        .user-avatar {
          height: 30px;
          width: 30px;
          border-radius: 15px;
          line-height: 40px;
          display: block;
          margin: 0px auto;
        }
        p {
          text-align: center;
          border-bottom: 1px solid #dedede;
        }
      }
      p {
        line-height: 20px;
        font-size: 13px;
      }
      button {
        padding: 3px 15px;
        border-radius: 3px;
        background-color: #77baff;
      }
      .tips {
        color: #a5a5a5;
        font-size: 12px;
        text-align: right;
        margin-top: 15px;
      }
    }
    .delete-order-dialog {
      .text {
        padding: 5px;
        font-size: 14px;
        line-height: 1.5;
      }
      .btn-group {
        padding: 20px 0;
        button {
          height: 30px;
          width: 60px;
          border-radius: 5px;
          &.ok {
            background-color: #238fff;
            color: #fff;
            margin-right: 10px;
          }
          &.cancel {
            background-color: #a2a2a2;
            color: #fff;
          }
        }
      }
    }
  }
</style>
