<template>
  <div id="list-wrap">
    <div class="movie-list-item" v-for="item in movieList" :key="item.id">
      <!-- movie-image -->
      <img class="image" :src="item.img | imgFilter" alt="影片海报">
      <!-- movie-info -->
      <div class="movie-info-wrap">
        <div class="movie-info">
          <div class="title line-ellipsis">
            <div class="movie-name" v-text="item.nm"></div>
            <i></i>
          </div>
          <!-- 优化分数为0的展示 -->
          <div v-if="item.sc !== 0" class="score line-elllipsis">
            <span>观众评</span>
            <span class="sc" v-text="' ' + item.sc"></span>
          </div>
          <div v-else class="score line-elllipsis">
            <span class="sc" v-text="item.wish + ' '"></span>
            <span>人想看</span>
          </div>
          <div class="actor line-ellipsis">主演: {{ item.star }}</div>
          <div class="show-info line-ellipsis" v-text="item.showInfo"></div>
        </div>
        <!-- movie-btn -->
        <!-- <div class="btn-goupiao">购票</div> -->
        <!-- 可定制插槽按钮，还可以优化,后续慢慢来 -->
        <mao-button :btnNum="item.showst"></mao-button>
      </div>
    </div>
  </div>
</template>

<script>
import maoButton from "@/components/comment/mao-button";
export default {
  name: "movie-list",
  props: {
    movieList: Array
  },
  filters: {
    imgFilter(imgUrL) {
      return imgUrL.replace("/w.h", "/128.180");
    }
  },
  components: {
    maoButton
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#list-wrap {
  position: absolute; // 这里还有点问题,绝对定位后 movie-info-item 有缩小的情况
  top: px2rem(188);
  bottom: px2rem(96);
  left: 0;
  right: 0;
  overflow: auto;
  padding: 0 px2rem(30);
  font-size: 0;
  &::-webkit-scrollbar {
    height: 0 !important;
  }
  .movie-list-item {
    display: flex;
    padding: px2rem(24) px2rem(28) px2rem(24) 0;
    font-size: $font-minor;
    color: $text-normal;
    border-bottom: 1px solid #dbd6d6;
    justify-content: space-between;

    .image {
      width: px2rem(128);
      height: px2rem(180);
    }
    .movie-info-wrap {
      flex: 1; // 使中间movieinfo信息占满剩余空间
      margin-left: px2rem(24);
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 0; // 为了让省略号生效
      .movie-info {
        min-width: 0; // 为了让省略号生效
        margin-right: px2rem(10);
        .title {
          margin-bottom: px2rem(16);
          .movie-name {
            color: $text-title;
            font-size: px2rem(34);
            font-weight: 700;
          }
        }
        .score {
          line-height: 1;
          .sc {
            color: $text-number;
            font-size: $font-normal;
            font-weight: 700;
          }
        }
        .actor {
          line-height: px2rem(27);
          margin-top: px2rem(12);
        }
        .show-info {
          margin-top: px2rem(12);
          line-height: px2rem(27);
          margin-bottom: px2rem(14);
        }
      }
    }
  }
}
</style>
