import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({//全局变量定义
  state: {
    username: uni.getStorageSync('username') || '',
    token: uni.getStorageSync('uniapp-token') || ''
  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload
      uni.setStorageSync('username',payload)
    },
    setToken(state, payload) {
      state.token = payload
      uni.setStorageSync('uniapp-token',payload)
    },
    longout(state){
      state.token = ''
      state.username = ''
      uni.removeStorageSync('uniapp-token')
      uni.removeStorageSync('username')
    }
  },
  modules: {}
})
export default store