import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

import ProductsModules from './products'
import LoadingModules from './loading'
import CartModules from './cart'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 使用嚴謹模式有助開發時操作vuex的錯誤行為
  // state是屬於模組下的區域變數
  // actions,mutations,getters原本是屬於全域變數
  namespaced: false, // true的話 actions,mutations,getters變成區域變數
  state: {
    showCoupon_error: false,
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: ''
    },
    slidMenuData: false,
  },
  actions: { // 操作行為
    // context是vuex預設的參數，包含以下內容，status是自訂參數(正確名為payload)
    //  {
    //   state,      // 等同于 `store.state`，若在模块中则为局部状态
    //     rootState,  // 等同于 `store.state`，只存在于模块中
    //     commit,     // 等同于 `store.commit`
    //     dispatch,   // 等同于 `store.dispatch`
    //     getters,    // 等同于 `store.getters`
    //     rootGetters // 等同于 `store.getters`，只存在于模块中
    //  }
    // 非同步行為在action裡做完再操作mutations，如ajax
    addCouponCode (context, couponCode) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
      const coupon = {
        code: couponCode
      }
      context.dispatch('LoadingModules/updateLoading', true, { root: true })
      Axios.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          console.log('coupon', response)
          context.commit('COUPONACTIVE', false)
          context.dispatch('CartModules/getCart')
        } else {
          context.commit('COUPONACTIVE', true)
        }
        context.dispatch('LoadingModules/updateLoading', false, { root: true })
      })
    },
    creatTransList (context, list) {
      context.commit('CREATLIST', list)
    },
    slidMenu (context, action) {
      context.commit('SHOWMENU', action)
    }

  },
  mutations: { // 操作資料狀態
    // vuex建議用大寫命名，比較好識別
    // 第一個參數永遠是state 要操作的資料，也就是最上面的state
    // 第二個是傳入的參數 官方件使用名為payload
    // 非同步行為不要再mutation做，最造成debug時，資料不同步，除錯困難，如ajax
    COUPONACTIVE (state, payload) {
      state.showCoupon_error = payload
    },
    CREATLIST (state, payload) {
      state.form = payload
    },
    SHOWMENU (state, payload) {
      state.slidMenuData = payload
    }
  },
  getters: { // 類似computed
    order (state) {
      return state.form
    },
    showsSlide (state) {
      return state.slidMenuData
    }
  },
  modules: {
    // 要載入的vuex分拆模組
    ProductsModules,
    LoadingModules,
    CartModules
  }
})
