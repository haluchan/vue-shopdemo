import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/page/back/Login'
import Dashboard from './components/Dashboard'
import Products from './components/page/back/Products'
import Order from './components/page/back/Order'
import Coupon from './components/page/back/Coupon'
import CustomerOrder from './components/page/back/Customerorder'
import CustomerCheckout from '@/components/page/back/CustomerCheckout'
import Product from '@/views/product'
import Cart from '@/components/page/Cart'
import Payment from '@/components/page/Payment'
import Production from '@/components/page/Production'
import './assets/scss/main.scss'

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
      component: Home
    },
    {
      path: '/product/',
      name: 'Product',
      component: Product,
      children: [
        {
          path: '/product/',
          name: 'production',
          component: Production
        },
        {
          path: '/product/:id',
          name: 'production',
          component: Production
        },
        {
          path: '/product/cart',
          name: 'cart',
          component: Cart
        },
        {
          path: '/product/payment',
          name: 'payment',
          component: Payment
        }
      ]
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
      path: '/shop',
      name: 'shop',
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
