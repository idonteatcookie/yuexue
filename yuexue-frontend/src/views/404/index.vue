<template>
  <div class="not-found">
    <div class="img">
      <img src="../../assets/404.png">
    </div>
    <p>你好像迷路了QAQ</p>
    <p class="go-home"><router-link to="/homepage">回首页</router-link></p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .not-found {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    margin: 0;
    z-index: 10;
    padding: 10%;
    text-align: center;
    p {
      line-height: 50px;
    }
    .go-home a {
      text-decoration: underline;
      color: coral;
    }
  }
</style>
