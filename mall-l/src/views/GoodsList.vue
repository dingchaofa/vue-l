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
                    <a href="#"><img v-lazy="'static/images/'+goods.productImg" alt=""></a>
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
      this.getGoodsData()
    },
    mounted(){
      //this.getGoodsData()
    },
    methods:{
      getGoodsData(){
        axios('./goodsData').then(res=>{
          //console.log(res.data.goodsData)
          this.goodsData = res.data.goodsData
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
