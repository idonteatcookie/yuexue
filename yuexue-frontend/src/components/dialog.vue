<template>
  <div class="dialog-wrapper">
    <div class="dialog-content">
      <header class="header">
        <slot name="header"></slot>
      </header>
      <main class="main">
        <slot></slot>
      </main>
      <footer class="footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  .dialog-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    .dialog-content {
      position: absolute;
      top: 20%;
      left: 10%;
      width: 80%;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 2px 0px #000;
      .main {
        padding: 10px 20px;
      }
      .footer {
        text-align: right;
        padding: 10px 20px;
      }
    }
  }
</style>
