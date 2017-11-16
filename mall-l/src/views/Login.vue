<template>
  <div id="wrap">
    <div class="contain">
      <input id="tabUp" class="tabUp" name="tab" type="radio" checked>
      <label class="tab" for="tabUp">注册</label>
      <input id="tabIn" class="tabIn" name="tab" type="radio">
      <label class="tab" for="tabIn">登录</label>
      <div class="formContain">
        <section class="signUp">
          <form name="signUp" action="signUp" method="POST">
            <div><label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱<input name="email" type="text"</label>
              <span name='emailError'></span>
            </div>
            <div><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码<input name="password" type="password"></label>
              <span name='passwordError'></span>
            </div>
            <div><label>确认密码<input name="confire_password" type="password"></label>
              <span name='confire_passwordError'></span>
            </div>
            <div><input type="submit" value="注册"></div>
            <div class="hr"></div>
            <div class="footLink">
              <label for="tabIn">已注册？</label>
            </div>
          </form>
        </section>
        <section class="login">
          <form name="login" action="login" method="POST">
            <div><label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱<input name="email" type="text"></label>
              <span name='emailError'></span>
            </div>
            <div><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码<input name="password" type="password"></label>
              <span name='passwordError'></span>
            </div>
            <div><input type="submit" value="登录"></div>
            <div class="hr"></div>
            <div class="footLink">
              <a href="#forget">忘记密码？</a>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import './../../static/css/login.css'
</script>

