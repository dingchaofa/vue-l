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
          <a href="javascript:void(0)" class="navbar-link">Login</a>
          <a href="javascript:void(0)" class="navbar-link">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count"></span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
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
</style>
