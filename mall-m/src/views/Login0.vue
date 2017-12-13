<template>
<div id="login">
  <section class="left">
    <h1>Hello <br>World.</h1>
    <p>I WANT TO ···</p>
  </section>
  <section class="right">
    <h2>Register</h2>
    <p>Dont have an account? Create your account, it takes less than a minute</p>
    <form action="" class="login">
      <label>NAME <input type="text" name="username"></label>
      <label>EMAIL <input type="email" name="email"></label>
      <label>PASSWORD <input type="password" name="password"></label>
      <input type="submit" value="SIGN IN">
    </form>
    <div class="other">
      <p>Login with social media</p>
      <a href="javascript:;" class="qq"></a>
      <a href="javascript:;" class="wx"></a>
      <a href="javascript:;" class="wb"></a>
    </div>
  </section>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
  div#login {
    max-width: 1200px;
    display: flex;
    justify-content: center;
    background: #fff;
    margin: 0 auto;
    section.left {
    width: 601px;
    height: 864px;
    background: url(./../../static/images/register.jpeg);
  }
    section.right {
      margin-top: 86px;
      margin-left: 100px;
      h2 {
        font-weight: bold;
        font-size: 44px;
        color: #373634;
      }
  }
    form label {
      display: block;
      border-bottom: 1px solid #c4c4c4;
  }
    form input {
      border: none;
      background: none;
      padding: 50px 10px 10px;
    }
    input[type="submit"] {
      background: #fa1744;
      width: 176px;
      height: 48px;
      padding: 0;
      border-radius: 50px;
      box-shadow: 0 1px 8px 1px rgba(251, 24, 69,0.6);
      color: #fff;
      font-weight: bold;
      display: block;
      float: right;
    }
  }

</style>
