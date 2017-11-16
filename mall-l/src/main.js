// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import GoodsList from './views/GoodsList'
import Login from './views/Login'
//import router from './router'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:'../static/images/loading-svg/loading-bars.svg'
})


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   //router,
//   template: '<GoodsList/>',
//   components: { GoodsList }
// })

new Vue({
  el: '#app',
  //router,
  template: '<Login/>',
  components: { Login }
})
import './../static/css/base.css'
import './../static/css/svg.svg'
