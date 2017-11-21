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
          <a href="javascript:void(0)" v-show="currentUser.name" class="navbar-link">{{currentUser.name}}</a>
          <a href="javascript:void(0)" v-show="!currentUser.name" @click="goLogin()" class="navbar-link">Login</a>
          <a href="javascript:void(0)" v-show="currentUser.name" @click="logout()" class="navbar-link">Logout</a>
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
  import AV from 'leancloud-storage'

  export default {
    props:['currentUser'],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      goLogin(){
        document.location.hash = '#/login'
      },
      logout(){
        this.$emit('logout')
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
