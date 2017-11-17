// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from './views/Login'
import GoodsList from './views/GoodsList'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:'../static/images/loading-svg/loading-bars.svg'
})

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/goodslist',
      component: GoodsList
    }
  ]
})


new Vue({
  el: '#app',
  router
})
import './../static/css/base.css'
import './../static/css/svg.svg'
