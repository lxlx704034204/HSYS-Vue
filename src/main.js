// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
import store from './vuex/store'
import util from './util'
import storage from "store2";
import initCodeMapData from './initData';

import ElementUI from 'element-ui'
import './assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/el-modify.scss'
import './assets/scss/my.scss'


import { startLogin } from "./router/interceptorLogin";
import sidebar from '@/pages/sidebar'

// 开启登录
startLogin({ router: router, store: store, isNeedLogin: false });
Vue.config.productionTip = false

Vue.component('my-sidebar', sidebar)
Vue.use(ElementUI)
Vue.use(util)

//路由判断
router.beforeEach((to, from, next) => {
  if (/companycenter/.test(to.fullPath)) {
    $('.out-type-classification').hide()
  } else {
    $('.out-type-classification').show()
  }
  // console.log(to.matched.some(r => r.meta.requireAuth));
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (storage.get("token")) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})


Vue.prototype.axios = axios
window.baseURL = 'http://39.106.136.226:8888/suyun-api/api/';
/* eslint-disable no-new */

// 初始化数据后加载工程
initCodeMapData().then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    },
  })
})

