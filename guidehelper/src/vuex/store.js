/**
 * Created by Administrator on 2017/7/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    token : null,
    title: ''
  },
  mutations:{
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
})

export default store
