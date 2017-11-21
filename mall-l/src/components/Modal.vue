<template>
<div id="modal" v-show="showModal">
  <div class="md-mask" @click.self="closeModal()">
    <div class="md-content">
      <div class="md-header">
        <slot name="header"></slot>
      </div>
      <div class="md-main">
        <slot name="main"></slot>
      </div>
      <div class="md-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import SvgIcon from './../components/SvgIcon.vue'
  export default {
    props:['showModal'],
    data(){
      return {
      }
    },
    components:{
      SvgIcon
    },
    methods:{
      closeModal(){
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>
  #modal {
    position: fixed;
    z-index: 999999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .md-mask {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
  }
  .md-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 20%;
    background: #fff;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .md-header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  svg.icon.icon-success {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
  .md-footer {
    margin-top: 42px;
  }
  .md-footer a {
    border: 1px solid red;
    padding: 8px 50px;
    margin: 8px;
  }
</style>
