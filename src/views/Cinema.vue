<template>
  <div id="cinema">
    <!-- 遮罩层 -->
    <div class="filter" v-show="!isClose" @click="handleClose"></div>
    <!-- 顶部 -->
    <main-header title="影院"></main-header>
    <div class="content-wrap">
      <!-- 搜索 -->
      <div class="search-hearder">
        <router-link class="city" to="/city" tag="div">
          <span class="city-name" v-text="cityName"></span>
          <i class="iconfont-jiantou"></i>
        </router-link>
        <div
          class="search-input"
          @click="
            $router.push({ path: '/search', query: { searchType: 'cinema' } })
          "
        >
          <i class="iconfont icon-sousuo"></i>
          搜影院
        </div>
      </div>
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
    <cinema-list
      :cinemas="cinemas"
      ref="cinemaList"
      @scroll.native="handleScroll"
    />
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import cinemasFilter from "@/components/MovieDetailAndCinemas/filter";
import cinemaList from "@/components/MovieDetailAndCinemas/cinemasList";
import { getFilterCinemas, getCinemaList } from "@/apis/api";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Cinema",
  data() {
    return {
      filterCinemas: {}, // 过滤器数据
      cinemas: [], // 电影院列表
      paging: {}, // 电影院数据相关
      offset: 0, // 电影院列表分页控制
      limit: 20, // 电影院列表分页的数量
      districtId: -1,
      areaId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      stationId: -1,
      isClose: true, // 用于控制 过滤器内容的 显示/隐藏
      isTouchBottom: true // 用于防止多次触底触发
    };
  },
  computed: {
    ...mapGetters(["city"]),
    cityId() {
      return this.city.id;
    },
    cityName() {
      return this.city.nm;
    }
  },
  methods: {
    /**
     *  监听子组件：cinema-list的滚动行为
     *  因为在MovieDetailAndCinemas页面中并未触发滚动，所以不会触发该事件
     */
    handleScroll(e) {
      // 获取滚动列表的总高度
      let scrollHeight = e.target.scrollHeight;
      // 当前元素的可视化高度 - 视觉可看到的在页面上的高度
      let offsetHeight = e.target.offsetHeight;
      // 当前滚动条的位置
      let scrollTop = e.target.scrollTop;
      // console.log(scrollHeight, offsetHeight, scrollTop);

      // 判断是否已经触底
      if (
        scrollTop >= scrollHeight - offsetHeight - 100 &&
        this.isTouchBottom &&
        this.paging.hasMore
      ) {
        this.isTouchBottom = false;
        this.offset += 20;
        this.gotCinemaList("more");
      }
    },
    /**
     *  控制过滤器的开关/
     */
    handleOpen() {
      this.isClose = false;
    },
    /**
     *  控制过滤器的开关/
     */
    handleClose() {
      this.isClose = true;
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
        this.gotCinemaList();
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
      this.gotCinemaList();
      this.handleClose();
    },
    /**
     *  用于处理品牌的选择
     */
    handleChangeBrandIndex(id) {
      this.brandId = id;
      this.gotCinemaList();
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
      this.gotCinemaList();
      this.handleClose();
    },
    /**
     *  获取电影院过滤器数据
     */
    gotFilterCinemas() {
      this.oldCityId = this.cityId;
      const p = {
        ci: this.cityId
      };
      getFilterCinemas(p)
        .then(res => {
          res = res.data;
          this.filterCinemas = res;
        })
        .catch(err => console.log(err));
    },
    gotCinemaList(type) {
      const p = {
        day: moment().format("YYYY-MM-DD"),
        offset: this.offset,
        limit: this.limit,
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
      getCinemaList(p)
        .then(res => {
          res = res.data;
          this.cinemas =
            type == "more" ? this.cinemas.concat(res.cinemas) : res.cinemas;
          this.paging = res.paging;
          // 请求成功则执行回调
          // callback && callback();
          this.$nextTick(() => {
            this.isTouchBottom = true;
          });
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    mainHeader,
    cinemasFilter,
    cinemaList
  },
  created() {
    this.gotFilterCinemas();
    this.gotCinemaList();
  },
  activated() {
    if (this.oldCityId !== this.cityId) {
      console.log("city改变了");
      // 发送请求
      this.gotFilterCinemas();
      this.gotCinemaList();
    }
    return;
  }
};
</script>

<style lang="scss" scoped>
#cinema {
  background-color: rgb(245, 245, 245);
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
  .content-wrap {
    position: relative;
    z-index: 9999;
    .search-hearder {
      display: flex;
      justify-content: space-between;
      align-content: center;
      background-color: rgb(245, 245, 245);
      line-height: px2rem(60);
      padding: px2rem(13) 0;
      border-bottom: px2rem(1) solid #e5e5e5;
      .city {
        font-size: px2rem(30);
        color: #666;
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
      .search-input {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: px2rem(1) solid rgb(230, 230, 230);
        border-radius: px2rem(10);
        background: #fff;
        margin: 0 px2rem(30);
        text-align: center;
        font-size: px2rem(26);
        color: #b2b2b2;
        .icon-sousuo {
          font-weight: 600;
          font-size: px2rem(36);
          margin-right: px2rem(12);
        }
      }
    }
  }
}
</style>
