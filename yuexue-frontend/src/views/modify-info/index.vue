<template>
  <transition name="modify-info-fade">
    <div class="modify-info">
      <header>
        <i class="iconfont icon-xitongfanhui" @click="back"></i>
        <span>修改个人信息</span>
      </header>
      <form @submit="submit" target="myIframe">
        <div class="form-item">
          <label>昵称</label><input v-model="userInfo.username" type="text" required>
        </div>
        <div class="form-item">
          <label>性别</label><select v-model="userInfo.gender">
            <option value ="male">男</option>
            <option value ="female">女</option>
            <option value ="unknown">未知</option>
          </select>
        </div>
        <div class="form-item">
          <label>年龄</label><input
            v-model.number="userInfo.age"
            type="number"
            placeholder="min: 3, max: 100"
            min="3" max="100">
        </div>
        <div class="form-item">
          <label>学校</label><select v-model="userInfo.university">
            <option value="北京大学">北京大学</option>
            <option value="清华大学">清华大学</option>
            <option value="上海交通大学">上海交通大学</option>
          </select>
        </div>
        <div class="form-item">
          <label>手机号</label><input v-model="userInfo.tel" type="text"
                                   pattern="^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$"
                                     oninvalid="setCustomValidity('请输入正确的手机号');"/>
        </div>
        <div class="form-item">
          <label>微信号</label><input v-model="userInfo.wechat" type="text">
        </div>
        <div class="form-item">
          <label>QQ号</label><input v-model="userInfo.qq" type="text">
        </div>
        <div class="form-item textarea">
          <label>备注</label><textarea v-model="userInfo.remark"></textarea>
        </div>
        <span class="error-tips" v-if="userInfo.remark && userInfo.remark.length > 100">备注不能超过100字</span>
        <div class="form-item">
          <button>确 定</button>
        </div>
      </form>
      <iframe width="1px" height="1px" style="display: none;" id="myIframe" name="myIframe"></iframe>
    </div>
  </transition>
</template>

<script>
import { modify, getUser } from '@/api/user'
import Toast from '@/components/toast'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    submit(e) {
      console.log(e)
      let { remark } = this.userInfo
      if (remark && remark.length > 100) return false
      modify(this.userInfo).then(res => {
        Toast(res.msg)
      })
      return false
    }
  },
  created() {
    getUser().then(res => {
      if (res.success) {
        this.userInfo = res.data
      } else {
        Toast(res.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .modify-info {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: $backColor;
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
    .form-item {
      height: 35px;
      line-height: 35px;
      font-size: 15px;
      padding: 0 10px;
      text-align: right;
      display: flex;
      margin: 10px 0;
      &.textarea {
        height: 50px;
      }
      label {
        width: 60px;
        margin-right: 10px;
      }
      input, textarea, select {
        flex-grow: 1;
        margin-right: 10px;
        color: #666;
      }
      button {
        width: 100%;
        font-size: 13px;
        background-color: #5aaeff;
        color: #fff;
      }
    }
    .error-tips {
      color: #ff7f7f;
      font-size: 12px;
      margin-left: 80px;
    }
  }
  .modify-info-fade-enter-active, .modify-info-fade-leave-active {
    transition: all 0.3s;
  }
  .modify-info-fade-enter, .modify-info-fade-leave-to {
    transform: translateX(100%);
  }
</style>
