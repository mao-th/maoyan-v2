<template>
  <div id="movie-nav">
    <router-link class="city" to="/city" tag="div">
      <span class="city-name" v-text="cityName"></span>
      <i class="iconfont-jiantou"></i>
    </router-link>
    <div class="movie-nav-cards">
      <div
        class="movie-nav-item"
        :class="{ active: showNavActive }"
        @click="changeMovieList(true)"
      >
        正在热映
      </div>
      <div
        class="movie-nav-item"
        :class="{ active: !showNavActive }"
        @click="changeMovieList(false)"
      >
        即将上映
      </div>
    </div>
    <router-link class="search" to="/search">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
  </div>
</template>

<script>
import "@/assets/css/iconfont.css";
export default {
  name: "movie-nav",
  props: {
    city: Object
  },
  data() {
    return {
      showNavActive: true
    };
  },
  computed: {
    cityName() {
      return this.city.nm;
    }
  },
  methods: {
    changeMovieList(flag) {
      this.showNavActive = flag;
      this.$emit("changeComponent", flag);
    }
  }
};
</script>

<style lang="scss" scoped>
#movie-nav {
  display: flex;
  justify-content: space-between;
  font-size: $font-normal;
  height: px2rem(88);
  line-height: px2rem(88);
  border-bottom: 1px solid rgb(219, 214, 214);
  color: $text-normal;
  .city {
    padding-left: px2rem(30);
    .iconfont-jiantou::after {
      content: "";
      display: inline-block;
      border: px2rem(8) solid #b0b0b0;
      border-top-color: transparent;
      border-left-color: transparent;
      border-bottom-color: transparent;
      transform: rotate(-90deg);
      margin-left: px2rem(8);
    }
  }
  .movie-nav-cards {
    float: left;
    display: flex;
    justify-content: space-around;
    .movie-nav-item {
      font-weight: 700;
      text-align: center;
      width: px2rem(160);
      margin: 0 px2rem(24);
      &.active {
        color: $mainColor;
        border-bottom: px2rem(6) solid $mainColor;
      }
    }
  }
  .search {
    padding-right: px2rem(30);
    .icon-sousuo {
      font-size: px2rem(50);
      font-weight: 700;
      color: $mainColor;
    }
  }
}
</style>
