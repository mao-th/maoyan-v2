<template>
  <!-- 通过一个标识符 isScroll 移除绑定的滚动事件监听 -->
  <!-- 但是在第二个处理函数必须写成带括号的调用形式并传入需要的参数才能生效 -->
  <div id="list-wrap" @scroll="isScroll && handlerTouchBottom($event)">
    <div class="movie-list">
      <div
        class="movie-list-item"
        v-for="item in movieList"
        :key="item.id"
        @click="handleToMovieDetailAndCinemas(item.id, item.rt)"
      >
        <!-- movie-image -->
        <div class="movie-item-left">
          <img class="image" :src="item.img | imgFilter" alt="影片海报" />
          <span class="promotion" v-if="item.haspromotionTag">特惠</span>
        </div>
        <!-- movie-info -->
        <div class="movie-info-wrap">
          <div class="movie-info">
            <div class="title">
              <div class="movie-name" v-text="item.nm"></div>
              <i v-if="item.version" :class="'version ' + item.version"></i>
              <i v-if="item.preShow" class="pre-show"></i>
            </div>
            <!-- 优化分数为0的展示 -->
            <div v-if="item.sc !== 0" class="score">
              <span>观众评</span>
              <span class="sc" v-text="' ' + item.sc"></span>
            </div>
            <div v-else class="score">
              <span class="sc" v-text="item.wish + ' '"></span>
              <span>人想看</span>
            </div>
            <div class="actor">主演: {{ item.star }}</div>
            <div class="show-info" v-text="item.showInfo"></div>
          </div>
          <!-- movie-btn -->
          <!-- <div class="btn-goupiao">购票</div> -->
          <!-- btn使用样式比较多，定义成组件进行管理 -->
          <mao-button :btnNum="item.showst"></mao-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieList } from "@/apis/api";
import maoButton from "@/components/common/mao-button";
import mixin from "@/common/mixin";
export default {
  name: "movie-list",
  mixins: [mixin], // 通过混入加载更多api
  props: {
    city: Object
  },
  data() {
    return {
      movieList: [], // 电影列表
      movieIds: [], // 该列表保存了目前正在热映电影的所有电影id信息，在加载更多的时候需要到
      oldCityId: 0
    };
  },
  computed: {
    // cityId() {
    //   return this.city.id;
    // }
  },
  filters: {
    imgFilter(imgUrL) {
      return imgUrL.replace("/w.h", "/128.180");
    }
  },
  components: {
    maoButton
  },
  methods: {
    /**
     *  发送ajax请求 - 根据城市id获取对应城市电影列表数据
     */
    gotMovieList() {
      this.oldCityId = this.cityId; // 记录上一次请求的城市id

      const p = {
        ci: this.cityId
      };
      getMovieList(p)
        .then(res => {
          res = res.data;
          this.movieList = res.movieList;
          this.movieIds = res.movieIds;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     *  跳转到MovieDetailAndCinemas页面
     */
    handleToMovieDetailAndCinemas(movieId, rt) {
      this.$store.commit("SET_RT", rt);
      this.$router.push("/movieDetailAndCinemas/" + movieId);
    }
  },
  created() {
    this.gotMovieList();
  },
  activated() {
    if (this.oldCityId !== this.cityId) {
      console.log("city改变了");
      // 发送请求
      this.gotMovieList();
    }
    return;
  }
};
</script>

<style lang="scss" scoped>
#list-wrap {
  position: absolute;
  top: px2rem(190);
  left: 0;
  right: 0;
  bottom: px2rem(96);
  overflow-y: scroll;
  padding: 0 px2rem(30);
  font-size: 0;
  &::-webkit-scrollbar {
    // 隐藏滚动条
    width: 0 !important;
    height: 0 !important;
  }
  .movie-list {
    .movie-list-item {
      display: flex;
      padding: px2rem(24) px2rem(28) px2rem(24) 0;
      font-size: $font-minor;
      color: $text-normal;
      border-bottom: 1px solid #dbd6d6;
      justify-content: space-between;
      .movie-item-left {
        position: relative;
        .image {
          width: px2rem(128);
          height: px2rem(180);
        }
        .promotion {
          display: inline-block;
          width: px2rem(52);
          line-height: px2rem(30);
          text-align: center;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #f90;
          font-size: px2rem(20);
          color: #fff;
        }
      }
      .movie-info-wrap {
        flex: 1; // 使中间movieinfo信息占满剩余空间
        margin-left: px2rem(24);
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 0; // 为了让省略号生效
        .movie-info {
          margin-right: px2rem(10);
          @include ellipsis();
          .title {
            display: flex;
            align-items: center;
            margin-bottom: px2rem(16);
            line-height: px2rem(48);
            max-height: px2rem(48);
            .movie-name {
              display: inline-block;
              color: $text-title;
              font-size: px2rem(34);
              font-weight: 700;
              padding-right: px2rem(10);
              @include ellipsis();
            }
          }
          .score {
            line-height: 1;
            @include ellipsis();
            .sc {
              color: $text-number;
              font-size: $font-normal;
              font-weight: 700;
            }
          }
          .actor {
            @include ellipsis();
            line-height: px2rem(27);
            margin-top: px2rem(12);
          }
          .show-info {
            @include ellipsis();
            margin-top: px2rem(12);
            line-height: px2rem(27);
            margin-bottom: px2rem(14);
          }
        }
      }
    }
  }
}
</style>
