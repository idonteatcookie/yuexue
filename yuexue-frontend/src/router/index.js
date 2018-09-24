import Vue from 'vue'
import Router from 'vue-router'
import Homepage from 'views/homepage'
import UserInfo from 'views/user-info'
import OrderView from 'views/order-view'
import Login from 'views/login'
import NewOrder from 'views/new-order'
import OrderDetail from 'views/order-detail'
import UserOrder from 'views/user-order'
import ModifyInfo from 'views/modify-info'
import Page404 from 'views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/user-info',
      component: UserInfo,
      children: [
        {
          path: 'user-order',
          component: UserOrder,
          children: [{
            path: 'order-detail/:orderId',
            component: OrderDetail
          }]
        },
        {
          path: 'modify-info/:id',
          component: ModifyInfo
        }
      ]
    },
    {
      path: '/order-view',
      component: OrderView,
      children: [{
        path: 'order-detail/:orderId',
        component: OrderDetail
      }]
    },
    {
      path: '/homepage',
      component: Homepage,
      children: [{
        path: 'new-order',
        component: NewOrder
      }]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
