# mall-l

> A Vue.js project

## Build Setup

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

#### Project process

1.

2.
  * 商品列表vue组件实现

3.
  * 实现node.js的http模块加载页面
  * 实现node做中间层，模拟请求
  * 搭建Express框架
  * 用ejs，修改jade模版引擎为html

4.
  * 了解MongonDB，由于由于构建比较复杂，之后再研究，继续使用本地数据文件提供数据
  * 学习leancloud做后端数据存储（存储用户名和用户数据）

#### start

  * start project
  > cd mall-l
  > node run dev ; pm2 build/dev-server.js

  * start express
  > cd server
  > node start ; pm2 bin/www
