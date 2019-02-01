<template>
  <div id="movie-wrap" v-show="filterList.length">
    <div class="movie-title">电影/电视剧/综艺</div>
    <div class="movie-list">
      <div class="movie-item" v-for="item in filterList" :key="item.id">
        <img class="image" :src="item.img | imgFilter" alt="影片海报" />
        <div class="movie-info">
          <div class="info-title">
            <div class="info-title-left">
              <span class="info-nm" v-text="item.nm"></span>
              <i :class="'version ' + item.version"></i>
            </div>
            <div class="info-title-right">
              <template v-if="item.wish == 0 && item.sc == 0">
                <span class="no-sc">暂无评分</span>
              </template>
              <template v-else-if="item.sc == 0">
                <span class="person" v-text="item.wish"></span>
                <span>人想看</span>
              </template>
              <template v-else>
                <span class="sc" v-text="item.sc"></span>
                <span>分</span>
              </template>
            </div>
          </div>
          <div class="info-main-wrap">
            <div class="info-main">
              <div class="info-enm" v-text="item.enm"></div>
              <div class="info-categary" v-text="item.cat"></div>
              <div class="info-showinfo" v-text="item.rt"></div>
            </div>
            <mao-button :btnNum="item.showst"></mao-button>
          </div>
        </div>
      </div>
    </div>
    <div class="more-result" v-if="total > 3">查看全部{{ total }}部影视剧</div>
  </div>
</template>

<script>
import maoButton from "@/components/common/mao-button";
export default {
  name: "search-movie",
  props: {
    movies: Object
  },
  computed: {
    list() {
      return this.movies.list || [];
    },
    total() {
      return this.movies.total || 0;
    },
    filterList() {
      return this.list.slice(0, 3);
    }
  },
  filters: {
    imgFilter(imgUrl) {
      return imgUrl.replace("/w.h", "/128.180");
    }
  },
  components: {
    maoButton
  }
};
</script>

<style lang="scss" scoped>
#movie-wrap {
  background-color: #fff;
  font-size: px2rem(30);
  color: #999;
  margin-bottom: px2rem(20);
  .movie-title {
    line-height: px2rem(76);
    padding-left: px2rem(30);
  }
  .movie-list {
    padding-left: px2rem(30);
    border-top: px2rem(1) solid #e5e5e5;
    border-bottom: px2rem(1) solid #e5e5e5;
    .movie-item {
      display: flex;
      padding: px2rem(24) 0;
      border-bottom: px2rem(1) solid #e5e5e5;
      &:last-child {
        border-bottom: 0 none;
      }
      .image {
        width: px2rem(128);
        height: px2rem(180);
      }
      .movie-info {
        flex: 1;
        font-size: px2rem(26);
        color: #666;
        padding: 0 px2rem(30) 0 px2rem(20);
        min-width: 0;
        .info-title {
          display: flex;
          justify-content: space-between;
          font-size: px2rem(34);
          color: #222;
          font-weight: 600;
          .info-title-left {
            flex: 1;
            display: flex;
            align-items: center;
            min-width: 0;
            .info-nm {
              min-width: 0;
              padding-right: px2rem(10);
              @include ellipsis();
            }
          }
          .info-title-right {
            padding-left: px2rem(10);
            font-weight: normal;
            font-size: px2rem(20);
            color: #fa0;
            flex-shrink: 0;
            .person,
            .sc,
            .no-sc {
              font-size: px2rem(32);
            }
            .no-sc {
              color: #666;
            }
          }
        }
        .info-main-wrap {
          display: flex;
          justify-content: space-between;
          .info-main {
            min-width: 0;
            & > div {
              margin-top: px2rem(4);
              @include ellipsis();
            }
          }
        }
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
