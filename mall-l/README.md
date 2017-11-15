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

6.
  * 使用svg做图标
  * 对请求的数据进行排序
  * 使用vue-infinite-load，对数据进行按需加载
  * 使用过滤功能，对价格进行筛选

#### 注意事项

1. 数据异步请求，注意请求数据的处理顺序

2. 事实上，数据库都会提供排序算法，但是对于同样的数据，每次排序都需要从数据获取数据，造成浪费，可以在前端对数据进行排序。节省http请求。
其实，关于排序还可以再优化，不应该直接对页面数据直接操作。应该新建一个排序之后的数组，赋值给页面数据。减少页面因每次交换位置后都要渲染。
商城等需要不断加载数据的功能，还是由后台排序比较好，因为每次得到的都可以是排好的。
*注意是深拷贝*

