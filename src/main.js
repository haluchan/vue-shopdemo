import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay' // 畫面轉場套件
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate' // 驗證表單套件
import TW from 'vee-validate/dist/locale/zh_TW' // 驗證表單套件語言包

import App from './App.vue'
import router from './router'
import './bus'
import currencyFilter from '@/filters/currency'
import correctTime from '@/filters/date'
// import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios) // 讓axios直接bind在vue原型下, 可以用 this.axios.get()或是this.$http.get()使用ajax
Vue.use(Vuex)
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh-TW', TW) // 啟用語言包
// 開啟cookies
axios.defaults.withCredentials = true
// 全域載入loading元件
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('dateTime', correctTime)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 強制在網址列輸入不是指定的位置且並未經過驗證後，都會導回的頁面
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`
    // const vm = this
    axios.post(api).then((response) => {
      // console.log('response', response)
      if (response.data.success) {
        next()
      } else {
        next({
          path: 'login'
        })
      }
    })
  } else {
    next()
  }
})
