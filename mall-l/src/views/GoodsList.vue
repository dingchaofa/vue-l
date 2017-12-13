<template>
  <div>
    <svg-icon></svg-icon>
    <page-header></page-header>
    <breaks>
      <span>GoodsList</span>
    </breaks>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortPrice()" href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use :xlink:href="priceTopOrDown?'#icon-arrow-top':'#icon-arrow-down'"></use>
            </svg>
          </a>
          <a @click="isFilter()" href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div :class="{'filterby-show':isShowFilter}" class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd @click="setPriceFilter('All')">
                <a v-bind:class="{cur: isPriceSelected === 'All'}" href="javascript:void(0)">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)">
                <a @click="closeHidden(index)" v-bind:class="{cur:isPriceSelected===index}" href="javascript:void(0)">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="goods in goodsData">
                  <div class="pic">
                    <a href="#"><img v-lazy="goods.productUrl" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.productName}}</div>
                    <div class="price">{{goods.salePrice}}元</div>
                    <div class="btn-area">
                      <a href="javascript:;" @click="addCart(goods)" class="btn btn--m">加入购物车</a>
                      <!--<div class="fly-to-cart">-->
                        <!--<img :src="goods.productUrl" alt="">-->
                      <!--</div>-->
                    </div>
                  </div>
                </li>
                <infinite-loading :distance=20 @infinite="infiniteHandler" ref="infiniteLoading">
                  <span slot="no-more">
                    我是有底线滴···
                  </span>
                </infinite-loading>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" @click="closeHidden()" v-show="hidden"></div>
    <page-footer></page-footer>
    <modal :showModal="showCartModal" @closeModal="closeModal()">
      <svg slot="header" class="icon icon-success">
        <use xlink:href="#icon-success"></use>
      </svg>
      <h1 slot="header">加入购物车成功</h1>
      <router-link slot="footer" to="/cart">查看购物车</router-link>
      <a slot="footer" href="javascript:;" @click="closeModal()">继续购物</a>
    </modal>
    <modal :showModal="showLoginModal" @closeModal="closeModal()">
      <h1 slot="header">未登录，无法加入购物车</h1>
      <!--<a slot="footer" href="javascript:;" ></a>-->
      <router-link slot="footer" to="/login">去登录</router-link>
      <a slot="footer" href="javascript:;" @click="closeModal()">关闭</a>
    </modal>
    <!--<modal :showModal="!this.currentUser.username">-->
      <!--<svg slot="header" class="icon icon-tip" style="color:red;">-->
        <!--<use xlink:href="#icon-tip"></use>-->
      <!--</svg>-->
      <!--<h1 slot="header">您还未登录，请登录</h1>-->
      <!--<router-link slot="footer" to="/login">登录</router-link>-->
    <!--</modal>-->
  </div>
</template>

<style>
  .fly-to-cart{
    /*display: none;*/
    position: fixed;
  }
  .fly-to-cart img{
    width:50px;
    border-radius:50%;
    position: relative;
    top: -40px;
    left: 40px;
  }
  .fly-to-cart-animation {
    animation:fly-to-cart-animation 1s ease-out;
  }
  @keyframes fly-to-cart-animation {
    /* 暂时不会操作DOM，故而取消 */
  }
</style>

