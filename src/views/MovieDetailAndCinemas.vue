<template>
  <div id="MovieDetailAndCinemas-wrap" ref="wrap" @scroll="handleScroll">
    <!-- 遮罩层 -->
    <div class="filter" v-show="isFixed || isFixed1" @click="handleClose"></div>
    <!-- 顶部 -->
    <main-header :title="title">
      <router-link to="/movie" class="back" slot="left"></router-link>
    </main-header>
    <transition name="fade">
      <div v-show="!isLoading">
        <!-- MovieDetail 部分 -->
        <div ref="detailMovie">
          <movie-detail :detailMovie="detailMovie"></movie-detail>
        </div>
        <div :class="{active: isFixed, active1: isFixed1, active2: isFixed2}">
          <!-- 日期选择器 -->
          <date-selector :dates="dates" @changeDate="handleChangeDate"></date-selector>
          <!-- 过滤器 -->
          <cinemas-filter
            :filterCinemas="filterCinemas"
            :isClose="isClose"
            @open="handleOpen"
            @close="handleClose"
            @changeRegionLeftIndex="handleChangeRegionLeftIndex"
            @changeRegionRightIndex="handleChangeRegionRightIndex"
            @changeBrandIndex="handleChangeBrandIndex"
            @changeFeatureSeriveIndex="handleChangeFeatureSeriveIndex"
            @changeFeatureHallTypeIndex="handleChangeFeatureHallTypeIndex"
            @featureCommit="handleFeatureCommit"
          ></cinemas-filter>
        </div>
        <!-- 电影院列表 -->
        <cinemas-list
          :class="{cinemas:isFixed2}"
          :cinemas="cinemas"
          :pading="pading"
          :movieId="movieId"
        ></cinemas-list>
      </div>
    </transition>
    <loading v-show="isLoading"></loading>
  </div>
</template>

<script>
import loading from "@/components/common/loading/mao-loading";
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
      isClose: false, // 控制过滤器的tab页打开/关闭 - 于过滤器进行通信
      isFixed1: false, // 控制日期选择器和过滤器的打开/关闭  第二种定位样式
      isFixed2: false, // 控制日期选择器和过滤器的打开/关闭  第三种定位样式
      isLoading: true, // 用于控制loading组件的展示和隐藏 -- 后面转js组件
      day: "", // 用于记录当前选择的日期
      localRT: "",
      districtId: -1,
      areaId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      stationId: -1
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
    cinemasList,
    loading
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
    /**
     *  用于处理滚动行为 - 实现日期选择器和过滤器吸顶的行为
     *  原理：通过判断目前滚动条的位置，改变对应的css样式，实现吸顶效果
     */
    handleScroll(e) {
      // console.log(e.target.scrollTop);
      if (e.target.scrollTop >= 400) {
        // 触发吸顶
        this.isFixed2 = true;
      } else {
        this.isFixed2 = false;
      }
    },
    /**
     *  用于处理日期选择器的选择改变时所要的操作
     */
    handleChangeDate(day) {
      this.day = day;
      this._getMoiveCinemas();
      this._getFilterCinemas();
    },
    /**
     *  用于处理全城左侧的选择
     */
    handleChangeRegionLeftIndex(id) {
      // 重复点击直接返回
      if (this.districtId === id) {
        return;
      }
      // 说明点击了左侧的全部
      if (id === -1) {
        this.districtId = id;
        this.areaId = id;
        this._getMoiveCinemas();
        this.handleClose();
        return;
      }
      this.districtId = id;
    },
    /**
     *  用于处理全城右侧的选择
     */
    handleChangeRegionRightIndex(id) {
      this.areaId = id;
      this._getMoiveCinemas();
      this.handleClose();
    },
    /**
     *  用于处理品牌的选择
     */
    handleChangeBrandIndex(id) {
      this.brandId = id;
      this._getMoiveCinemas();
      this.handleClose();
    },
    /**
     *  用于处理特色上部分的选择
     */
    handleChangeFeatureSeriveIndex(id) {
      this.serviceId = id;
    },
    /**
     *  用于处理特色下部分的选择
     */
    handleChangeFeatureHallTypeIndex(id) {
      this.hallType = id;
    },
    /**
     *  用于处理特色点击确认后的逻辑
     */
    handleFeatureCommit() {
      this._getMoiveCinemas();
      this.handleClose();
    },
    /**
     *  获取电影院列表数据相关
     */
    _getMoiveCinemas() {
      // 发送请求前比较当前电影的上映时间与现在的大小进行选择
      const p = {
        movieId: this.movieId,
        day: this.day,
        offset: 0,
        limit: 20,
        districtId: this.districtId,
        lineId: this.lineId,
        hallType: this.hallType,
        brandId: this.brandId,
        serviceId: this.serviceId,
        areaId: this.areaId,
        stationId: this.stationId,
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
        this.$nextTick(() => {
          this.isLoading = false;
        });
      });
    },
    /**
     *  获取过滤器列表数据相关
     */
    _getFilterCinemas() {
      const p = {
        movieId: this.movieId,
        day: this.day
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
    // 通过vuex计算，有bug - 在直接刷新页面后，无法获取到上映时间。
    // this.day = moment(this.rt).isBefore(moment().format("YYYY-MM-DD"))
    //   ? moment().format("YYYY-MM-DD")
    //   : this.rt;

    // 应用promise控制请求的依赖顺序
    new Promise(resolve => {
      this.isLoading = true;
      const p = {
        movieId: this.movieId
      };
      getmovieDetail(p).then(res => {
        res = res.data;
        this.detailMovie = res.detailMovie;
        this.localRT = res.detailMovie.rt; // 代表在本页面获取的上映时间

        resolve();
      });
    }).then(() => {
      this.day = moment(this.localRT).isBefore(moment().format("YYYY-MM-DD"))
        ? moment().format("YYYY-MM-DD")
        : this.localRT;
      this._getMoiveCinemas();
      this._getFilterCinemas();
    });
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
  &::-webkit-scrollbar {
    display: none;
  }
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
  .active2 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .cinemas {
    border-top: 0 none;
    margin-top: px2rem(180);
  }
  // vue - 过渡
  .fade-enter-active {
    transition: opacity 0.8s;
  }
  .fade-enter {
    opacity: 0;
  }
}
</style>
