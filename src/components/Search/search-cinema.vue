<template>
  <div id="cinema-list-wrap" v-show="filterList.length">
    <div class="cinema-title">影院</div>
    <div class="cinema-list">
      <div class="cinema-item" v-for="item in filterList" :key="item.id">
        <div class="cinema-info">
          <div class="cinema-name-price">
            <span class="cinema-name" v-text="item.nm"></span>
            <span class="sell-price">
              <span class="price" v-text="item.sellPrice + ' '"></span>元起
            </span>
          </div>
          <div class="cinema-address" v-text="item.addr"></div>
          <div class="feature-tags">
            <span v-if="item.sell">座</span>
            <span v-for="(type, index) in item.hallType" :key="index" v-text="type"></span>
            <span v-if="item.snack" class="feature">小吃</span>
            <span v-if="item.vipDesc" class="feature">折扣卡</span>
          </div>
        </div>
        <div class="distance" v-text="item.distance"></div>
      </div>
    </div>
    <div class="more-result" v-if="total > 3">查看全部{{ total }}部影视剧</div>
  </div>
</template>

<script>
export default {
  name: "search-cinema",
  props: {
    cinemas: Object
  },
  computed: {
    list() {
      return this.cinemas.list || [];
    },
    total() {
      return this.cinemas.total || 0;
    },
    filterList() {
      return this.list.slice(0, 3);
    }
  }
};
</script>

<style lang="scss" scoped>
#cinema-list-wrap {
  background-color: #fff;
  font-size: px2rem(30);
  color: #999;
  .cinema-title {
    line-height: px2rem(76);
    padding-left: px2rem(30);
  }
  .cinema-list {
    font-size: px2rem(26);
    padding: 0 px2rem(30);
    border-top: px2rem(1) solid #e5e5e5;
    border-bottom: px2rem(1) solid #e5e5e5;
    .cinema-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: px2rem(30) 0;
      .cinema-info {
        min-width: 0;
        .cinema-name-price {
          display: flex;
          .cinema-name {
            font-size: px2rem(32);
            color: #000;
            @include ellipsis();
          }
          .sell-price {
            flex-shrink: 0;
            font-size: px2rem(22);
            margin-left: px2rem(20);
            .price {
              font-size: px2rem(34);
              color: #ef4238;
            }
          }
        }
        .cinema-address {
          margin-top: px2rem(10);
          @include ellipsis();
        }
        .feature-tags {
          margin-top: px2rem(14);
          & > span {
            display: inline-block;
            padding: 0 px2rem(6);
            line-height: px2rem(30);
            font-size: px2rem(19);
            color: #589daf;
            border: px2rem(1) solid #589daf;
            border-radius: px2rem(4);
            margin-right: px2rem(8);
          }
          .feature {
            color: rgb(255, 153, 0);
            border: px2rem(1) solid rgb(255, 153, 0);
          }
        }
      }
      .distance {
        flex-shrink: 0;
      }
    }
  }
  .more-result {
    line-height: px2rem(88);
    text-align: center;
    color: #ef4238;
  }
}
</style>
