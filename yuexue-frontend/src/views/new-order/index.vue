<template>
  <transition name="slide">
  <div class="new-order">
    <mt-header fixed title="发起邀约">
      <router-link to="/homepage" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="order-form">
      <mt-field label="标题" type="textarea" rows="2" v-model="order.title"></mt-field>
      <mt-field label="城市" v-model="order.university"></mt-field>
      <mt-field label="地点" @click.naive="openPicker()" v-model="order.location"></mt-field>
      <mt-cell title="开始时间">
        <span class="select-time">{{ order.startTime.format("yyyy-MM-dd") }}</span>
        <mt-button type="default" size="small" @click="openPicker('startTime')">选择</mt-button>
      </mt-cell>
      <mt-cell title="开始时间">
        <span class="select-time">{{ order.endTime.format("yyyy-MM-dd") }}</span>
        <mt-button type="default" size="small" @click="openPicker('endTime')">选择</mt-button>
      </mt-cell>
      <mt-field label="备注" type="textarea" rows="4" v-model="order.remark"></mt-field>
      <mt-datetime-picker
        ref="picker"
        type="date"
        @confirm="handleConfirm">
      </mt-datetime-picker>
      <mt-button class="submit-btn" type="primary" @click="submit">提交</mt-button>
    </div>
  </div>
  </transition>
</template>

<script>
import { createOrder } from 'api/order'
//import Toast from '@/components/toast'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      order: {
        startTime: new Date(),
        endTime: new Date()
      },
      datePickerForField: ''
    }
  },
  methods: {
    handleConfirm(d) {
      this.order[this.datePickerForField] = d
    },
    openPicker(field) {
      this.datePickerForField = field
      this.$refs.picker.open();
    },
    isValid() {
      let { title, university, location, startTime, endTime, remark } = this.order
      if (!title) {
        Toast({
          message: '请填写标题',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }
      if (title.length < 2 || title.length > 50) {
        Toast({
          message: '标题需在2-50个字符之间',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }
      if (!university) {
        Toast({
          message: '请填写城市',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }
      if (!location) {
        Toast({
          message: '请填写地点',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }
      if (startTime > endTime) {
        Toast({
          message: '开始时间要小于结束时间',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }

      if (remark && remark.length > 200) {
        Toast({
          message: '备注不能超过200个字符',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        });
        return false
      }
      return true
    },
    submit() {
      if (!this.isValid()) return;
      let order = {
        title: this.order.title,
        university: this.order.university,
        location: this.order.location,
        startTime: this.order.startTime.format("yyyy-MM-dd"),
        endTime: this.order.endTime.format("yyyy-MM-dd")
      }
      createOrder(order).then(res => {
        if (res.success) {
          Toast(res.msg)
          this.$router.push('/homepage')
        } else {
          Toast(res.msg)
        }
      }).catch(err => {
        console.log('创建订单页面>发送请求-createOrder()出错：', err)
      })
      return false
    }
  }
}
</script>

<style lang="scss">
  @import '../../styles/variables.scss';
  .new-order {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $backColor;
    .order-form {
      padding: 60px 10px 0;
      height: 100vh;
      .mint-cell {
        margin-bottom: 10px;
      }
      .mint-field .mint-cell-title {
        width: 80px;
      }
      .select-time {
        margin-right: 5px;
      }
      .submit-btn {
        width: 100%;
        margin-top: 15px;
      }
    }
  }
  .form-invalid {
    color: #ffbf1d;
    .mint-toast-icon {
      font-size: 24px;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
