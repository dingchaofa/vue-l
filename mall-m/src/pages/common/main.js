import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import Router from 'vue-router'
import Vuex from 'vuex'
import {currency} from '../../../static/js/currency'
import AV from 'leancloud-storage'

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


new Vue({
  data:{

  },
  mounted(){
    console.log('this is store',Vue)
  }
})
Vue.filter('currency',currency)

import '../../../static/css/base.css'
import '../../../static/css/svg.svg'
