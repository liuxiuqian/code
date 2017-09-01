import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Hello from '../view/Hello.vue'
import ddd from '../components/Hello.vue'
import  notfind from '../view/notfind.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    component: resolve => require(['../view/login'],resolve),
    meta: {
      title:'login',
    }
  },
  {
    path: '/hello',
    component: Hello,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/ddd',
    component: ddd,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/notfind',
    component: notfind,
  }
]

const router = new Router({
  mode : 'history',//去除地址栏的 /#/
  routes
});


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit("login", window.localStorage.getItem('token'))
}


router.beforeEach((to, from, next) => {
  //解决vue2.0路由跳转未匹配相应用路由避免出现空白页面
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/notfind');   //如果上级也未匹配到路由则跳转notfind页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
  //路由拦截
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})



export default router;




