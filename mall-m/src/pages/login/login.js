import Vue from 'Vue'
import Login from '../../views/Login.vue'


new Vue({
  el:"#login",
  data:{
    
  },
  mounted(){
    console.log('this login')
  },
  render:h=>h(Login)
})