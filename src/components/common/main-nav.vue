<template>
  <div id="main-nav">
    <router-link to="/movie" tag="div" class="nav-item">
      <i class="iconfont icon-dianying"></i>
      <div class="nav-name">电影</div>
    </router-link>
    <router-link to="/cinema" tag="div" class="nav-item">
      <i class="iconfont icon-yingyuana"></i>
      <div class="nav-name">影院</div>
    </router-link>
    <router-link to="/login" tag="div" class="nav-item">
      <i class="iconfont icon-tubiaolunkuo-"></i>
      <div class="nav-name">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "main-nav"
};
</script>

<style lang="scss" scoped>
#main-nav {
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0; // 让外层元素宽度占满整个宽度，等效于 width:100%;
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #d8d8d8;
  color: $text-nav;
  background: #fff;
  .nav-item {
    height: px2rem(98);
    flex: 1;
    text-align: center;
    &.router-link-active {
      color: $btnColor;
    }
    .iconfont {
      display: inline-block;
      font-size: px2rem(44);
      line-height: px2rem(62);
    }
    .nav-name {
      font-size: px2rem(20);
    }
  }
}
</style>