<script>
  import './../../static/css/login.css'
  import './../../static/css/product.css'

  import PageHeader from '@/components/PageHeader'
  import PageFooter from './../components/PageFooter'
  import Breaks from './../components/Breaks'
  import SvgIcon from './../components/SvgIcon.vue'
  import axios from 'axios'
  import AV from 'leancloud-storage'
  import initLeanCloud from './../../leancloud/initLeanCloud'
  import InfiniteLoading from 'vue-infinite-loading';
  import Modal from './../components/Modal.vue'

  ;//创建一个全局变量

  export default {
    data() {
      return {
        goodsData:[],
        priceFilter:[
          {
            startPrice:0,
            endPrice:100
          },
          {
            startPrice:100,
            endPrice: 500
          },
          {
            startPrice:500,
            endPrice: 1000
          },
          {
            startPrice:1000,
            endPrice: 3000
          }
        ],
        isPriceSelected: 'All', //过滤价格
        isShowFilter: false, //是否显示过滤价格
        hidden:false,
        priceTopOrDown:true, //按价格排序
        skip:0, //跳过多少条数据加载
        getDataNum:6, //每次请求获取多少条数据
        isDataLoaded:true, //利用懒加载加载更能多，作滚动请求频率限制，在数据未到之前禁止请求
        showCartModal:false, //加入购物车模态框
        showLoginModal:false //提示登录模态框
      }
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks,
      InfiniteLoading,
      SvgIcon,
      Modal
    },
    computed:{
      currentUser(){
        console.log('goodslist',this.$store.state.currentUser)
        return this.$store.state.currentUser
      }
    },
    created(){

    },
    mounted(){

      this.getGoodsData()
    },
    methods:{
      getGoodsData($state){

        //从leancloud获取数据
//        axios('./goodsData').then(res=>{
//          //console.log(res.data.goodsData)
//          this.goodsData = res.data.goodsData
//        })

        //从leancloud的goodsList对象获取数据
          let query = new AV.Query('goodsList')
          let _serverData = [],
            _this = this

//        if(false){ //每次请求同样的资源，由服务器排序造成请求浪费，可在本地进行排序
//          if(this.priceTopOrDown){
//            query.ascending('salePrice') //对价格进行生序，请求的数据价格是上升的。
//          } else{
//            query.descending('salePrice') //对价格进行生序，请求的数据价格是上升的。
//          }
//        }

        //query.greaterThanOrEqualTo('salePrice', 100); //比较查询

        if(this.isPriceSelected !== 'All'){
          let startQueryPrice = new AV.Query('goodsList'),
              endQueryPrice = new AV.Query('goodsList')
          switch (this.isPriceSelected){
            case 0:
              query.lessThan('salePrice',100)
              break
            case 1:
              startQueryPrice.greaterThanOrEqualTo('salePrice',100);
              endQueryPrice.lessThan('salePrice',500)
              query = AV.Query.and(startQueryPrice,endQueryPrice)
              break
            case 2:
              startQueryPrice.greaterThanOrEqualTo('salePrice',500);
              endQueryPrice.lessThan('salePrice',1000)
              query = AV.Query.and(startQueryPrice,endQueryPrice)
              break
            case 3:
              startQueryPrice.greaterThanOrEqualTo('salePrice',1000);
              endQueryPrice.lessThan('salePrice',3000)
              query = AV.Query.and(startQueryPrice,endQueryPrice)
              break
          }
        }

        query.limit(this.getDataNum);// 最多返回 getDataNum 条结果
        query.skip(this.skip)
        this.skip += this.getDataNum

        query.find().then(function (results) { //注意异步请求，获取数据需要时间
          //console.log(results,'_serverData1')
          results.forEach((ele,index)=>{
            _serverData.push(ele._serverData) //由于_serverData带有不需要的数据，故而需要创建一个新的对象，把需要的数据传进去
            _serverData[index].objectId = ele.id //把服务器创建的objectId添加进去
          })
          //console.log('_serverData',_serverData)
          //请求到数据之后再请求图片地址
          let queryFile = new AV.Query('_File'), //每次都会请求同样的数据，没有作数据关联
            queryImage = []

          queryFile.find().then(function (fileInfo) { //查询图片

            fileInfo.forEach((ele,index)=>{
              queryImage[index] = {}
              queryImage[index].name = ele._serverData.name
              queryImage[index].url = ele._serverData.url
            })

            //把相对应的图片的URL赋给_serverData，以便能在页面里加载图片的URL
            _serverData.forEach((ele)=>{
              for(var i=0;i<queryImage.length;i++){
                if(ele.productImage===queryImage[i].name){
                  ele.productUrl = queryImage[i].url
                  break //如果查到了就不要继续遍历了
                }
              }
            })

           _this.goodsData =_this.goodsData.concat(_serverData)
            $state.loaded()
            if(_serverData.length<_this.getDataNum){//最后一道请求了。但是当相等时，就不会禁止
              $state.complete();
              console.log('completed1')
            }
            if(_serverData.length === 0) {
              $state.complete()
              console.log('completed2')
            }
          }, function (error) {
            console.error(error,'error_file')
          })
        }, function (error) {
          console.error(error,'error')
        })
      },
      isFilter(){
        this.isShowFilter=!this.isShowFilter
        this.hidden = !this.hidden
      },
      closeHidden(index){
        this.isShowFilter=false
        this.hidden = false
      },
      sortPrice(){//对价格进行排序
        this.priceTopOrDown=!this.priceTopOrDown
        let _goodsData =JSON.parse(JSON.stringify(this.goodsData)) //深拷贝，但是不需要复制原型上的数值，把排序之后的数据，再赋值给页面数据，减少因每次交换位置，页面渲染性能开销

        if(this.priceTopOrDown){
          for(let i=0;i<_goodsData.length;i++){ //价格由小到大排序

            for(let j=0;j<_goodsData.length-1-i;j++){

              if(_goodsData[j].salePrice>_goodsData[j+1].salePrice) {
                let temp = _goodsData[j]
                _goodsData[j] = _goodsData[j+ 1]
                _goodsData[j+ 1] = temp
              }
            }
          }
          this.goodsData = _goodsData
        }else{
          for(let i=0;i<_goodsData.length;i++){ //价格由大到小排序

            for(let j=0;j<_goodsData.length-1-i;j++){

              if(_goodsData[j].salePrice<_goodsData[j+1].salePrice) {
                let temp = _goodsData[j]
                _goodsData[j] = _goodsData[j+ 1]
                _goodsData[j+ 1] = temp
              }
            }
          }
          this.goodsData = _goodsData
        }
      },
      infiniteHandler($state){ //懒加载加载更多

        if(this.currentUser.username){
          this.getGoodsData($state)
        }
      },
      setPriceFilter(index){
        this.isPriceSelected = index
        this.skip = 0
        this.goodsData = []
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        this.getGoodsData()
      },
      addCart(goods){
        let currentUser = this.$store.state.currentUser
        //console.log(currentUser)
        if(currentUser.username){//如果登录了
          //查找购物车里是否有这个商品
          //根据商品的objectId，来查询购物车是否有这个商品，如果有就+1，如果没有就添加
          let query = new AV.Query('_User')

          query.get(currentUser.objectId).then(result=>{
            //console.log('result',result)
            let cartList =  result.get('cartList')
            let user = AV.Object.createWithoutData('_User', currentUser.objectId);
            let isGoods = false
            for (let i=0;i<cartList.length;i++){
              if(cartList[i].objectId===goods.objectId){
                cartList[i].productNum ++
                user.set('cartList',cartList)
                user.save().then((result=>{
                  //console.log('保存成功返回的结果',result)
                  this.showCartModal = true
                }),(err)=>{
                  console.log('保存失败',err)
                })
                isGoods = true
                break
              }
            }

            if(!isGoods){//如果遍历完成之后没有找到，就新加
              goods.productNum = 1 //新添加的时候为1
              goods.checked = 0
              //console.log('goods',goods)
              user.addUnique('cartList',goods)
              user.save().then((result=>{
                //console.log('保存成功返回的结果',result)
                this.showCartModal = true
              }),(err)=>{
                console.log('保存失败',err)
              })
            }
          },(err)=>{
            console.log('查询失败',err)
          })

        }else{
          this.showLoginModal = true
        }
      },
      closeModal(){
        this.showCartModal = false
        this.showLoginModal = false
      }
    }
  }
</script>
