# guidehelper

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2.vue+axios 前端实现登录拦截（路由拦截、http拦截）
- localStorage存储登录状态，利用vuex（状态管理器）进行判断，利用vue-router提供的钩子函数beforeEach()对路由进行判断，axios进行请求http拦截。

#### 1、配置vue-router路由拦截，结合vuex（状态管理器）和localStorage

##### 1、router js配置

###### （1）在需要登录权限的页面路由加上自定义属性requireAuth，用于标记是否有登录权限。

    meta: {
      requireAuth: true
    }
如图
    
 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue21.png)

###### （2）router js  进行router.beforeEach拦截配置

    router.beforeEach((to, from, next) => {
      //解决vue2.0路由跳转未匹配相应用路由避免出现空白页面
      if (to.matched.length ===0) {//如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/notfind');   //如果上级也未匹配到路由则跳转notfind页面，如果上级能匹配到则转上级路由
      } else {
    next();//如果匹配到正确跳转
      }
      //路由拦截
      if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
    path: '/',//返回首页（这里是登录页）
    query: {redirect: to.fullPath}//登录成功前往上次要去的页面
      })
    }
      }
      else {
    next();
      }
    })

####### （3）页面刷新时，重新赋值token
    
    if (window.localStorage.getItem('token')) {
      store.commit("login", window.localStorage.getItem('token'))
    }

###### （4）去除地址栏的 /#/

    mode : 'history',

 ![Alt text](https://raw.githubusercontent.com/liuxiuqian/note1/master/img/vue22.png)


##### 2、vuex（状态管理器）配置

###### （1）store.js配置

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

[types.LOGIN]是在types里定义的变量，方便管理使用。

存数据方法：

    this.$store.commit("login", this.token)

"login"为types.js的变量值，this.token要存的值

取值方法：

    
    import store from '../vuex/store'
	
    store.state.token//使用前要引入storejs文件

获取store中的token值

###### （2）types.js
    
    /**
     * Created by superman on 17/2/16.
     * vuex types
     */
    
    export const LOGIN = 'login';
    
    export const LOGOUT = 'logout';
    
    export const TITLE = 'title'

###### （3）登录页获取token存储在store中

    if (this.token) {
	    this.$store.commit("login", this.token)
	    let redirect = decodeURIComponent(this.$route.query.redirect || '/hello');
	    this.$router.push({
	      path: redirect
	    })
      }


在登录页定义token变量，通过获取后台接口的token值，存储的store中，并上次即将要进入的页面或者'/hello'页。


以上工程完成了页面的路由控制，但是没有真正做到拦截，需要结合api接口进行拦截，本文用到的是axios

#### 2、axios拦截

##### 1、axios文件配置

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

接口请求的配置，发送拦截和接收拦截。
