import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/page/Login'
import Dashboard from './components/Dashboard'
import Products from './components/page/Products'
import Order from './components/page/Order'
import Coupon from './components/page/Coupon'
import CustomerOrder from './components/page/Customerorder'
import CustomerCheckout from '@/components/page/CustomerCheckout'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'customerOrder',
          component: CustomerOrder
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'customerCheckout',
          component: CustomerCheckout
        }
      ]
    }
  ]
})
