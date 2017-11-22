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
            <li v-for="(goods,index) in goodsData">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn" @click="checkGoods(index)">
                    <svg class="icon icon-checked" v-show="goods.checked===1">
                      <use xlink:href="#icon-success"></use>
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
                      <a class="input-sub" @click="editProductNum('decrease',index)">-</a>
                      <span class="select-ipt">{{goods.productNum}}</span>
                      <a class="input-add" @click="editProductNum('increase',index)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{goods.salePrice * goods.productNum}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn" @click="delGoods(index)">
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
                  <span class="checkbox-btn item-check-btn" @click="selectAllGoods()">
                    <svg class="icon icon-checked">
                      <use xlink:href="#icon-success" v-show="checkedAllGoods"></use>
                    </svg>
                  </span>
                <span>Select all</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price">{{sumPrice}}</span>
            </div>
            <div class="btn-wrap">
              <a class="btn btn--red">Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :showModal="showDel" @closeModal="closeModal()">
      <svg slot="header" class="icon icon-tip" style="color:red;">
        <use xlink:href="#icon-tip"></use>
      </svg>
      <h1 slot="header">确认删除此商品？</h1>
      <a slot="footer" href="javascript:;" @click="closeModal()">取消</a>
      <a slot="footer" href="javascript:;" @click="confirmDel()">确认</a>
    </modal>
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
  import Modal from './../components/Modal.vue'

  export default {
    data() {
      return {
        goodsData: [],
        showDel:false,
        isChecked:false //是否选中
      }
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks,
      SvgIcon,
      Modal
    },
    mounted() {
      this.getGoodsList()
    },
    computed:{
      checkedAllGoods(){
        let _sum=0;
        this.goodsData.forEach(ele=>{
          if(ele.checked===1){
            _sum ++
          }
        })
        if(_sum===this.goodsData.length){
          return true
        }else {
          return false
        }
      },
      sumPrice(){
        let _sum=0
        this.goodsData.forEach(ele=>{
          if(ele.checked===1){
            _sum += ele.productNum*ele.salePrice
          }
        })
        return _sum
      }
    },
    methods: {
      getGoodsList() {
        let currentUser = this.$refs.currentUser.currentUser
        let query = new AV.Query('_User')
        query.get(currentUser.objectId).then(result=>{
          this.goodsData =  result.get('cartList')
        })
      },
      delGoods(index){
        this.index = index
        this.showDel = true

      },
      confirmDel(){
        this.goodsData.splice(this.index,1)
        this.editedSave()
      },
      editedSave(){
        this.currentUser = this.$refs.currentUser.currentUser
        let user = AV.Object.createWithoutData('_User', this.currentUser.objectId);

        let cartList = this.goodsData
        user.set('cartList',cartList)
        user.save().then(result=>{
          console.log('保存编辑商品成功')
          this.showDel = false
        },error=>{
          console.log('保存编辑商品失败')
        })
      },
      closeModal(){
        this.showDel = false
      },
      editProductNum(flag,index){
        if(flag==='increase'){
          this.goodsData[index].productNum ++
        }else{
          if(this.goodsData[index].productNum<=1) return
          this.goodsData[index].productNum --
        }
        this.editedSave()
      },
      checkGoods(index){
        //goods.checked = (goods.checked ===1) ? 0:1
        this.goodsData[index].checked = this.goodsData[index].checked===1 ? 0:1
        console.log(this.goodsData[index].checked)
        this.editedSave()
      },
      selectAllGoods(){
        if(this.goodsData.length===0){
          console.log('无商品')
          return
        }
        let _checked = false
        this.goodsData.forEach(ele=>{
          if(ele.checked===0){
            _checked=true
            ele.checked =1
          }
        })

        if(!_checked){
          this.goodsData.forEach(ele=>{
            if(ele.checked===1){
              _checked=false
              ele.checked =0
            }
          })
        }
        this.editedSave()
      }
    }
  }
</script>

<style>
  .item-check-btn .icon-checked {
    position: relative;
    /*display: none;*/
    width: 100%;
    height: 100%;
    fill: red;
    transform: scale(1.5);
    vertical-align: top;
  }
  svg.icon.icon-tip {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }

</style>
