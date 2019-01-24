<template>
  <header id="head">
    <slot name="left"></slot>
    {{ title }}
  </header>
</template>

<script>
/**
 * title: 顶部标题
 * back: 返回按钮类名
 */
export default {
  name: "main-header",
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
#head {
  position: relative;
  line-height: px2rem(100);
  font-size: px2rem(36);
  font-weight: 500;
  background-color: #e54847;
  color: #fff;
  text-align: center;
  // 头部返回按钮样式
  .back {
    width: px2rem(45);
    line-height: px2rem(100);
    padding: 0 px2rem(30);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    &::before {
      content: "";
      display: inline-block;
      width: px2rem(32);
      height: px2rem(32);
      border-left: px2rem(4) solid #fff;
      border-top: px2rem(4) solid #fff;
      transform: rotateZ(-45deg);
    }
  }
}
</style>
