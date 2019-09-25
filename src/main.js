import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'
import './bus'
// import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// 開啟cookies
axios.defaults.withCredentials = true
// 全域載入loading元件
Vue.component('Loading', Loading)

new Vue({
  router,
  created () {
    // console.log('API-PATH', process.env.VUE_APP_API_PATH)
    // const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`
    // this.$http.get(api).then((response) => {
    //   console.log('response', response.data)
    // })
  },
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`
    // const vm = this
    axios.post(api).then((response) => {
      console.log('response', response.data.message)
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
