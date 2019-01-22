<template>
  <div id="movie-list-v2" @scroll="isScroll && handlerTouchBottom($event)">
    <!-- 最受欢迎列表 -->
    <div class="top-list-wrap"> 
      <div class="list-title">近期最受期待</div>
      <div class="list-wrap" @scroll.prevent="isScrollR && handlerTouchRight($event)">
        <div class="list-item" v-for="item in mostList" :key="item.id">
          <div class="movie-img">
            <!--  图片的展示在PC端观察会出现模糊的情况，但是在手机端观察正常（可能是hotcss中的东西导致） -->
            <img class="image" :src="item.img | imgFilter1" alt="影片海报">
            <div class="bottom-wrap"></div>
            <div class="person-wish" v-text="item.wish + '人想看'"></div>
            <div class="collection">
              <span class="icon-heart"></span>
            </div>
          </div>
          <div class="movie-name" v-text="item.nm"></div>
          <div class="show-date">{{item.comingTitle | textFilter}}</div>
        </div>
      </div>
    </div>
    <!-- 电影列表 -->
    <div class="bottom-list-wrap">
      <div v-for="(list, key) in regulComingObject" :key="key">
        <div class="list-title" v-text="key"></div>
        <div class="movie-list">
          <div class="list-item" v-for="item in list" :key="item.id">
            <div class="movie-img">
              <img class="image" :src="item.img | imgFilter2" alt="影片海报">
              <span class="promotion" v-if="item.haspromotionTag">特惠</span>
            </div>
            <div class="movie-info">
              <div class="info-title">
                <span class="movie-name" v-text="item.nm"></span>
                <i :class="'version '+item.version"></i>
                <i v-if="item.preShow" class="pre-show"></i>
              </div>
              <div class="wantsee">
                <span class="person" v-text="item.wish + ' '">99107</span>
                <span>人想看</span>
              </div>
              <div class="actor" v-text="'主演: ' + item.star"></div>
              <div class="showinfo" v-text="item.rt + '上映'"></div>
            </div>
            <mao-button :btnNum="item.showst"></mao-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMostExpected, getComingList } from "@/apis/api";
