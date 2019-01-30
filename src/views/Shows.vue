<template>
  <div id="shows-wrap">
    <!-- 头部 -->
    <main-header :title="nm">
      <router-link :to="'/movieDetailAndCinemas/'+movieId" class="back" slot="left"></router-link>
    </main-header>
    <!-- 地址 -->
    <shows-address :cinemaData="cinemaData"></shows-address>
    <!-- 滑动影片区域 + 电影信息 -->
    <div class="movie-list-wrap"></div>
    <!-- 电影信息 -->
    <shows-movie-info :movieInfo="movieInfo"></shows-movie-info>
    <!-- 日期切换tab标签 -->
    <date-selector :shows="shows" @changeDateIndex="handleChangeDateIndex"></date-selector>
    <!-- 影片当日播放时间信息 -->
    <show-time-list :plist="plist" :vipInfo="vipInfo" :stone="stone"></show-time-list>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import showsAddress from "@/components/Shows/shows-address";
import dateSelector from "@/components/Shows/dateSelector";
import showTimeList from "@/components/Shows/showTimeList";
import showsMovieInfo from "@/components/Shows/shows-movieInfo";
import { getCinemaDetail } from "@/apis/api";
export default {
  name: "Shows",
  data() {
    return {
      cinemaData: {}, // 电影院信息
      showData: {}, // 影片相关信息
      movieIndex: 0, // 当前选取的影片索引
      showsIndex: 0, // showTimeList的索引
      stone: {} // 字体路径
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
    shows() {
      return this.movieInfo.shows || [];
    },
    showsByIndex() {
      return this.shows[this.showsIndex] || {};
    },
    plist() {
      return this.showsByIndex.plist || [];
    },
    vipInfo() {
      return this.showData.vipInfo || [];
    }
  },
  components: {
    mainHeader,
    showsAddress,
    showsMovieInfo,
    dateSelector,
    showTimeList
  },
  methods: {
    handleChangeDateIndex(index) {
      this.showsIndex = index;
    },
    _getCinemaDetail() {
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
        })
        .catch(err => console.log(err));
    }
  },
  activated() {
    this._getCinemaDetail();
  }
};
</script>

<style lang="scss" scoped>
#shows-wrap {
  height: 100%;
  font-size: px2rem(26);
  color: #999;
  background-color: #f5f5f5;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .movie-list-wrap {
    height: px2rem(270);
    background-color: #000;
    opacity: 0.55;
  }
}
</style>
