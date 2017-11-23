// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import Router from 'vue-router'
import {currency} from './../static/js/currency'

import HelloWorld from '@/components/HelloWorld'
import Login from './views/Login'
import GoodsList from './views/GoodsList'
import Cart from './views/Cart'
import Address from './views/Address'


Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:'../static/images/loading-svg/loading-bars.svg'
})

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/goodslist',
      component: GoodsList
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/address',
      component: Address
    }
  ]
})

Vue.filter('currency',currency)

new Vue({
  el: '#app',
  router
})
import './../static/css/base.css'
import './../static/css/svg.svg'
