<template>
  <div id="MovieDetailAndCinemas-wrap">
    <!-- 顶部 -->
    <main-header :title="title">
      <router-link to="/movie" class="back" slot="left"></router-link>
    </main-header>
    <!-- MovieDetail 部分 -->
    <movie-detail :detailMovie="detailMovie"></movie-detail>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import movieDetail from "@/components/MovieDetailAndCinemas/movieDetail";
import { getmovieDetail } from "@/apis/api";
export default {
  name: "MovieDetailAndCinemas",
  data() {
    return {
      detailMovie: {}
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    title() {
      return this.detailMovie.nm || "毛毛电影v2";
    }
  },
  components: {
    mainHeader,
    movieDetail
  },
  created() {
    const p = {
      movieId: this.movieId
    };
    getmovieDetail(p).then(res => {
      res = res.data;
      this.detailMovie = res.detailMovie;
    });
  }
};
</script>

<style lang="scss" scoped>
#MovieDetailAndCinemas-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
