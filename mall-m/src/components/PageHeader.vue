<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/images/logo.png"></a>
      </div>
      <div class="navbar-right-container">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <a href="javascript:void(0)" v-show="username"  class="navbar-link">{{username}}</a>
          <!-- <router-link to="/login" v-show="!currentUser.username">Login</router-link> -->
          <a href="./login.html" v-show="!username">Login</a>
          <a href="javascript:void(0)" v-show="username" @click="logout()" class="navbar-link">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count"></span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import '../../static/css/base.css'
import './../../static/css/checkout.css'
//import common from '../pages/common/main.js'
import AV from 'leancloud-storage'
import initLeanCloud from './../../static/js/initLeanCloud.js'

  export default {
    data() {
      return {
        username:'',
        objectId:''
      }
    },
    computed:{
      currentUser(){
        return {
        username:this.username,
        objectId:this.objectId
      }
      }
      // currentUser:{
      //   get(){
      //     return {
      //       username:'',
      //       objectId:''
      //     }
      //   },
      //   set(obj){
      //     console.log('obj')
      //     console.log('currentUser')
      //     // this.currentUser = obj
      //     this.username = obj.username
      //     this.objectId = obj.objectId
      //   }
      // }
      //利用计算属性，对象方式无法更新
    },
    created(){
      this.getCurrentUser()
    },
    mounted(){
      console.log(location.pathname)
    },
    methods: {
      logout() {
        console.log('currentUser2',this.username)
        if(this.username){
          AV.User.logOut()
            this.username = ""
            this.objectId = ''
            // this.currentUser = {
            //   username:'',
            //   objectId:''
            // }
          console.log('logout2')
        }else{
          console.log('还未登录')
        }
      },
      getCurrentUser(){
      let currentUser = AV.User.current()
      if(!currentUser){
        return
      }
      this.username = currentUser._serverData.username
      this.objectId = currentUser.id
      // this.currentUser = {
      //   username:currentUser._serverData.username,
      //   objectId:currentUser.id
      // }
      //console.log('currentUser.username',this.currentUser)
      //localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    }
  }
</script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
  }

  .navbar-right-container {
    display: flex;
    align-items: center;
  }

  .navbar-menu-container {
    line-height: 30px;
    display: flex;
    margin-right: 20px;
  }

  svg.navbar-cart-logo {
    width: 30px;
    height: 30px;
  }
  header{
    position: fixed;
    width: 100%;
    top: 0;
    background: #f5f7fd;
    z-index: 99999;
  }
  a.navbar-link {
    margin: 0 5px;
  }
</style>
