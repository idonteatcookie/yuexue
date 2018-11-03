<template>
  <div class="user-info">
    <mt-header fixed title="个人信息">
    </mt-header>
    <ul class="info-list">
      <label for="upload" class="avatar">
        <input
          id="upload"
          ref="upload"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          @change="uploadAvatar">
        <img :src="imgUrl">
      </label>
      <li>
        <label>昵称</label>
        <span class="data">{{ userInfo.username }}</span>
      </li>
      <li>
        <label>性别</label>
        <span class="data">{{ getGender(userInfo.gender) }}</span>
      </li>
      <li>
        <label>年龄</label>
        <span class="data">{{ userInfo.age }}</span>
      </li>
      <li>
        <label>城市</label>
        <span class="data">{{ userInfo.city }}</span>
      </li>
      <li>
        <label>邮箱</label>
        <span class="data">{{ userInfo.email }}</span>
      </li>
      <li>
        <label>电话</label>
        <span class="data">{{ userInfo.tel }}</span>
      </li>
      <li>
        <label>微信号</label>
        <span class="data">{{ userInfo.wechat }}</span>
      </li>
      <li>
        <label>QQ号</label>
        <span class="data">{{ userInfo.qq }}</span>
      </li>
      <li>
        <label>备注</label>
        <span class="data">{{ userInfo.remark }}</span>
      </li>
    </ul>
    <ul class="history-list">
      <li>
        <label>我发布的</label>
        <span class="data" @click="userCreated()">&gt;</span>
      </li>
      <li>
        <label>我接受的</label>
        <span class="data" @click="userReceived()">&gt;</span>
      </li>
    </ul>
    <button @click="modifyInfo">修改个人信息</button>
    <button @click="logout" class="logout">退出登录</button>
    <router-view></router-view>
    <app-footer class="main-footer"></app-footer>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils'
import { logout, getUser, modifyAvatar } from '@/api/user'
import Toast from '@/components/toast'
import AppFooter from 'components/app-footer.vue'
import { gender } from '@/constant'

export default {
  data() {
    return {
      userInfo: {},
      imgUrl: ''
    }
  },
  components: {
    AppFooter
  },
  methods: {
    userCreated() {
      let id = this.userInfo.id
      this.$router.push({
        path: `/user-info/user-order`,
        query: { creatorId: id }
      })
    },
    userReceived() {
      let id = this.userInfo.id
      this.$router.push({
        path: `/user-info/user-order`,
        query: { receiverId: id }
      })
    },
    logout() {
      deleteCookie('koa:sess')
      deleteCookie('koa:sess.sig')
      logout().then(() => { this.$router.push('/login') })
    },
    modifyInfo(userId) {
      this.$router.push('/user-info/modify-info/' + this.userInfo.id)
    },
    fetch() {
      getUser().then(res => {
        if (res.success) {
          this.userInfo = res.data
          this.imgUrl = process.env.BASE_API + '/avatar/avatar_' + this.userInfo.id + '?time=' + Date.now()
        } else {
          Toast(res.msg)
        }
      })
    },
    getGender(code) {
      if (code === gender.MALE) return '男'
      if (code === gender.FEMALE) return '女'
      if (code === gender.UNKNOWN) return '未知'
    },
    uploadAvatar(e) {
      let file = e.target.files[0]
      if (file.size > 1000 * 1000 * 2) { // 文件大小应该小于2M
        e.target.value = ''
        Toast('上传头像大小应小于2M')
        return
      }
      modifyAvatar(file, this.userInfo.id).then(res => {
        if (res.success) {
          this.imgUrl = this.imgUrl + '?time=' + Date.now()
        }
      })
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    '$route'({ path }) {
      if (path === '/user-info') {
        this.fetch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .user-info {
    padding: 50px 0 50px;
    min-height: calc(100vh - 90px);
    background-color: $backColor;
    .info-list, .history-list {
      background-color: #fff;
      padding: 0 10px;
      li {
        font-size: 15px;
        color: #131313;
        line-height: 41px;
        height: 40px;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        label {
          flex-grow: 1;
          min-width: 60px;
        }
        .data {
          color: #969696;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .info-list {
      .avatar {
        text-align: center;
        display: block;
        padding: 5px 0;
        border-bottom: 1px solid #e4e4e4;
        input {
          visibility: hidden;
          width: 0;
          height: 0;
        }
        img {
          width: 60px;
          height: 60px;
          border: solid 1px #bfbfbf;
          border-radius: 30px;
        }
      }
    }
    .history-list {
      margin-top: 18px;
    }
    button {
      width: 100%;
      height: 36px;
      background-color: #41b0ff;
      color: #fff;
      margin-top: 18px;
      font-size: 15px;
      &.logout {
        background-color: #ff7263
      }
    }
  }
</style>
