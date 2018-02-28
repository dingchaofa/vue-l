## mall-m
对mall单页面程序，用webpack打造成多页面应用

#### 预览


#### 运行

1. git clone

2. npm i

3. npm run dev

#### 进度

1. 完成了首页，也就是goodsList页面的正常加载

#### 注意事项

1. 通过修改webpack的入口文件，才能构建多页面

2. 在webpack.base.conf.js中明明使用的是vue.js(完整版)，编译的时候却是运行时构建版本，暂时不得不使用vue的render函数渲染组件，而不是当作模版填充到页面。

3. 多页面之间的通信，不能使用vuex了，这里使用localStorage存储在本地获取。

4. 多页面应用主要就是webpack的入口文件的配置。