import mixin from "@/common/mixin";
import maoButton from "@/components/common/mao-button";
export default {
  name: "movie-list2",
  mixins: [mixin], // 通过混入加载更多api
  props: {
    city: Object
  },
  data() {
    return {
      mostList: [], // 最受欢迎电影列表
      offset: 0, // 最受欢迎加载更多控制器
      movieList: [],
      movieIds: [],
      isTouchRight: true,
      isScrollR: true,
      oldCityId: 0
    };
  },
  computed: {
    // cityId() {
    //   return this.city.id;
    // },
    regulComingObject() {
      let regulComingObj = {};
      this.movieList.forEach((item, index) => {
        let date = item.comingTitle;
        if (index == 0) {
          regulComingObj[date] = [];
        } else {
          // 与当前循环的前一个进行比较
          if (date != this.movieList[index - 1].comingTitle) {
            regulComingObj[date] = [];
          }
        }
        regulComingObj[date].push(item);
      });
      return regulComingObj;
    }
  },
  components: {
    maoButton
  },
  filters: {
    imgFilter1(imgUrl) {
      return imgUrl.replace("/w.h", "/170.230");
    },
    imgFilter2(imgUrl) {
      return imgUrl.replace("/w.h", "/128.180");
    },
    textFilter(showInfo) {
      // 尝试运用下展开运算符
      return showInfo.split(" ")[0];
    }
  },
  methods: {
    /**
     *  触发触底
     */
    handlerTouchRight(e) {
      let scrollLeft = e.target.scrollLeft;
      let totalW = e.target.scrollWidth;
      let offsetWidth = e.target.offsetWidth;

      if (
        this.paging.hasMore &&
        this.isTouchRight &&
        scrollLeft >= totalW - offsetWidth - 100
      ) {
        this.isTouchRight = false;
        this.offset += 10;
        this.gotmostExpected("more");
      }
    },
    /**
     *  获取最受欢迎电影数据
     */
    gotmostExpected(flag) {
      this.oldCityId = this.cityId;
      const p = {
        ci: this.cityId,
        limit: 10,
        offset: this.offset,
        token: ""
      };
      // 获取上部分列表数据
      getMostExpected(p)
        .then(res => {
          res = res.data;
          if (flag === "more") {
            this.mostList = this.mostList.concat(res.coming);
          } else {
            this.mostList = res.coming;
          }
          this.paging = res.paging;

          if (!this.paging.hasMore) {
            this.isScrollR = false;
          }
          this.$nextTick(() => {
            this.isTouchRight = true;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotComingList() {
      const p1 = {
        ci: this.cityId,
        limit: 10,
        token: ""
      };

      getComingList(p1).then(res => {
        res = res.data;
        this.movieList = res.coming;
        this.movieIds = res.movieIds;
      });
    }
  },
  created() {
    this.gotmostExpected();

    // 获取下部分列表数据
    this.gotComingList();
  },
  activated() {
    if (this.oldCityId !== this.cityId) {
      console.log("city改变了");
      this.gotmostExpected();
      this.gotComingList();
    }
    return;
  }
};
</script>

<style lang="scss" scoped>
#movie-list-v2 {
  position: absolute;
  left: 0;
  right: 0;
  top: px2rem(190);
  bottom: px2rem(98);
  background-color: #f5f5f5;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  // 上部分列表样式
  .top-list-wrap {
    background-color: #fff;
    padding: px2rem(24) 0 px2rem(24) px2rem(30);
    height: px2rem(384);
    margin-bottom: px2rem(20);
    .list-title {
      font-size: px2rem(28);
      color: #333;
      margin-bottom: px2rem(24);
    }
    .list-wrap {
      width: 94%;
      // 疑问1：使用 flex 布局会在最后一个item右侧并无边距的问题
      // display: flex;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
      }
      .list-item {
        display: inline-block;
        margin-right: px2rem(30); // 疑问1：在最后一个子元素不生效
        width: px2rem(170);
        .movie-img {
          position: relative;
          width: px2rem(170);
          height: px2rem(230);
          margin-bottom: px2rem(12);
          .image {
            width: 100%;
            height: 100%;
          }
          .bottom-wrap {
            display: inline-block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: px2rem(70);
            background: linear-gradient(to bottom, rgba(77, 77, 77, 0), #000);
          }
          .person-wish {
            position: absolute;
            bottom: px2rem(4);
            left: px2rem(10);
            font-size: px2rem(22);
            color: $text-number;
            font-weight: 600;
            z-index: 1;
            @include ellipsis();
          }
          .collection {
            width: px2rem(54);
            line-height: px2rem(54);
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(61, 63, 71, 0.6);
            text-align: center;
            border-bottom-right-radius: px2rem(20);
            .icon-heart {
              display: inline-block;
              width: px2rem(20);
              height: px2rem(20);
              vertical-align: middle; // 为了让心形垂直居中
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAAAytJREFUWAnVmLtrFFEUh3cWFAtRE5FEEUREsFAkooUIgl3+CUEU7LVR1LBIMERCLFLZRG1CrFJYpLBQENRGC4n4wBeKRUQ2PlAQX+v3m70z7MzemZ3HZp05cPbce86553w7O7Mzc51KjDQaDYfwDvSAseux69Cv6Ef0LXoHXXAc5y82UqhVJbgLPYhuQTega9DPaB19ht6VpVYDaxUBWYUGewkcQzdbE4LOJabXaHQ76G7OqHWI0RG0v+mJ/XxPdJpaD2xZbcAUX0XiSXS/bUEH3yPil2imL1Chln6RE+huzVPKffJV60frugAwDfoI1tBtrUkpx4vknzVrLmAHU65vTX/F5DzQnzynDwzsCpwX0e1eMIfV+S3ReZpXXlDgFNC/VEgXgifHGXQDVvUE2g1Y1RKT2FxxgTm6cg4bXxHNsGH0j/DhIlKGmFzGKuSbCAyFgkWcDsG6UaeE/m/LIvsEvKcstGIV8ECJgAcErJtFWaRPwCvLQitWAbv3/ZJALwlYj3ZlkbqA9YBRFnkp4HtloRWrgJ+g/uNbgeHF+LTKY5tebWYLDOqhzYpVR1hyE33njor5ITYxNp/WIP/DeBINvI4ooQAipknD6D9eVnC8JjCOxr799vgLiGXcsLmtvVPCnRB4yGDanRTjQ2/PYvIlACwvCTcwM37G/xvMGJYAQRuwoiRex8wFMns7mTMMbV2twMpiwVXMfNuK5XfMm97WTpHAJvsy9pZ15fI41Us9IyUWmG+qPa4ptBe3b/WYMj2zAWsVBfQfPYEGrlbFuiiqPWF6xZaNPcLeSgr9ZjyGLni+LlrVHDM9OpZNBKwqFPyJGUWfa94lUa1RUztRSX9vLVE2SewNrMboaG9NuiYi7w3+M8B+i4hb3amBVQXotRjdxpPsHWtJWLQHfBrYL+FAp3kmYBUFWnu/2u1Mu03wgTXajaxjU0tmYHUCehAj6H7NE4ggBSvoTJL4orNVp/Eifm1eJ/lplXMuD6wYcgGrAAA6H0fQ75pHiGIjJjciJZk7N7DaAKIrvobarnj5aiaHYT7JdQ6HW5sL8Sj+nSb2GHsF2EwXWLi+5v8ArR6xIZ+h44wAAAAASUVORK5CYII=);
              background-repeat: no-repeat;
              background-size: 100%;
            }
          }
        }
        .movie-name {
          font-size: $font-minor;
          font-weight: 700;
          color: #222;
          margin-bottom: px2rem(6);
          @include ellipsis();
        }
        .show-date {
          font-size: px2rem(24);
          color: #999;
        }
      }
    }
  }
  // 下部分列表样式
  .bottom-list-wrap {
    background-color: #fff;
    font-size: px2rem(26);
    color: #666;
    .list-title {
      font-size: px2rem(28);
      color: $text-title;
      padding: px2rem(24) px2rem(30) 0 px2rem(30);
    }
    .movie-list {
      padding: 0 px2rem(30);
      .list-item {
        display: flex;
        justify-content: space-between;
        padding-right: px2rem(28);
        padding: px2rem(24) px2rem(28) px2rem(24) 0;
        border-bottom: 1px solid #dbd6d6;
        .movie-img {
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
        .movie-info {
          flex: 1;
          min-width: 0;
          padding-right: px2rem(10);
          padding-left: px2rem(20);
          .info-title {
            font-size: px2rem(34);
            font-weight: 700;
            color: #333;
            margin-bottom: px2rem(14);
            .movie-name {
              padding-right: px2rem(10);
            }
          }
          .wantsee {
            line-height: 1;
            .person {
              font-size: $font-normal;
              font-weight: 700;
              color: $text-number;
            }
          }
          .actor {
            margin-top: px2rem(14);
            line-height: px2rem(26);
            @include ellipsis();
          }
          .showinfo {
            margin-top: px2rem(14);
            line-height: 1;
            @include ellipsis();
          }
        }
      }
    }
  }
}
</style>
