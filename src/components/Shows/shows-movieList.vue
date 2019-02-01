<template>
  <div id="movie-list-wrap">
    <div class="bg filter"></div>
    <div class="bg img" :style="bgImgUrl"></div>
    <swiper 
      class="movie-list" 
      :options="swiperOption" 
      ref="mySwiper" 
      @slideChange="handleSlideChange"
    >
      <swiper-slide 
        class="movie-item" 
        v-for="(item, index) in movies" 
        :key="index"
        :class="{active: slideIndex === index}"
      >
        <img :src="item.img | imgFilter" alt="影片海报">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "shows-movieList",
  props: {
    movieIndex: Number,
    movies: Array
  },
  data() {
    return {
      slideIndex: 0,
      swiperOption: {
        initialSlide: 0, // 设定初始化时slide的索引
        centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量(carousel模式)。
        direction: "horizontal", // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        spaceBetween: 30, // 在slide之间设置距离（单位px）。
        slideToClickedSlide: true // 设置为true则点击slide会过渡到这个slide。
      },
      imgUrl: "" // 背景图片地址
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    bgImgUrl() {
      return {
        "background-image": "url(" + this.filterUrl + ")"
      };
    },
    filterUrl() {
      return this.imgUrl.replace("/w.h", "/148.208");
    }
  },
  filters: {
    imgFilter(imgUrl) {
      return imgUrl.replace("/w.h", "/148.208");
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    handleSlideChange() {
      let index = this.swiper.activeIndex;
      this.slideIndex = index;
      this.imgUrl = this.movies[index].img;
      this.$emit("changeMovieIndex", index, this.movies[index].id);
    }
  },
  created() {
    this.imgUrl = this.movies[this.movieIndex].img;
  },
  mounted() {
    this.slideIndex = this.movieIndex;
    // 滚动到当前movieIndex索引指向的影片海报上
    this.swiper.slideTo(this.movieIndex, 1000, false);
  }
};
</script>

<style lang="scss" scoped>
#movie-list-wrap {
  position: relative;
  height: px2rem(270);
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &.img {
      background-repeat: no-repeat;
      background-size: 100%;
      filter: blur(px2rem(40));
      opacity: 0.55;
    }
    &.filter {
      background-color: #40454d;
    }
  }
  .movie-list {
    position: relative;
    height: px2rem(190);
    padding: px2rem(40) px2rem(30) px2rem(40) px2rem(10);
    z-index: 99;

    .movie-item {
      width: px2rem(130);
      height: px2rem(190);
      &:first-child {
        margin-left: px2rem(20);
      }
      &.active {
        transform: scale(1.15);
        transition: transform 300ms ease;
        border: px2rem(4) solid #fff;
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -30px;
          transform: translateX(-50%) rotate(180deg);
          display: inline-block;
          width: px2rem(2);
          height: px2rem(2);
          border: px2rem(16) solid transparent;
          border-bottom: px2rem(16) solid #fff;
          z-index: -1;
        }
      }
      img {
        width: px2rem(130);
        height: px2rem(190);
      }
    }
  }
}
</style>
