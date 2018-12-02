import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

// 引入 MintUI 组件库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './styles/index.scss'

Vue.config.productionTip = false
fastclick.attach(document.body) // 解决移动端点击延迟的问题

// 全局变量 user 信息
let store = {
  user: undefined,
  loading: false,
  setUser(user) {
    // console.log('[store] username = ' + user.username)
    this.user = user
  },
  setLoading(loading) {
    // console.log('[store] loading = ' + loading)
    this.loading = loading
  }
}

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: store,
  router,
  render: h => h(App)
})
