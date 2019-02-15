<template>
  <div id="mine-wrap">
    <!-- 顶部 -->
    <main-header title="我的"></main-header>
    <!-- 信息栏 -->
    <div class="header">
      <img
        src="https://img.meituan.net/maoyanuser/4be405f274fa8fca7358a9e579a8262411960.png"
        alt="头像"
      />
      <div class="name">{{ $store.state.username }}</div>
    </div>
    <!-- 订单栏 -->
    <div class="orders">
      <div class="title">我的订单</div>
      <div class="line"></div>
      <div class="list">
        <div class="item item-movie">
          <p>电影</p>
        </div>
        <div class="item item-store">
          <p>商城</p>
        </div>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="container">
      <div class="container-list">
        <div class="container-item">
          <div>在线观影</div>
          <i class="icon-jiantou"></i>
        </div>
        <div class="container-item">
          <div>优惠券</div>
          <i class="icon-jiantou"></i>
        </div>
        <div class="container-item">
          <div>折扣卡</div>
          <i class="icon-jiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
export default {
  name: "Mine",
  components: {
    mainHeader
  }
};
</script>

<style lang="scss" scoped>
#mine-wrap {
  height: 100%;
  background-color: #f3f3f3;
  .header {
    height: px2rem(300);
    background-image: url("http://s0.meituan.net/bs/file/?f=my-canary:deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png");
    text-align: center;
    img {
      margin-top: px2rem(60);
      width: px2rem(132);
      height: px2rem(132);
      border-radius: 50%;
      border: px2rem(6) solid #fff;
    }
    .name {
      margin-top: px2rem(14);
      font-size: px2rem(30);
      font-weight: 700;
      color: #fff;
    }
  }
  .orders {
    position: relative;
    background-color: #fff;
    margin-top: px2rem(20);
    color: #333;
    font-size: px2rem(30);
    text-align: center;
    .title {
      // margin塌陷 - 需要触发BFC
      display: inline-block;
      position: relative;
      z-index: 10;
      width: px2rem(160);
      background-color: #fff;
      margin-top: px2rem(26);
    }
    .line {
      position: absolute;
      top: px2rem(46);
      left: 50%;
      margin-left: px2rem(-160);
      width: px2rem(320);
      border: 1px solid #f5f5f5;
    }
    .list {
      padding: 0 px2rem(30);
      display: flex;
      justify-content: space-around;
      .item {
        margin-top: px2rem(36);
        width: 50%;
        height: px2rem(194);
        text-align: center;
        background-repeat: no-repeat;
        background-position: top;
        background-size: px2rem(84) auto;
        &.item-movie {
          background-image: url("http://s0.meituan.net/bs/file/?f=my-canary:deploy/dpmmweb/client/dpmmweb/component/mycenter/img/movie.png");
        }
        &.item-store {
          background-image: url("http://s0.meituan.net/bs/file/?f=my-canary:deploy/dpmmweb/client/dpmmweb/component/mycenter/img/store.png");
        }
        p {
          position: relative;
          top: px2rem(106);
        }
      }
    }
  }
  .container {
    margin-top: px2rem(20);
    background-color: #fff;
    font-size: px2rem(30);
    color: #333;
    .container-list {
      padding: 0 px2rem(30);
      border-bottom: px2rem(1) solid #dcdcdc;
      .container-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(88);
        line-height: px2rem(88);
        border-bottom: px2rem(1) solid #dcdcdc;
        &:last-child {
          border-bottom: 0 none;
        }
        .icon-jiantou {
          display: inline-block;
          width: px2rem(18);
          height: px2rem(18);
          border-top: px2rem(2) solid #dcdcdc;
          border-right: px2rem(2) solid #dcdcdc;
          transform: rotateZ(45deg);
        }
      }
    }
  }
}
</style>
