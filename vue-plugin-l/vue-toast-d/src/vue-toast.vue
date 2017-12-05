<template>
    <section class="toast-container">
        <div class="toast">
            <span>hello toast {{msg}}</span>
        </div>
    </section>
</template>

<script>
  export default {
    data(){
      return {
        msg: 'message'
      }
    }
  }
</script>

<style lang="scss">
    .toast-container {
        position: absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .toast span {
            display: inline-block;
            padding:10px 20px;
            background: rgba(36, 214, 80, 0.42);;
            border-radius: 5px;
        }
    }
</style>