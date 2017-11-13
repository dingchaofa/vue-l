<template>
  <div>
    <page-header></page-header>
    <breaks>
      <span slot="goods1">Goods1</span>
      <span slot="goods2">Goods2</span>
    </breaks>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a @click="isFilter()" href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div :class="{'filterby-show':isShowFilter}" class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd @click="isPriceSelected ='All'">
                <a v-bind:class="{cur: isPriceSelected === 'All'}" href="javascript:void(0)">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter" @click="isPriceSelected =index">
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
                    <div class="price">{{goods.productPrice}}元</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" @click="closeHidden()" v-show="hidden"></div>
    <page-footer></page-footer>
  </div>
</template>
<script>
  import './../../static/css/base.css'
  import './../../static/css/checkout.css'
  import './../../static/css/login.css'
  import './../../static/css/product.css'

  import PageHeader from '@/components/PageHeader'
  import PageFooter from './../components/PageFooter'
  import Breaks from './../components/Breaks'
  import axios from 'axios'
  import AV from 'leancloud-storage'
  import initLeanCloud from './../../leancloud/initLeanCloud'


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
        isPriceSelected: 'All',
        isShowFilter: false,
        hidden:false
      }
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks
    },
    created(){
//      this.getGoodsData()
    },
    mounted(){
      this.getGoodsData()
    },
    methods:{
      getGoodsData(){

        //从leancloud获取数据
//        axios('./goodsData').then(res=>{
//          //console.log(res.data.goodsData)
//          this.goodsData = res.data.goodsData
//        })

        //从leancloud的goodsList对象获取数据
        var query = new AV.Query('goodsList'),
            _serverData = [],
            _this = this

        //query.greaterThanOrEqualTo('salePrice', 0); //不加这一句就是找到所有的对象
        query.find().then(function (results) { //注意异步请求，获取数据需要时间
          //console.log(results,'_serverData1')
          results.forEach((ele)=>{
            _serverData.push(ele._serverData)
          })

          //请求到数据之后再请求图片地址
          var queryFile = new AV.Query('_File'),
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
                }
              }
            })
            _this.goodsData = _serverData
            console.log(_serverData,'_serverData')

          }, function (error) {
            console.error(error,'error_file')
          })


        }, function (error) {
          console.error(error,'error')
        })


      },
      priceSelected(index){
        let l = arguments.length
        if(l===0){
          this.isPriceSelected = 'All'
          return
        }
        this.isPriceSelected = index
      },
      isFilter(){
        this.isShowFilter=!this.isShowFilter
        this.hidden = !this.hidden
      },
      closeHidden(index){
        this.isShowFilter=false
        this.hidden = false
      }
    }
  }
</script>
