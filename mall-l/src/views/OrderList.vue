<template>
  <div class="container">
    <svg-icon></svg-icon>
    <page-header ref="currentUser"></page-header>
    <breaks>
      <span>配送地址</span>
    </breaks>
    <div class="checkout-order margin-header">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>确认订单信息</span></h2>
      </div>
      <!-- process step -->
      <shipping-process :address="true" :order="true"></shipping-process>

      <!-- order list -->
      <div class="page-title-normal checkout-title">
        <h2><span>订单详情</span></h2>
      </div>
      <div class="item-list-wrap confirm-item-list-wrap">
        <div class="cart-item order-item">
          <div class="cart-item-head">
            <ul>
              <li>商品信息</li>
              <li>单价</li>
              <li>数量</li>
              <li>金额</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="(order,index) in orderList">
              <div class="cart-tab-1">
                <div class="cart-item-pic">
                  <img :src="order.productUrl" alt="">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{order.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{order.salePrice | currency('¥')}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self">
                    <div class="select-self-area">
                      <span class="select-ipt">×{{order.productNum}}</span>
                    </div>
                  </div>
                  <div class="item-stock item-stock-no">有货</div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{order.productNum*order.salePrice | currency('¥')}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Price count -->
      <div class="price-count-wrap">
        <dl class="address-wrap">
          <dt>收件人姓名：{{address.name}}</dt>
          <dd>收件人电话：{{address.tel}}</dd>
          <dd>收件人地址：{{address.address}}</dd>
        </dl>
        <div class="price-count">
          <ul>
            <li>
              <span>订单金额:</span>
              <span>{{orderMoney | currency('¥')}}</span>
            </li>
            <li>
              <span>配送费:</span>
              <span>¥10</span>
            </li>
            <li>
              <span>折扣:</span>
              <span>¥0</span>
            </li>
            <li class="order-total-price">
              <span>总金额:</span>
              <span>{{orderSumMoney | currency('¥')}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="order-foot-wrap">
        <div class="prev-btn-wrap">
          <!--<button class="btn btn&#45;&#45;m">返回</button>-->
        </div>
        <div class="next-btn-wrap">
          <button class="btn btn--m btn--dis">去支付</button>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import AV from 'leancloud-storage'
  import PageHeader from '@/components/PageHeader'
  import PageFooter from './../components/PageFooter'
  import Breaks from './../components/Breaks'
  import SvgIcon from './../components/SvgIcon'
  import Modal from './../components/Modal'
  import ShippingProcess from './../components/ShippingProcess'
  import bus from '@/../static/js/bus'
  export default {
    data(){
      return {
        orderList:[],
        orderMoney:0,
        postage:10,
        discount:0,
        address:{}
      }
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks,
      SvgIcon,
      Modal,
      ShippingProcess
    },
    computed:{
      orderSumMoney(){
       return this.orderMoney+this.postage+this.discount
      }
    },
    mounted(){
      this.getOrderList()
    },
    methods:{
      getOrderList(){
        let index = this.$router.currentRoute.query.checkedAddress
        this.currentUser = this.$refs.currentUser.currentUser
        let query = new AV.Query('_User')
        query.get(this.currentUser.objectId).then(result=>{
          this.cartList =  result.get('cartList')
          this.orderList = this.cartList.filter(ele=>{
            if(ele.checked===1){
              this.orderMoney +=ele.salePrice*ele.productNum
              return true
            }
          })
          let addressList =  result.get('addressList') //获取选中的地址
          this.address = addressList[index]

          console.log(this.address)
          console.log('从leancloud获取购物车选中的列表数据')
        },err=>{
          console.log('获取地址列表出错',err)
        })
      }
    }
  }
</script>

<style>
  dl.address-wrap {
    max-width: 250px;
    padding: 10px 0 0 10px;
    font-size: 18px;
    color: #999;
  }
  dl.address-wrap dd {
    margin-top:10px;
  }
</style>
