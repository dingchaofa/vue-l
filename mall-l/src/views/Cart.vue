<template>
  <div class="container">
    <svg-icon></svg-icon>
    <page-header ref="currentUser"></page-header>
    <breaks>
      <span>My Cart</span>
    </breaks>
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>My Cart</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>Items</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Subtotal</li>
              <li>Edit</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="goods in goodsData">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn">
                    <svg class="icon icon-ok">
                      <use xlink:href="#icon-ok"></use>
                    </svg>
                  </a>
                </div>
                <div class="cart-item-pic">
                  <img :src="goods.productUrl">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{goods.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{goods.salePrice}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub">-</a>
                      <span class="select-ipt">{{goods.productNum}}</span>
                      <a class="input-add">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{goods.salePrice * goods.productNum}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn">
                    <svg class="icon icon-del" style="color:red;">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascipt:;">
                  <span class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                <span>Select all</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price">500</span>
            </div>
            <div class="btn-wrap">
              <a class="btn btn--red">Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import './../../static/css/checkout.css'

  import AV from 'leancloud-storage'

  import PageHeader from '@/components/PageHeader'
  import PageFooter from './../components/PageFooter'
  import Breaks from './../components/Breaks'
  import SvgIcon from './../components/SvgIcon.vue'

  export default {
    data() {
      return {
        goodsData: []
      }
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks,
      SvgIcon
    },
    mounted() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        let currentUser = this.$refs.currentUser.currentUser
        let query = new AV.Query('_User')
        query.get(currentUser.objectId).then(result=>{
          this.goodsData =  result.get('cartList')
        })
      }
    }
  }
</script>

<style>

</style>
