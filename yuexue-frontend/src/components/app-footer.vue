<template>
  <div class="app-footer">
    <router-link tag="div" class="tab-item" to="/homepage">
      <i class="iconfont icon-shouyefill tab-link"></i>
    </router-link>
    <router-link tag="div" class="tab-item" to="/order-list">
      <i class="iconfont icon-listview tab-link"></i>
    </router-link>
    <router-link tag="div" class="tab-item" to="/user-info">
      <i class="iconfont icon-gerenfill tab-link"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '../styles/variables.scss';
.app-footer {
  display: flex;
  height: 40px;
  background-color: $themeColor;
  .tab-item {
    flex: 1;
    text-align: center;
    line-height: 40px;
    .tab-link {
      color: #fff;
      font-size: 22px;
    }
    &.router-link-active {
      .tab-link {
        color: #ff8434;
      }
    }
  }
}
</style>
