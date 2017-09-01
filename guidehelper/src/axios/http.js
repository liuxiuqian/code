/**
 * Created by 风信子 on 1/9/17.
 * http配置
 */

import axios from 'axios'
import store from '../vuex/store'
import * as types from '../vuex/types'
import router from '../router/index'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
      }
      if (store.state.token) {
          config.headers.Authorization = `token ${store.state.token}`;
      }
      return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: '/',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)
    });

export default axios;
