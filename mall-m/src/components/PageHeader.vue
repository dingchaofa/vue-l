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
          <a href="javascript:void(0)" v-show="currentUser.username"  class="navbar-link">{{currentUser.username}}</a>
          <router-link to="/login" v-show="!currentUser.username">Login</router-link>
          <a href="javascript:void(0)" v-show="currentUser.username" @click="logout()" class="navbar-link">Logout</a>
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
  export default {
    data() {
      return {

      }
    },
    computed:{
      currentUser(){
        this.$store.commit('getCurrentUser')
        //console.log('pageheader',this.$store.state.currentUser)
        return this.$store.state.currentUser
      }
    },
    mounted(){
    },
    methods: {
      logout() {
        if(this.currentUser.username){
          this.$store.commit('logout')
          console.log('logout2')
        }else{
          console.log('还未登录')
        }
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
