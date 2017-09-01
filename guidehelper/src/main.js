// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from './axios/http'
import store from './vuex/store'

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import './assets/css/base.css'
import './assets/css/style.css'


Vue.prototype.$http = axios//添加原型链可以在methods中直接使用this.$http命令

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
    }
  },
  router,
  axios,
  store
})
