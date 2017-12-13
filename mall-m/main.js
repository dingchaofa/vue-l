// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import Router from 'vue-router'
import Vuex from 'vuex'
import {currency} from './../static/js/currency'
import AV from 'leancloud-storage'

import Login from './views/Login'
import GoodsList from './views/GoodsList'
import Cart from './views/Cart'
import Address from './views/Address'
import OrderList from './views/OrderList'


Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:'../static/images/loading-svg/loading-bars.svg'
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    currentUser:{
      username:'',
      objectId:''
    },
    cartNum:''
  },
  mutations:{
    getCurrentUser(state){
      let currentUser = AV.User.current()
      if(!currentUser){
        return
      }
      state.currentUser.username = currentUser._serverData.username
      state.currentUser.objectId = currentUser.id
      console.log('currentUser._serverData.username',currentUser._serverData.username)

    },
    logout(state){
      AV.User.logOut()
      state.currentUser = {
        username:'',
        objectId:''
      }
      console.log('logout')
    },
    getCartNum(state){
      state.cartNum = Math.random()
    }
  }
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
    },
    {
      path: '/orderList',
      component: OrderList
    }
  ]
})

Vue.filter('currency',currency)

new Vue({
  el: '#app',
  store,
  router,
  created(){
    store.commit('getCurrentUser')
  },
  mounted(){
    console.log('main')
  },
  methods:{
  }
})
import './../static/css/base.css'
import './../static/css/svg.svg'


