<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot></slot>
      </nav>
    </div>
  </div>
</template>
<style>
  .nav-breadcrumb-wrap {
    position: fixed;
    top: 85px;
    width: 100%;
    z-index: 99999;
  }
</style>
