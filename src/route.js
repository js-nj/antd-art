import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Index from './pages/index.vue'
import Course from './pages/course.vue'
import List from './pages/list.vue'
import My from './pages/my.vue'
import Order from './pages/order.vue'
import OrderDetail from './pages/orderDetail.vue'
import Pay from './pages/pay.vue'
import consumelist from './pages/consumelist.vue'

Vue.use(Router)

export const constantRoutes = [{
  path: '/',
  component: Login
}, {
  path: '/index',
  component: Index
}, {
  path: '/course',
  component: Course
}, {
  path: '/list',
  component: List
}, {
  path: '/my',
  component: My
}, {
  path: '/order',
  component: Order
}, {
  path: '/orderDetail',
  component: OrderDetail
}, {
  path: '/pay',
  name: 'pay',
  component: Pay
}, {
  path: '/consumelist',
  name: 'consumelist',
  component: consumelist
}]

export default new Router({
  routes: constantRoutes
})