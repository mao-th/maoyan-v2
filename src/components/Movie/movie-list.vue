<template>
  <div id="list-wrap">
    <div class="movie-list">
      <div class="movie-list-item">
        <!-- movie-image -->
        <!-- <div class="movie-image"> -->
          <img class="image" src="https://p1.meituan.net/128.180/movie/426f1f3f1b145f763b75a60c7c39c44a535093.jpg" alt="影片海报">
        <!-- </div> -->
        <!-- movie-info -->
        <div class="movie-info-wrap">
          <div class="movie-info">
            <div class="title line-ellipsis">
              <div class="movie-name">大黄蜂</div>
              <i></i>
            </div>
            <div class="score line-elllipsis">
              <span>观众评 </span>
              <span>9.1</span>
            </div>
            <div class="actor line-ellipsis">主演: 海莉·斯坦菲尔德,约翰·塞纳,小豪尔赫·兰登伯格</div>
            <div class="show-info line-ellipsis">今天21家影院放映194场</div>
          </div>
           <!-- movie-btn -->
          <!-- <div class="btn-goupiao">购票</div> -->
          <!-- 可定制插槽按钮，还可以优化,后续慢慢来 -->
          <mao-button :btnNum="1">购票</mao-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import maoButton from "@/components/comment/mao-button";
export default {
  name: "movie-list",
  components: {
    maoButton
  }
};
</script>

<style lang="scss" scoped>
#list-wrap {
  padding: 0 px2rem(30);
  font-size: 0;
  .movie-list-item {
    display: flex;
    padding: px2rem(24) px2rem(28) px2rem(24) 0;
    font-size: $font-minor;
    color: $text-normal;
    border-bottom: 1px solid #dbd6d6;
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
        flex: 1;
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
          & span:last-child {
            color: $text-number;
            font-size: $font-normal;
            font-weight: 700;
          }
        }
        .actor {
          vertical-align: middle;
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
