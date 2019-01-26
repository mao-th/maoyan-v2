<template>
  <div id="MovieDetailAndCinemas-wrap">
    <!-- 顶部 -->
    <main-header :title="title">
      <router-link to="/movie" class="back" slot="left"></router-link>
    </main-header>
    <!-- MovieDetail 部分 -->
    <movie-detail :detailMovie="detailMovie"></movie-detail>
    <!-- 日期选择器 -->
    <date-selector :dates="dates"></date-selector>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import movieDetail from "@/components/MovieDetailAndCinemas/movieDetail";
import dateSelector from "@/components/MovieDetailAndCinemas/dateSelector";
import { mapGetters } from "vuex";
import { getmovieDetail, getMoiveCinemas } from "@/apis/api";
export default {
  name: "MovieDetailAndCinemas",
  data() {
    return {
      detailMovie: {},
      showDays: [] // 电影上映的时间列表
    };
  },
  computed: {
    ...mapGetters(["city"]),
    cityId() {
      return this.city.id;
    },
    movieId() {
      return this.$route.params.id;
    },
    title() {
      return this.detailMovie.nm || "毛毛电影v2";
    },
    dates() {
      return this.showDays.dates || [];
    }
  },
  components: {
    mainHeader,
    movieDetail,
    dateSelector
  },
  created() {
    const p = {
      movieId: this.movieId
    };
    getmovieDetail(p).then(res => {
      res = res.data;
      this.detailMovie = res.detailMovie;
    });

    const p1 = {
      movieId: this.movieId,
      day: "2019-01-26",
      offset: 0,
      limit: 20,
      districtId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId: -1,
      stationId: -1,
      item: "",
      updateShowDay: true,
      reqId: new Date().getTime(),
      cityId: this.cityId
    };

    getMoiveCinemas(p1).then(res => {
      res = res.data;
      this.showDays = res.showDays;
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
