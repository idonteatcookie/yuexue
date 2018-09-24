<template>
  <div class="yx-header">
    <img class="logo" src="../assets/yuexue.png" alt="">
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';
.yx-header {
  color: #fff;
  height: 50px;
  background-color: $themeColor;
  .logo {
    height: 26px;
    margin: 12px 32px;
  }
}
</style>
