<template>
  <div id="list-wrap">
    <div class="movie-list">
      <div class="movie-list-item" v-for="item in movieList" :key="item.id">
        <!-- movie-image -->
        <img class="image" :src="item.img | imgFilter" alt="影片海报">
        <!-- movie-info -->
        <div class="movie-info-wrap">
          <div class="movie-info">
            <div class="title">
              <div class="movie-name" v-text="item.nm"></div>
              <i></i>
            </div>
            <!-- 优化分数为0的展示 -->
            <div v-if="item.sc !== 0" class="score">
              <span>观众评</span>
              <span class="sc" v-text="' ' + item.sc"></span>
            </div>
            <div v-else class="score">
              <span class="sc" v-text="item.wish + ' '"></span>
              <span>人想看</span>
            </div>
            <div class="actor">主演: {{ item.star }}</div>
            <div class="show-info" v-text="item.showInfo"></div>
          </div>
          <!-- movie-btn -->
          <!-- <div class="btn-goupiao">购票</div> -->
          <!-- btn使用样式比较多，定义成组件进行管理 -->
          <mao-button :btnNum="item.showst"></mao-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieList } from "@/apis/api";
import maoButton from "@/components/comment/mao-button";
export default {
  name: "movie-list",
  data() {
    return {
      movieList: []
    };
  },
  filters: {
    imgFilter(imgUrL) {
      return imgUrL.replace("/w.h", "/128.180");
    }
  },
  components: {
    maoButton
  },
  created() {
    const p = {
      ci: 280
    };
    getMovieList(p)
      .then(res => {
        res = res.data;
        this.movieList = res.movieList;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
#list-wrap {
  position: absolute;
  top: px2rem(188);
  left: 0;
  right: 0;
  bottom: px2rem(96);
  overflow-y: scroll;
  padding: 0 px2rem(30);
  font-size: 0;
  &::-webkit-scrollbar {
    // 隐藏滚动条
    width: 0 !important;
    height: 0 !important;
  }
  .movie-list {
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
          @include ellipsis();
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
            @include ellipsis();
            .sc {
              color: $text-number;
              font-size: $font-normal;
              font-weight: 700;
            }
          }
          .actor {
            @include ellipsis();
            line-height: px2rem(27);
            margin-top: px2rem(12);
          }
          .show-info {
            @include ellipsis();
            margin-top: px2rem(12);
            line-height: px2rem(27);
            margin-bottom: px2rem(14);
          }
        }
      }
    }
  }
}
</style>
