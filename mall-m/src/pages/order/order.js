import Vue from 'Vue'
import OrderList from '../../views/OrderList'
import {currency} from '../../../static/js/currency'

Vue.filter('currency',currency)
new Vue({
  el:"#order",
  data:{
  },
  mounted(){
  },
  render:h=>h(OrderList)
})