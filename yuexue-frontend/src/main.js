import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'

import './styles/index.scss'

Vue.config.productionTip = false
// fastclick.attach(document.body) // 解决移动端点击延迟的问题

// 全局变量 userId
let store = {
  userId: undefined,
  loading: false,
  setUser(userId) {
    console.log('[store] userId = ' + userId)
    this.userId = userId
  },
  setLoading(loading) {
    console.log('[store] loading = ' + loading)
    this.loading = loading
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: store,
  router,
  render: h => h(App)
})
