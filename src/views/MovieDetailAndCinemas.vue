<template>
  <div id="MovieDetailAndCinemas-wrap" ref="wrap">
    <!-- 遮罩层 -->
    <div class="filter" v-show="isFixed || isFixed1" @click="handleClose"></div>
    <!-- 顶部 -->
    <main-header :title="title">
      <router-link to="/movie" class="back" slot="left"></router-link>
    </main-header>
    <div ref="detailMovie">
    <!-- MovieDetail 部分 -->
    <movie-detail :detailMovie="detailMovie"></movie-detail>
    </div>
    <div :class="{active: isFixed, active1: isFixed1}">
      <!-- 日期选择器 -->
      <date-selector :dates="dates"></date-selector>
      <!-- 过滤器 -->
      <cinemas-filter :filterCinemas="filterCinemas" @open="handleOpen" @close="handleClose" :isClose="isClose"></cinemas-filter>
    </div>
    <!-- 电影院列表 -->
    <cinemas-list :cinemas="cinemas" :pading="pading"></cinemas-list>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import movieDetail from "@/components/MovieDetailAndCinemas/movieDetail";
import dateSelector from "@/components/MovieDetailAndCinemas/dateSelector";
import cinemasFilter from "@/components/MovieDetailAndCinemas/filter";
import cinemasList from "@/components/MovieDetailAndCinemas/cinemasList";
import { mapGetters } from "vuex";
import { getmovieDetail, getMoiveCinemas, getFilterCinemas } from "@/apis/api";
import moment from "moment";
export default {
  name: "MovieDetailAndCinemas",
  data() {
    return {
      detailMovie: {}, // 对应movieId的电影详情
      showDays: [], // 电影上映的时间列表
      filterCinemas: {}, // 过滤器数据对象
      cinemas: [], // 电影院列表
      pading: {}, // 电影院相关信息 - 总数，分页，是否还有更多...
      isFixed: false, // 控制日期选择器和过滤器的打开/关闭  第一种定位样式
      isClose: false, // 控制过滤器的tab页打开/关闭
      isFixed1: false // 控制日期选择器和过滤器的打开/关闭  第二种定位样式
    };
  },
  computed: {
    ...mapGetters(["city", "rt"]),
    cityId() {
      // 城市id
      return this.city.id;
    },
    movieId() {
      // 电影id
      return this.$route.params.id;
    },
    title() {
      // 电影名称
      return this.detailMovie.nm || "毛毛电影v2";
    },
    dates() {
      // 电影放映日期列表
      return this.showDays.dates || [];
    }
  },
  components: {
    mainHeader,
    movieDetail,
    dateSelector,
    cinemasFilter,
    cinemasList
  },
  methods: {
    /**
     *  控制过滤器的开关/
     */
    handleOpen() {
      if (this.$refs.wrap.scrollTop < this.$refs.detailMovie.offsetTop) {
        this.$refs.wrap.scrollTop = 0;
        this.isFixed = true;
      } else if (
        this.$refs.wrap.scrollTop >= this.$refs.detailMovie.offsetTop
      ) {
        this.$refs.wrap.scrollTop = this.$refs.detailMovie.offsetTop;
        this.isFixed1 = true;
      }
      this.isClose = false;
    },
    /**
     *  控制过滤器的开关/
     */
    handleClose() {
      this.isFixed = false;
      this.isClose = true;
      this.isFixed1 = false;
    },
    _getmovieDetail() {
      const p = {
        movieId: this.movieId
      };
      getmovieDetail(p).then(res => {
        res = res.data;
        this.detailMovie = res.detailMovie;
      });
    },
    _getMoiveCinemas(day) {
      // 发送请求前比较当前电影的上映时间与现在的大小进行选择
      const p = {
        movieId: this.movieId,
        day: day,
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

      getMoiveCinemas(p).then(res => {
        res = res.data;
        this.showDays = res.showDays;
        this.cinemas = res.cinemas;
        this.pading = res.pading;
      });
    },
    _getFilterCinemas(day) {
      const p = {
        movieId: this.movieId,
        day: day
      };
      getFilterCinemas(p)
        .then(res => {
          res = res.data;
          this.filterCinemas = res;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this._getmovieDetail();
    this._getMoiveCinemas(
      moment(this.rt).isBefore(moment().format("YYYY-MM-DD"))
        ? moment().format("YYYY-MM-DD")
        : this.rt
    );
    this._getFilterCinemas(
      moment(this.rt).isBefore(moment().format("YYYY-MM-DD"))
        ? moment().format("YYYY-MM-DD")
        : this.rt
    );
  }
};
</script>

<style lang="scss" scoped>
#MovieDetailAndCinemas-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .filter {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-color: #000;
    opacity: 0.3;
    z-index: 90;
  }
  .active {
    position: fixed;
    top: px2rem(100);
    left: 0;
    right: 0;
    z-index: 99;
  }
  .active1 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
}
</style>
