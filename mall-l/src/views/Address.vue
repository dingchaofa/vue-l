<template>
  <div class="checkout-page">
    <svg-icon></svg-icon>
    <page-header ref="currentUser"></page-header>
    <breaks>
      <span>配送地址</span>
    </breaks>
    <div class="container margin-header">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>订单</span></h2>
        </div>
        <!-- process step -->
        <shipping-process :address="true"></shipping-process>

        <!-- address list -->
        <div class="page-title-normal checkout-title">
          <h2><span>收货地址</span></h2>
        </div>
        <div class="addr-list-wrap">
          <div class="addr-list">
            <ul>
              <li v-for="(address,index) in addressListDisplay" :class="{checkedAddress : checkedAddress===index}" @click="checkedAddress=index">
                <svg @click="editAddress(index)" class="icon icon-edit"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-edit"></use></svg>
                <dl>
                  <dt>收件人姓名：{{address.name}}</dt>
                  <dd class="tel">收件人电话：{{address.tel}}</dd>
                  <dd class="address">收件人地址：{{address.address}}</dd>
                </dl>
                <div class="addr-opration addr-del">
                  <a href="javascript:;" class="addr-del-btn" @click="delAddress(index)">
                    <svg class="icon icon-del"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-del"></use></svg>
                  </a>
                </div>
                <div class="addr-opration addr-default" v-if="address.isDefault===true">默认地址</div>
                <div class="addr-opration" display-none="addr-set-default" v-else>
                  <a href="javascript:;" class="addr-set-default-btn" @click="setDefaultAddress(index)"><i>设为默认地址</i></a>
                </div>
              </li>
              <li class="addr-new" @click="addAddress=true">
                <div class="add-new-inner">
                  <i class="icon-add">
                    <svg class="icon icon-add"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add"></use></svg>
                  </i>
                  <p>新增收货地址</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="shipping-addr-more">
            <a class="addr-more-btn up-down-btn" href="javascript:;" :class="{open:displayNum>3}" @click="moreAddress()">
              more
              <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
              </i>
            </a>
          </div>
        </div>

        <!-- shipping method-->
        <div class="page-title-normal checkout-title">
          <h2><span>配送方式</span></h2>
        </div>
        <div class="lemall-msg-info hidden">
          <span>普通配送快递 邮费10元</span>
        </div>
        <div class="shipping-method-wrap">
          <div class="shipping-method">
            <ul>
              <li class="check">
                <div class="name">普通配送</div>
                <div class="price">免费配送</div>
                <div class="shipping-tips">
                  <p>一旦发货，宝贝将在7个工作日内到达</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="next-btn-wrap">
          <a class="btn btn--m" :class="[(checkedAddress==='')?'btn--dis':'btn--red']" @click="next()">下一步</a>
        </div>
      </div>
    </div>
    <modal class="add-address" :showModal="addAddress" @closeModal="closeModal()">
      <h3 slot="header">请填写地址信息</h3>
      <div class="address-info" slot="main">
        <label>收货人姓名 <input v-model="sendeeName" type="text"></label>
        <label>手&nbsp机&nbsp号&nbsp码<input v-model="sendeeTel" type="text"></label>
        <label>详&nbsp细&nbsp地&nbsp址<input v-model="sendeeAddress" type="text"></label>
        <label v-if="!isExistAddress"><input v-model="isNewDefault" type="checkbox">设置为默认地址</label>
        <p v-else>{{hint_info}}</p>
      </div>
      <div slot="footer">
        <a href="javascript:;" @click="closeModal()">取消</a>
        <a href="javascript:;" @click="confirmAddress()">确认</a>
      </div>
    </modal>
    <modal :showModal="delAddressMd" @closeModal="closeModal()">
      <svg slot="header" class="icon icon-tip" fill="red">
        <use xlink:href="#icon-tip"></use>
      </svg>
      <h1 slot="header">确认删除此地址？</h1>
      <a slot="footer" href="javascript:;" @click="closeModal()">取消</a>
      <a slot="footer" href="javascript:;" @click="confirmDelAddress()">确认</a>
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
  import SvgIcon from './../components/SvgIcon'
  import Modal from './../components/Modal'
  import ShippingProcess from './../components/ShippingProcess'

  export default {
    data() {
      return {
        addAddress:false,
        sendeeName:'',
        sendeeTel:'',
        sendeeAddress:'',
        isNewDefault:'',
        addressList:[],
        displayNum:3,
        isExistAddress:false,
        hint_info: '该地址已存在，请添加新地址',
        delAddressMd:false,
        checkedAddress:''
      }
    },
    computed:{
      addressListDisplay(){
        return this.addressList.slice(0,this.displayNum) //展开的地址的条数
      }
    },
    mounted(){
      this.getAddressList()
    },
    components: {
      PageHeader,
      PageFooter,
      Breaks,
      SvgIcon,
      Modal,
      ShippingProcess
    },
    methods:{
      closeModal(){
        this.addAddress = false
        this.delAddressMd = false
      },
      getAddressList() {
        this.currentUser = this.$refs.currentUser.currentUser
        let query = new AV.Query('_User')
        query.get(this.currentUser.objectId).then(result=>{
          this.addressList =  result.get('addressList')
          console.log('从leancloud获取地址列表数据')
        },err=>{
          console.log('获取地址列表出错',err)
        })
      },
      saveAddress(){
        let user = AV.Object.createWithoutData('_User', this.currentUser.objectId);

        let addressList = this.addressList
        user.set('addressList',addressList)
        user.save().then(result=>{
          console.log('保存地址成功')
          //this.showDel = false
        },error=>{
          console.log('保存地址失败')
        })
      },
      confirmAddress(){

        let _address = {}
        _address.name = this.sendeeName
        _address.tel = this.sendeeTel
        _address.address = this.sendeeAddress
        _address.isDefault = this.isNewDefault || false

        if(this.sendeeName==='' || this.sendeeTel === '' || this.sendeeAddress=== ''){
          this.isExistAddress = true
          this.hint_info = '信息不能为空'
          return
        }else{
          this.isExistAddress = false
        }


        //如果存在相同的收件人姓名电话和地址，则不能添加为新的地址
        for(let i=0;i<this.addressList.length;i++){
          if(this.addressList[i].name===_address.name && this.addressList[i].tel===_address.tel && this.addressList[i].address=== _address.address){
            this.isExistAddress = true
            this.hint_info = '该地址已存在，请添加新地址'
            break
          }
        }

        if(this.isExistAddress){
          return
        }

        if(_address.isDefault){
          this.setDefaultAddress()
        }

        if(this.displayNum===this.addressList.length){
          this.displayNum ++
        }
        this.addressList.push(_address)
        this.saveAddress()
        this.addAddress = false
      },
      moreAddress(){
        this.displayNum = this.displayNum>3 ? 3 : this.addressList.length
      },
      editAddress(index){
        this.isExistAddress = false
        this.sendeeName = this.addressListDisplay[index].name
        this.sendeeTel = this.addressListDisplay[index].tel
        this.sendeeAddress = this.addressListDisplay[index].address
        this.isNewDefault = this.addressListDisplay[index].isDefault
        this.addAddress = true
      },
      delAddress(index){
        this.delAddressMd = true
        this.index = index
      },
      confirmDelAddress(){
        this.delAddressMd = false
        this.addressList.splice(this.index,1)
        this.saveAddress()
      },
      setDefaultAddress(index){
        this.addressList.forEach(ele=>{
          ele.isDefault = false
        })
        console.log(index)
        if(arguments.length){
          this.addressList[index].isDefault = true
        }
      },
      next(){

        if(this.checkedAddress===""){
          return
        }
        //console.log(this.$router)
        this.$router.push({
          path:'/orderList',
          query:{
            checkedAddress:this.checkedAddress
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .checkout-addr {
    margin-top: 150px;
  }
  .add-address{
    color: #e61d29;
    .md-content {
      padding-top:20px;
      height: 40%!important;
    }
    label{
      display: block;
    }
    input {
      border: none;
      border-bottom: 1px solid red;
      margin-left: 30px;
      vertical-align: bottom;
      padding: 5px;
      margin-top: 20px;
    }
    input[type="checkbox"] {
      vertical-align: inherit;
      margin-left: 5em;
      margin-top: 2.5em;
      margin-right: 0.5em;
    }
    p {
      text-align: center;
      margin-top: 2em;
    }
  }
  svg.icon.icon-edit {
    width: 20px;
    height: 20px;
    float: right;
  }
  .checkedAddress {
    border-color: #ee7a23!important;
  }
</style>
