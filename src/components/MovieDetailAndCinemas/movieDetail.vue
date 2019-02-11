<template>
  <div id="movieDetail-wrap">
    <div class="background image" :style="bgImgObj"></div>
    <!-- 添加过滤层 -->
    <div class="background filter"></div>
    <img class="img" :src="filterImgUrl" alt="影片海报" />
    <div class="movie-info">
      <h3 class="info-nm" v-text="nm"></h3>
      <div class="info-enm" v-text="enm"></div>
      <!-- 多状态部分 start -->
      <div class="info-score" v-if="sc">
        <star v-if="show" :sc="sc" />
        <span class="sc" v-text="sc"></span>
        <span class="person">&nbsp;&nbsp;({{ filterSnum }}万人评)</span>
      </div>
      <div class="info-wish" v-else>
        <span class="wish" v-text="wish + '人想看'"></span>
      </div>
      <!-- 多状态部分 end -->
      <div class="info-category">
        <span class="cat" v-text="cat"></span>
        <i class="标志"></i>
      </div>
      <div class="info-src" v-text="src + '/' + dur + '分钟'"></div>
      <div class="info-pubDesc" v-text="pubDesc"></div>
    </div>
    <i class="arrow" v-if="!show"></i>
  </div>
</template>

<script>
import star from "@/components/MovieDetail/star";
export default {
  name: "movieDetail",
  props: {
    detailMovie: Object,
    show: Boolean
  },
  computed: {
    bgImgObj() {
      return {
        "background-image": "url(" + this.filterImgUrl + ")"
      };
    },
    imgUrl() {
      return this.detailMovie.img || "";
    },
    filterImgUrl() {
      return this.imgUrl.replace("/w.h", "/148.208");
    },
    nm() {
      return this.detailMovie.nm || "";
    },
    enm() {
      return this.detailMovie.enm || "";
    },
    sc() {
      return this.detailMovie.sc || 0;
    },
    wish() {
      return this.detailMovie.wish || 0;
    },
    snum() {
      return this.detailMovie.snum || 0;
    },
    filterSnum() {
      let snum = 0;
      if (this.snum >= 10000) {
        snum = Math.floor(this.snum / 10000);
        if (this.snum % 10000 >= 1000) {
          snum += Math.floor((this.snum % 10000) / 1000) / 10;
        }
      }
      return snum;
    },
    cat() {
      return this.detailMovie.cat || "";
    },
    src() {
      return this.detailMovie.src || "";
    },
    dur() {
      return this.detailMovie.dur || 0;
    },
    pubDesc() {
      return this.detailMovie.pubDesc || "";
    }
  },
  components: {
    star
  }
};
</script>

<style lang="scss" scoped>
#movieDetail-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(24);
  color: #fff;
  padding: px2rem(38) px2rem(30) px2rem(38) px2rem(30);
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    &.image {
      background-repeat: no-repeat;
      background-size: 100%;
      filter: blur(px2rem(40));
      opacity: 0.55;
    }
    &.filter {
      background-color: #333;
      z-index: -2;
    }
  }
  .img {
    width: px2rem(220);
    height: px2rem(300);
    flex-shrink: 0;
  }
  .movie-info {
    flex: 1;
    margin-left: px2rem(25);
    min-width: 0;
    .info-nm {
      font-size: px2rem(40);
      @include ellipsis();
      & ~ div {
        line-height: 1;
        opacity: 0.8;
        margin-top: px2rem(20);
        @include ellipsis();
      }
    }
    .info-score {
      font-weight: 700;
      .sc {
        font-size: px2rem(36);
        color: #fc0;
      }
    }
    .info-wish {
      opacity: 1;
      font-size: px2rem(28);
      color: #fc0;
      font-weight: 700;
    }
  }
  .arrow {
    display: inline-block;
    width: px2rem(18);
    height: px2rem(18);
    border-top: px2rem(4) solid #fff;
    border-right: px2rem(4) solid #fff;
    transform: rotateZ(45deg);
    opacity: 0.5;
  }
}
</style>
