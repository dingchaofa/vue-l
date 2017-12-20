import Vue from 'Vue'
import Cart from '../../views/Cart'
import {currency} from '../../../static/js/currency'

Vue.filter('currency',currency)

new Vue({
  el:"#cart",
  data:{
  },
  mounted(){
  },
  render:h=>h(Cart)
})