<template>
  <div class="yx-loading">
    <img src="../assets/loading.gif" alt="loading">
    <span>数据加载中...</span>
  </div>
</template>

export default {
}

<style lang="scss">
.yx-loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(225, 225, 225, 0.83);
  z-index: 10000;
  text-align: center;
  line-height: 1;
  img {
    display: block;
    margin: 200px auto 10px auto;
    width: 20px;
  }
  span {
    color: black;
    font-size: 12px;
  }
}
</style>
