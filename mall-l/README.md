# mall-l
Vue + Node.js + Leancloud打造购物商城

1. 利用Vue搭建页面
2. Node.js建立路由，运行代码
3. Leancloud的Baas（backend as a server）做后台和数据库

> A Vue.js project

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### start

  * start project
  > cd mall-l
  > node run dev ; pm2 build/dev-server.js

  * start express
  > cd server
  > node start ; pm2 bin/www

#### Project process

1.
  * Vue 回顾
2.
  * 商品列表vue组件实现

3.
  * 实现node.js的http模块加载页面
  * 实现node做中间层，模拟请求
  * 搭建Express框架
  * 用ejs，修改jade模版引擎为html

4.
  * 利用vue-lazyload插件实现数据的懒加载
  * 了解MongonDB，由于构建比较复杂，之后再研究。
  * 学习leancloud做后端数据存储（存储用户名和用户数据）

5.
  * 利用leancloud搭建后台数据库，实现数据库的增删改查

#### 注意事项

1. 数据异步请求，注意请求数据的处理顺序
