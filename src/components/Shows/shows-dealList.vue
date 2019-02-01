<template>
  <div id="deal-list-wrap">
    <div class="deal-title">影院超值套餐</div>
    <div class="deal-list">
      <div class="deal-item" v-for="(item, index) in dealsList" :key="index">
        <div class="deal-img">
          <img :src="item.imageUrl | filterImg" alt="套餐图片">
        </div>
        <div class="deal-info">
          <div class="info-title">
            <span v-if="item.recommendPersonNum === 1">单人</span>
            <span v-else-if="item.recommendPersonNum === 2">双人</span>
            <span v-else>多人</span>
            <span v-text="item.title"></span>
          </div>
          <div class="info-message">
            <div class="price">
              <span>¥</span>
              <span class="price-num" v-text="item.price"></span>
            </div>
            <div class="message">
              <div class="sell-num" v-text="item.curNumberDesc"></div>
              <div class="btn">去购买</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shows-dealList",
  props: {
    dealList: Object
  },
  computed: {
    dealsList() {
      return this.dealList.dealList || [];
    }
  },
  filters: {
    filterImg(imgUrl) {
      return imgUrl.replace("/w.h", "/440.0");
    }
  }
};
</script>

<style lang="scss" scoped>
#deal-list-wrap {
  font-size: px2rem(28);
  background-color: #fff;
  .deal-title {
    font-size: px2rem(30);
    color: #666;
    margin-left: px2rem(30);
    line-height: px2rem(90);
  }
  .deal-list {
    margin-left: px2rem(30);
    .deal-item {
      display: flex;
      padding: px2rem(26) 0;
      border-top: px2rem(1) solid #e5e5e5;
      .deal-img {
        width: px2rem(184);
        height: px2rem(184);
        img {
          width: px2rem(184);
          height: px2rem(184);
        }
      }
      .deal-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: px2rem(20);
        margin-right: px2rem(30);
        min-width: 0;
        .info-title {
          color: #333;
          line-height: px2rem(36);
          @include ellipsis();
          & > span:first-child {
            background-color: #f90;
            font-size: px2rem(20);
            color: #fff;
            padding: px2rem(2) px2rem(10);
            border-radius: px2rem(4);
            margin-right: px2rem(14);
          }
        }
        .info-message {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price {
            color: $btnColor;
            .price-num {
              font-size: px2rem(34);
            }
          }
          .message {
            font-size: px2rem(24);
            .sell-num {
              color: #999;
              margin-bottom: px2rem(10);
            }
            .btn {
              height: px2rem(54);
              background-color: $btnColor;
              color: #fff;
              border-radius: px2rem(8);
              text-align: center;
              line-height: px2rem(54);
              padding: 0 px2rem(16);
            }
          }
        }
      }
    }
  }
}
</style>
