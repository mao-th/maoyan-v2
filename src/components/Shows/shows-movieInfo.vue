<template>
  <div id="movie-info">
    <div class="movie-title">
      <span class="movie-name" v-text="nm + ' '"></span>
      <template v-if="sc == '0.0'">
        <span class="movie-wish" v-text="wish"></span>
        <span class="small">人想看</span>
      </template>
      <template v-else>
        <span class="movie-wish" v-text="sc"></span>
        <span class="small">分</span>
      </template>
    </div>
    <div class="movie-desc" v-text="desc"></div>
  </div>
</template>

<script>
export default {
  name: "shows-movieInfo",
  props: {
    movieInfo: Object
  },
  computed: {
    nm() {
      return this.movieInfo.nm;
    },
    wish() {
      return this.movieInfo.wish;
    },
    sc() {
      return this.movieInfo.sc;
    },
    desc() {
      return this.movieInfo.desc;
    }
  }
};
</script>

<style lang="scss" scoped>
#movie-info {
  text-align: center;
  padding: px2rem(22) px2rem(30);
  background-color: #fff;
  .movie-title {
    font-weight: 700;
    color: #ffb400;
    .movie-name {
      font-size: px2rem(34);
      color: #333;
    }
    .movie-wish {
      font-size: px2rem(32);
    }
    .small {
      font-size: px2rem(20);
    }
  }
  .movie-desc {
    margin-top: px2rem(4);
  }
}
</style>
