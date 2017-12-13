<template>
  <!-- process step -->
  <div class="check-step">
    <ul>
      <li :class="{cur:address}"><span>确认</span>地址</li>
      <li :class="{cur:order}"><span>查看</span>订单</li>
      <li :class="{cur:payment}"><span>支付</span>成功</li>
      <li :class="{cur:confirmation}"><span>订单</span>详情</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['address','order','payment','confirmation']
  }
</script>
