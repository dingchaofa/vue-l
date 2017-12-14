import Vue from 'Vue'
import GoodsList from '../../views/GoodsList'

// Vue.component('GoodsList',{
//   template:'<h2>这里是模版</h2>'
// })

new Vue({
  el:"#index",
  data:{
    msg:'nnnn'
  },
  mounted(){
    console.log('this index.js',this)
  },
  render:h=>h(GoodsList)
})