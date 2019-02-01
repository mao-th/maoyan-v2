<template>
  <div id="loading-container">
    <div class="loading-content">
      <div class="loading-circle circle1"></div>
      <div class="loading-circle circle2"></div>
      <div class="loading-circle circle3"></div>
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
      background-color: $btnColor;
      border-radius: 50%;
      box-sizing: border-box;
      padding: px2rem(10);
      // 动画属性:
      //  1.第一个参数： 动画的名字
      //  2.第二个参数： 动画持续的时间
      //  3.第三个参数： 动画速度曲线 - 运动规律
      //  4.第四个参数： 动画开始之前的延迟时间
      //  5.第五个参数： 动画播放的次数
      //  6.第六个参数： 动画是否需要轮流反向播放
      // animation: loading1 1s infinite ease-in-out;
      &.circle1 {
        z-index: 2;
        width: px2rem(80);
        height: px2rem(80);
        &::after {
          content: "";
          display: inline-block;
          border-radius: 50%;
          width: px2rem(60);
          height: px2rem(60);
          background-color: #fff;
        }
        animation: loading1 0.6s infinite ease-in-out;
      }
      &.circle2 {
        z-index: 1;
        width: px2rem(120);
        height: px2rem(120);
        &::after {
          content: "";
          display: inline-block;
          border-radius: 50%;
          width: px2rem(100);
          height: px2rem(100);
          background-color: #fff;
        }
        animation: loading1 1.2s infinite ease-in-out;
      }
      &.circle3 {
        width: px2rem(160);
        height: px2rem(160);
        &::after {
          content: "";
          display: inline-block;
          border-radius: 50%;
          width: px2rem(140);
          height: px2rem(140);
          background-color: #fff;
        }
        animation: loading1 2.4s infinite ease-in-out;
      }
      @keyframes loading1 {
        0% {
          opacity: 0.8;
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
