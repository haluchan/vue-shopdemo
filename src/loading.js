export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  actions: { // 操作行為
    updateLoading (context, status) {
      context.commit('LoadingModules/LOADING', status, { root: true }) // 用commit來操作mutations 的function
    }
  },
  mutations: { // 操作資料狀態
    LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    Loading (state) {
      return state.isLoading
    }
  },
  modules: {
    // 要載入的vuex分拆模組
  }
}
