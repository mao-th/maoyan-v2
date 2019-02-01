<template>
  <div id="loading-container">
    <div class="loading-content">
      <div class="loading-circle circle1"></div>
      <div class="loading-circle circle2"></div>
      <div class="loading-circle circle3"></div>
      <div class="loading-circle circle4"></div>
      <div class="loading-circle circle5"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mao-loading"
};
</script>

<style lang="scss" scoped>
#loading-container {
  position: fixed;
  top: px2rem(190);
  left: 50%;
  transform: translateX(-50%);
  width: px2rem(180);
  height: px2rem(180);
  .loading-content {
    height: 100%;
    text-align: center;
    .loading-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      // transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: px2rem(10);
      background-color: transparent;
      border: px2rem(10) solid #333;
      border-radius: 50%;
      &.circle1 {
        z-index: 2;
        width: px2rem(20);
        height: px2rem(20);
        animation: loading1 0.6s infinite alternate;
      }
      &.circle2 {
        z-index: 1;
        width: px2rem(60);
        height: px2rem(60);
        animation: loading1 1s infinite alternate;
      }
      &.circle3 {
        width: px2rem(100);
        height: px2rem(100);
        animation: loading1 1.4s infinite alternate;
      }
      &.circle4 {
        width: px2rem(140);
        height: px2rem(140);
        animation: loading1 1.8s infinite alternate;
      }
      &.circle5 {
        width: px2rem(180);
        height: px2rem(180);
        animation: loading1 2.2s infinite alternate;
      }
      @keyframes loading1 {
        0% {
          opacity: 0.6;
          transform: translate(-50%, -50%) scale(0);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
}
</style>
