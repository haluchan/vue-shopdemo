
import Axios from 'axios'
export default {
  strict: true, // 使用嚴謹模式有助開發時操作vuex的錯誤行為
  // state是屬於模組下的區域變數
  // actions,mutations,getters原本是屬於全域變數
  namespaced: true, // true的話 actions,mutations,getters變成區域變數
  state: {
    cart: {},
    cartNum: '',
    cartId: ''
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
    getCart (context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      Axios.get(api).then((response) => {
        context.commit('GETCART', response.data.data)
      })
    },
    addCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const cart = {
        'product_id': id,
        qty
        // es6寫法，會變'qty':qyt
      }
      context.commit('LoadingModules/LOADING', true, { root: true })
      Axios.post(url, { data: cart }).then(response => {
        context.commit('LoadingModules/LOADING', false, { root: true }) // { root: true } 給全域權限
        // { root: true } 代表回到store的根目錄下，LOADING的modules是引入在根目錄下，所以前面必須加Modules名
        context.commit('ADDCART', response.data.id)
        context.dispatch('getCart')
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      context.commit('LoadingModules/LOADING', true, { root: true })
      Axios.delete(url).then(response => {
        if (response.data.success) {
          context.commit('LoadingModules/LOADING', false, { root: true })
          context.dispatch('getCart')
        } else {
          console.log('移除失敗', response.data.message)
        }
      })
    }
  },
  mutations: { // 操作資料狀態
    // vuex建議用大寫命名，比較好識別
    // 第一個參數永遠是state 要操作的資料，也就是最上面的state
    // 第二個是傳入的參數 官方件使用名為payload
    // 非同步行為不要再mutation做，最造成debug時，資料不同步，除錯困難，如ajax
    GETCART (state, payload) {
      state.cart = payload
      // console.log('payload', payload)
      state.cartNum = payload.carts.length
    },
    ADDCART (state, payload) {
      state.cartId = payload
    }
  },
  getters: { // 類似computed
    cart (state) {
      return state.cart
    }
  },
  modules: {
    // 要載入的vuex分拆模組
  }
}
