<template>
  <div id="movie-list-v2" @scroll="isScroll && handlerTouchBottom($event)">
    <!-- 最受欢迎列表 -->
    <div class="top-list-wrap"> 
      <div class="list-title">近期最受欢迎</div>
      <div class="list-wrap" @scroll.prevent="isScrollR && handlerTouchRight($event)">
        <div class="list-item" v-for="item in mostList" :key="item.id">
          <div class="movie-img">
            <img class="image" :src="item.img | imgFilter1" alt="影片海报">
          </div>
          <div class="movie-name" v-text="item.nm"></div>
          <div class="show-date" v-text="item.comingTitle"></div>
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
            </div>
            <div class="movie-info">
              <div class="info-title">
                <div class="movie-name" v-text="item.nm"></div>
                <i></i>
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
  data() {
    return {
      mostList: [], // 最受欢迎电影列表
      offset: 0, // 最受欢迎加载更多控制器
      movieList: [],
      movieIds: [],
      isTouchRight: true,
      isScroll: true,
      isScrollR: true
    };
  },
  computed: {
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
    }
    // textFilter(showInfo) { // 尝试运用下展开运算符
    //   return [...showInfo].splice(11, 3, "").join("");
    // }
  },
  methods: {
    /**
     *  触发触底
     */
    handlerTouchRight(e) {
      let scrollLeft = e.target.scrollLeft;
      let totalW = e.target.scrollWidth;
      let offsetWidth = e.target.offsetWidth;
      console.log(this.offset);
      if (
        this.paging.hasMore &&
        this.isTouchRight &&
        scrollLeft >= totalW - offsetWidth - 100
      ) {
        this.isTouchRight = false;
        this.offset += 10;
        this.gotmostExpected();
      }
    },
    /**
     *  获取最受欢迎电影数据
     */
    gotmostExpected() {
      const p = {
        ci: 280,
        limit: 10,
        offset: this.offset,
        token: ""
      };
      // 获取上部分列表数据
      getMostExpected(p)
        .then(res => {
          res = res.data;
          this.mostList = this.mostList.concat(res.coming);
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
    }
  },
  created() {
    this.gotmostExpected();

    // 获取下部分列表数据
    const p1 = {
      ci: 280,
      limit: 10,
      token: ""
    };

    getComingList(p1).then(res => {
      res = res.data;
      this.movieList = res.coming;
      this.movieIds = res.movieIds;
    });
  }
};
</script>

<style lang="scss" scoped>
#movie-list-v2 {
  position: absolute;
  left: 0;
  right: 0;
  top: px2rem(188);
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
    padding: px2rem(12) 0 px2rem(24) px2rem(30);
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
      &::-webkit-scrollbar {
        height: 0 !important;
      }
      .list-item {
        display: inline-block;
        margin-right: px2rem(30); // 疑问1：在最后一个子元素不生效
        width: px2rem(170);
        .movie-img {
          width: px2rem(170);
          margin-bottom: px2rem(12);
          .image {
            width: 100%;
            height: px2rem(230);
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
          .image {
            width: px2rem(128);
            height: px2rem(180);
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
