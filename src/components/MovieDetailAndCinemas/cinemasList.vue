<template>
  <div id="cinema-list-wrap" :class="{ isFixed: $route.path === '/cinema' }">
    <div class="cinema-list">
      <div
        class="cinema-item"
        v-for="(item, index) in cinemas"
        :key="index"
        @click="handleToShows(item.id)"
      >
        <div class="cinema-info">
          <div class="cinema-name-price">
            <span class="cinema-name" v-text="item.nm"></span>
            <span class="sell-price">
              <span class="price" v-text="item.sellPrice + ' '"></span>元起
            </span>
          </div>
          <div class="cinema-address" v-text="item.addr"></div>
          <div class="feature-tags">
            <span v-if="item.tag.allowRefund">退</span>
            <span v-if="item.tag.endorse">改签</span>
            <!-- <span v-if="item.tag.sell">座</span> -->
            <span
              v-for="(item, index) in item.tag.hallTypeVOList"
              :key="index"
              v-text="item.name"
            ></span>
            <span v-if="item.tag.snack" class="feature">小吃</span>
            <span v-if="item.tag.vipTag" class="feature">折扣卡</span>
          </div>
          <!-- <div class="discount" v-if="item.promotion.cardPromotionTag">
            <div class="discount-tag">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
                alt="标签"
              />
            </div>
            <div
              class="discount-content"
              v-text="item.promotion.cardPromotionTag"
            ></div>
          </div> -->
          <div
            class="discount"
            v-for="(value, key) in item.promotion"
            :key="key"
          >
            <div class="discount-tag">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
                alt="标签"
                v-if="key == 'cardPromotionTag'"
              />
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAplJREFUSA3FV0trFEEQ/qpnJpvVNSQmSFYjMRrRRDTRIIKo60kPohevXr0Lgv4EMb/BgzdPOXpRCb4uihGzgvGxkRVcEwgqBjWP2em2erIL+5hHL+tuCnZ7uqq6vq+6unumCSzq9tSAK2lSETJQaqfWtUyIvpHCE0eoG3Tz8lfywRVmlcL2loEGBCbCD4cwZvuZQ7UVXPPRCbuKJoUCzgYQbItKYwvmkm4LWiCISjOBzRXbCD7ZAfvChJFr2UmtrMO7P1PuhrZmBBwLYjgN+aEA9fNPaLCygXb3QvR3wysrIlozAqUAXvYL1PxiRLgNk3VmFHRkMNZPOzREwMocAo4PxwamnlSsT9mhIQKq8B1qabk8NrTV5aIdXaH2SkNDBGRu0agElOpsDQH7/DjgGiytLR2AJysTDX02mwHeUsXptwC3xuIWjVzNCFgC1ukReI+ykLP5qsDOtYuQMzl4z+aq9KYdIwLi8CDIYdetCYjxPdWx+Yyg/p56fclLzhWANbd6TEXPiIB1bC/U6jqssaGKoaVHQaCBXlh9wate5peaIyBO7AdSSbh3HgK//tYRcK5f4hLMw3v6rs5mooicAerbxrUfhfec67vK09iVDIhJQMIJtulFG7NrIgmgO8Vn/2/Il59gnRqBdfJgAAHAmtjn/2qNxQdvIF9/rlVX9Wnt1hR/F0RIJ2ens9dZJur5OlfPQWbz8F58rA/S9AzokBpci17JgauZ+Wv98sqGX4P/9SnVBLCvZED8PRAqNr+qjw5BHNgV6uLenQ5dC7EE5PsCwHu9KZHhVY4n8CrXFHbc4E3/JmQCtBDHsnV2WuCDFI9bBxAdWWML/47G16Ro1/9v9a9mfD8U+oKo72j8SrnXnnLQgsbyMRn7H2L+wgj6kKPPAAAAAElFTkSuQmCC"
                alt="标签"
                v-if="key == 'starActivityTag'"
              />
            </div>
            <div class="discount-content" v-text="value"></div>
          </div>
          <div
            class="cinema-showtimes"
            v-if="$route.path !== '/cinema'"
            v-text="'近期场次: ' + item.showTimes"
          ></div>
        </div>
        <div class="distance" v-text="item.distance"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cinemas-list",
  props: {
    cinemas: Array,
    pading: Object,
    movieId: String
  },
  methods: {
    handleToShows(cinemaId) {
      // 1.先完成跳转的实现。
      this.$router.push({
        path: "/shows/" + cinemaId,
        query: {
          movieId: this.movieId
        }
      });
      // 2.完成根据电影id跳转的实现
    }
  }
};
</script>

<style lang="scss">
#cinema-list-wrap {
  font-size: px2rem(26);
  color: #666;
  background-color: #fff;
  &.isFixed {
    position: absolute;
    top: px2rem(272);
    left: 0;
    right: 0;
    bottom: px2rem(96);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .cinema-list {
    font-size: px2rem(26);
    padding: 0 px2rem(30);
    border-bottom: px2rem(1) solid #e5e5e5;
    .cinema-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: px2rem(30) 0;
      border-bottom: px2rem(1) solid #e5e5e5;
      &:last-child {
        border-bottom: 0 none;
      }
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
            color: #ef4238;
            line-height: px2rem(46);
            .price {
              font-size: px2rem(36);
            }
          }
        }
        .cinema-address {
          @include ellipsis();
        }
        .feature-tags {
          margin: px2rem(8) 0;
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
        .discount {
          display: flex;
          .discount-tag {
            img {
              width: px2rem(30);
              height: px2rem(30);
            }
          }
          .discount-content {
            margin-left: px2rem(6);
            font-size: px2rem(22);
            color: #999;
            @include ellipsis();
          }
        }
        .cinema-showtimes {
          font-size: px2rem(24);
          color: #999;
        }
      }
      .distance {
        flex-shrink: 0;
      }
    }
  }
}
</style>
