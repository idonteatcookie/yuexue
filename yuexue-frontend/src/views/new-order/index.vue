<template>
  <transition name="slide">
  <div class="new-order">
    <header>
      <i class="iconfont icon-xitongfanhui" @click="back"></i>
      <span>发起邀约</span>
    </header>
    <form @submit="submit" target="myIframe">
      <div class="order-form">
        <p class="text-area">
          <label>标题</label>
          <textarea v-model="order.title" required></textarea>
          <span class="error-tips" v-if="order.title && order.title.length > 50">标题不能超过50字</span>
        </p>
        <p>
          <label>学校</label>
          <select v-model="order.university" required>
            <option value="北京大学">北京大学</option>
            <option value="清华大学">清华大学</option>
            <option value="上海交通大学">上海交通大学</option>
          </select>
        </p>
        <p class="input">
          <label>地点</label>
          <input type="text" v-model="order.location" required>
        </p>
        <p class="input">
          <label>开始日期</label>
          <input type="date" v-model="order.startTime" required>
        </p>
        <p class="input">
          <label>结束日期</label>
          <input type="date" v-model="order.endTime" required>
        </p>
        <p class="text-area">
          <label>备注</label>
          <textarea
            v-model="order.remark">
          </textarea>
          <span class="error-tips" v-if="order.remark && order.remark.length > 100">备注不能超过100字</span>
        </p>
        <p class="btn">
          <button>提交</button>
        </p>
      </div>
    </form>
    <iframe width="1px" height="1px" style="display: none;" id="myIframe" name="myIframe"></iframe>
  </div>
  </transition>
</template>

<script>
import { createOrder } from 'api/order'
import Toast from '@/components/toast'
export default {
  data() {
    return {
      order: {}
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    submit() {
      let order = this.order
      if (order.remark && order.remark.length > 100) return false
      if (order.title.length > 50) return false
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

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .new-order {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $backColor;
    header {
      height: 50px;
      padding: 0 20px;
      background-color: $themeColor;
      color: #fff;
      line-height: 50px;
      font-size: 16px;
      i {
        font-weight: 900;
      }
      span {
        margin-left: 25px;
      }
    }
    .order-form {
      text-align: center;
      margin-top: 50px;
      p {
        height: 25px;
        margin-bottom: 20px;
        label {
          line-height: 25px;
          margin-right: 10px;
          width: 60px;
          text-align: right;
          display: inline-block;
          color: #484848;
          font-size: 14px;
        }
        textarea {
          width: 200px;
          height: 50px;
          resize: none;
          vertical-align: middle;
          border-radius: 5px;
        }
        input {
          height: 100%;
          width: 200px;
        }
        select {
          width: 200px;
          height: 100%;
          background-color: #fff;
        }
      }
      .text-area {
        height: 50px;
      }
      .btn {
        width: 270px;
        margin: 20px auto;
        text-align: right;
        button {
          width: 100px;
          height: 30px;
          background: #fff;
        }
      }
      .error-tips {
        color: #ff7f7f;
        font-size: 12px;
        display: inline-block;
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
