import Vue from 'vue'
import App from './App'

import store from './store'
import uView from 'uview-ui'
Vue.use(uView)

import share from '@/common/share.js'
Vue.mixin(share)

import '@/utils/request.js'
Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
  store,
  ...App
})
app.$mount()
