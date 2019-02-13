<template>
  <div id="shows-wrap">
    <!-- 头部 -->
    <main-header :title="nm">
      <div
        :to="'/movieDetailAndCinemas/' + movieId"
        class="back"
        slot="left"
        @click="$router.back()"
      ></div>
    </main-header>
    <div class="shows-content" v-if="movies.length">
      <!-- 地址 -->
      <shows-address
        class="shows-address"
        :cinemaData="cinemaData"
      ></shows-address>
      <!-- 滑动影片区域 + 电影信息 -->
      <shows-movie-list
        class="shows-movie-list"
        :movies="movies"
        :movieIndex="movieIndex"
        @changeMovieIndex="handleChangeMovieIndex"
      ></shows-movie-list>
      <!-- 电影信息 -->
      <shows-movie-info
        class="shows-movie-info"
        :movieInfo="movieInfo"
      ></shows-movie-info>
      <!-- 日期切换tab标签 -->
      <date-selector
        :shows="shows"
        @changeDateIndex="handleChangeDateIndex"
        ref="dateSelector"
      ></date-selector>
      <!-- 影片当日播放时间信息 -->
      <show-time-list
        :shows="shows"
        :vipInfo="vipInfo"
        :stone="stone"
        :dur="dur"
        :showsIndex="showsIndex"
        @changeDateIndex="handleChangeDateIndex"
      ></show-time-list>
      <!-- 影院套餐 -->
      <shows-deal-list :dealList="dealList"></shows-deal-list>
    </div>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import showsAddress from "@/components/Shows/shows-address";
import showsMovieList from "@/components/Shows/shows-movieList";
import dateSelector from "@/components/Shows/dateSelector";
import showTimeList from "@/components/Shows/showTimeList";
import showsMovieInfo from "@/components/Shows/shows-movieInfo";
import showsDealList from "@/components/Shows/shows-dealList";
import { getCinemaDetail } from "@/apis/api";
export default {
  name: "Shows",
  data() {
    return {
      cinemaData: {}, // 电影院信息
      showData: {}, // 影片相关信息
      movieIndex: 0, // 当前选取的影片索引
      showsIndex: 0, // showTimeList的索引
      stone: {}, // 字体路径
      dealList: {} // 影院套餐
    };
  },
  computed: {
    movieId() {
      // 当前选取的电影Id
      return this.$route.query.movieId;
    },
    cinemaId() {
      // 当前电影院id
      return this.$route.params.id;
    },
    nm() {
      // 电影院名称
      return this.cinemaData.nm || "毛毛电影v2";
    },
    movies() {
      return this.showData.movies || [];
    },
    movieInfo() {
      return this.movies[this.movieIndex] || {};
    },
    dur() {
      return this.movieInfo.dur || 0;
    },
    shows() {
      return this.movieInfo.shows || [];
    },
    vipInfo() {
      return this.showData.vipInfo || [];
    }
  },
  components: {
    mainHeader,
    showsAddress,
    showsMovieList,
    showsMovieInfo,
    dateSelector,
    showTimeList,
    showsDealList
  },
  methods: {
    handleChangeDateIndex(index) {
      this.showsIndex = index;
      // 这句代码的作用是 当用户是从 点击查看明天场次的按钮 触发时，需要通知修改组件date-selector中的状态
      this.$refs.dateSelector.selectIndex = index;
    },
    handleChangeMovieIndex(index, movieId) {
      this.movieIndex = index;
      /**
       *  新增： 在切换了影片信息后把url的查询字符串也进行替换
       */
      this.$router.replace({
        path: "/shows/" + this.cinemaId,
        query: {
          movieId: movieId
        }
      });
    },
    _getCinemaDetail() {
      this.$loading.show();
      const p = {
        cinemaId: this.cinemaId,
        movieId: this.movieId
      };

      getCinemaDetail(p)
        .then(res => {
          res = res.data;
          this.cinemaData = res.cinemaData;
          this.showData = res.showData;
          this.movieIndex = res.movieIndex;
          this.stone = res.stone;
          this.dealList = res.dealList;
          this.$nextTick(() => {
            setTimeout(() => {
              this.$loading.remove();
            }, 500);
          });
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this._getCinemaDetail();
  }
};
</script>

<style lang="scss" scoped>
#shows-wrap {
  height: 100%;
  font-size: px2rem(26);
  color: #999;
  background-color: #f0f0f0;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .shows-content {
    position: relative;
    .shows-address {
      position: relative;
      z-index: 1;
    }
    .shows-movie-info {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
