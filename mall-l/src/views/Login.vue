<template>
  <div id="body">
  <div id="wrap">
    <div class="contain">
      <input id="tabUp" class="tabUp" name="tab" type="radio" checked>
      <label class="tab" for="tabUp">注册</label>
      <input id="tabIn" class="tabIn" name="tab" type="radio">
      <label class="tab" for="tabIn">登录</label>
      <div class="formContain">
        <section class="signUp">
          <form name="signUp">
            <div><label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名<input v-model="username" name="username" type="text"></label>
              <span class='nameError'>{{nameError}}</span>
            </div>
            <div><label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱<input v-model="email" name="email" type="email"></label>
              <span class='emailError'>{{emailError}}</span>
            </div>
            <div><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码<input v-model="password"  name="password" type="password"></label>
              <span class='passwordError'>{{passwordError}}</span>
            </div>
            <div><label>确认密码<input name="confire_password" type="password"></label>
              <span class='confire_passwordError'>{{confire_passwordError}}</span>
            </div>
            <div><input @click.prevent="signUp()" type="submit" value="注册"></div>
            <div class="hr"></div>
            <div class="footLink">
              <label for="tabIn">已注册？</label>
            </div>
          </form>
        </section>
        <section class="login">
          <form name="login">
            <div><label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名<input v-model="username" name="username" type="text"></label>
              <span class='nameError'>{{nameError}}</span>
            </div>
            <div><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码<input v-model="password" name="password" type="password"></label>
              <span class='passwordError'>{{passwordError}}</span>
            </div>
            <div><input @click.prevent="login()" type="submit" value="登录"></div>
            <div class="hr"></div>
            <div class="footLink">
              <a href="#forget">忘记密码？</a>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
  #body {
    width:100vw;
    height:100vh;
    margin: 0;
    color: rgba(243, 181, 155, 0.63)!important;
    background: #c8c8c8;
    font: 600 16px/18px 'Open Sans',sans-serif;
    background: url("./../../static/images/color.jpeg")!important;
  }
</style>

<script>
import './../../static/css/login.css'

import AV from 'leancloud-storage'

  export default {
    data(){
      return {
        username: '',
        email:'',
        password: '',
        nameError:'',
        emailError:'',
        passwordError:'',
        confire_passwordError:''
      }
    },
    methods:{
      checkForm(isEmail){ //根据参数，判断是否检查邮箱
        let username,password,email

        username = /.{2,}/.test(this.username)
        password = /\w{4,}/.test(this.password)

        if(!arguments[0]){
          email = /\w+@\w+\.\w+/.test(this.email)
        }

        if(!username){
          this.nameError = '请输入正确的姓名'
          return false
        }
        if(email===false){ //由于登陆的时候不需要输入邮箱
          this.emailError = '请输入正确的邮箱'
          return false
        }

        if(!password){
          this.passwordError = '请输入4位及以上，数字、字母、下划线'
          return false
        }
        return true
      },
      signUp(){
        let checkResult = this.checkForm()
        if(!checkResult){
          return
        }

        let user = new AV.User()
        user.setUsername(this.username)
        user.setPassword(this.password)
        user.setEmail(this.email)
        user.signUp().then((loginedUser)=>{
          document.location.hash = '#/goodslist'
          console.log('loginedUser sign up',loginedUser)

        },(err)=>{
          console.log('err',err)
          if(err.code===125){
            this.emailError = '请输入有效的邮箱'
          }
          if(err.code===202){
            this.nameError = '用户名已经被注册'
          }
        })
      },
      login(){
        let checkResult = this.checkForm('email')
        if(!checkResult){
          return
        }

        AV.User.logIn(this.username, this.password).then(function (loginedUser) {
          console.log('loginedUser login',loginedUser);
          document.location.hash = '#/goodslist'
        }, (err)=>{
          console.log('err',err)
          if(err.code===210){
            console.log('err2')
            this.passwordError = '用户名密码不匹配'
          }
          if(err.code===211){
            this.nameError = '用户不存在'
          }
        });
      }
    }
  }
</script>

