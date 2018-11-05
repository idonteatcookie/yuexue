<template>
  <transition>
    <div class="new-order">
      <mt-header fixed title="发起邀约">
        <router-link to="/homepage" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="order-form">
        <mt-field label="标题" v-model="order.title"></mt-field>
        <mt-cell title="城市" class="form-ceil">
          <span>{{ order.city }}</span>
          <mt-button size="small" type="default" @click="cityPopupVisible = true">选择</mt-button>
        </mt-cell>
        <mt-popup
          v-model="cityPopupVisible"
          class="mint-popup"
          position="bottom">
          <mt-picker :slots="slots" @change="onValuesChange">
          </mt-picker>
          <mt-button size="small" class="submit-btn" @click="selectCity">确 定</mt-button>
        </mt-popup>
        <mt-field label="地点" v-model="order.location"></mt-field>
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
          :startDate="new Date()"
          @confirm="handleConfirm">
        </mt-datetime-picker>
        <mt-button class="submit-btn" type="primary" @click="submit">提交</mt-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { createOrder } from 'api/order'
import { province, city } from '@/utils/cityData'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      order: {
        city: this.$root.$data.user && this.$root.$data.user.city,
        startTime: new Date(),
        endTime: new Date()
      },
      datePickerForField: '',
      cityPopupVisible: false,
      cityValues: ['北京市', '北京市'],
      slots: [
        {
          flex: 1,
          values: province,
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: city[province[0]],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  methods: {
    selectCity() {
      this.order.city = this.cityValues.join()
      this.cityPopupVisible = false
    },
    onValuesChange(picker, values) {
      picker.setSlotValues(1, city[values[0]])
      this.cityValues = values
    },
    handleConfirm(d) {
      this.order[this.datePickerForField] = d
    },
    openPicker(field) {
      this.datePickerForField = field
      this.$refs.picker.open()
    },
    isValid() {
      let { title, city, location, startTime, endTime, remark } = this.order
      if (!title) {
        Toast({
          message: '请填写标题',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }
      if (title.length < 2 || title.length > 50) {
        Toast({
          message: '标题需在2-50个字符之间',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }
      if (!city) {
        Toast({
          message: '请填写城市',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }
      if (!location) {
        Toast({
          message: '请填写地点',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }
      if (startTime > endTime) {
        Toast({
          message: '开始时间要小于结束时间',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }

      if (remark && remark.length > 200) {
        Toast({
          message: '备注不能超过200个字符',
          iconClass: 'iconfont icon-zhuyi',
          className: 'form-invalid'
        })
        return false
      }
      return true
    },
    submit() {
      if (!this.isValid()) return
      let order = {
        title: this.order.title,
        city: this.order.city,
        location: this.order.location,
        startTime: this.order.startTime.format('yyyy-MM-dd'),
        endTime: this.order.endTime.format('yyyy-MM-dd')
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
      /* 下面的css我自己也乱了.... */
      .mint-cell {
        margin-bottom: 10px;
      }
      .mint-field .mint-cell-title {
        width: 80px;
      }
      .mint-cell-value {
        span {
          font-size: 14px;
          color: #888;
        }
        input, textarea {
          font-size: 14px;
          color: #888;
        }
        textarea {
          resize: none;
        }
      }
      .select-time {
        margin-right: 5px;
      }
      .submit-btn {
        width: 100%;
        margin-top: 15px;
      }
      .form-ceil {
        .mint-cell-title {
          flex-grow: initial;
          flex-basis: 80px;
        }
        .mint-cell-value {
          flex-grow: 1;
          span {
            font-size: 12px;
            flex-grow: 1;
          }
        }
      }
      .mint-popup {
        width: 100%;
        text-align: center;
        padding: 10px;
      }
    }
  }
</style>
