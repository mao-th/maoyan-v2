<template>
  <transition name="detail">
    <div id="movie-detail-wrap" v-show="show">
      <!-- 顶部 -->
      <main-header :title="title">
        <i class="back" slot="left" @click="handleHide"></i>
      </main-header>
      <!-- 电影信息 -->
      <movie-detail :detailMovie="detailMovie" :show="show"></movie-detail>
      <!-- 电影简介 -->
      <div class="desc-wrap">
        <div class="desc-btn">特惠购票</div>
        <div class="desc-content" :class="{ active: showDesc }">
          <p v-text="dra"></p>
          <div class="jiantou" @click="handleShowDesc"></div>
        </div>
      </div>
      <!-- 观影小贴士 -->
      <div class="tips" v-if="egg">
        <h3>观影小贴士</h3>
        <div class="tip">
          <img
            src="//p0.meituan.net/mmdb/8f52014d6b15bf93415d10cdcd16cbf52917.png"
            alt="蛋蛋"
          />
          <span>有彩蛋啊...请自行留意啊...</span>
        </div>
      </div>
      <!-- 影片图片 -->
      <div class="media">
        <h3 class="title">媒体库</h3>
        <div class="photos">
          <ul>
            <li class="first-photo">
              <img :src="videoImg" alt="图片咯" />
              <i class="play"></i>
            </li>
            <li class="photo-item" v-for="(item, index) in photos" :key="index">
              <img :src="item | filterImg" alt="" />
            </li>
          </ul>
        </div>
        <div class="link-group">
          <div class="link">
            <span class="link-text">视频</span>
            <span class="link-num" v-text="vnum"></span>
            <i></i>
          </div>
          <div class="link">
            <span class="link-text">剧照</span>
            <span class="link-num" v-text="pn"></span>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import movieDetail from "@/components/MovieDetailAndCinemas/movieDetail";
export default {
  name: "MovieDetail",
  props: {
    detailMovie: Object
  },
  data() {
    return {
      show: false,
      showDesc: false
    };
  },
  computed: {
    title() {
      return this.detailMovie.nm || "毛毛电影v2";
    },
    movieId() {
      return this.detailMovie.id;
    },
    dra() {
      return this.detailMovie.dra;
    },
    egg() {
      return this.detailMovie.egg || false;
    },
    photos() {
      return this.detailMovie.photos || [];
    },
    videoImg() {
      return this.detailMovie.videoImg || "";
    },
    vnum() {
      return this.detailMovie.vnum || 0;
    },
    pn() {
      return this.detailMovie.pn || 0;
    }
  },
  filters: {
    filterImg(imgUrl) {
      return imgUrl.replace("/w.h", "/180.140");
    }
  },
  components: {
    movieDetail,
    mainHeader
  },
  methods: {
    handleShow() {
      this.show = true;
    },
    handleHide() {
      this.show = false;
    },
    handleShowDesc() {
      this.showDesc = !this.showDesc;
    }
  }
};
</script>

<style lang="scss" scpoed>
#movie-detail-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  transform: translate3d(0, 0, 0);
  z-index: 99;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  // 过渡效果 - 注意添加过渡样式的时候需要关联上父元素
  &.detail-enter,
  &.detail-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &.detail-enter-active,
  &.detail-leave-active {
    opacity: 0.55;
    transition: all 0.4s linear;
  }
  .desc-wrap {
    background-color: #fff;
    position: relative;
    font-size: px2rem(30);
    color: #555;
    padding: px2rem(30) px2rem(30) 0 px2rem(30);
    border-bottom: px2rem(1) solid #e5e5e5;
    margin-bottom: px2rem(20);
    .desc-btn {
      padding: px2rem(20);
      font-size: px2rem(32);
      color: #fff;
      text-align: center;
      background: #e54847;
      margin-bottom: px2rem(20);
      border-radius: px2rem(8);
      line-height: 1;
    }
    .desc-content {
      position: relative;
      max-height: px2rem(180);
      overflow: hidden;
      p {
        margin-bottom: px2rem(50);
      }
      &.active {
        max-height: 5000px;
        .jiantou::after {
          transform: rotate(45deg);
        }
      }
      .jiantou {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: px2rem(40);
        background: #fff;
        text-align: center;
        line-height: 1;
        &::after {
          display: inline-block;
          content: "";
          width: px2rem(16);
          height: px2rem(16);
          border-top: px2rem(4) solid #555;
          border-left: px2rem(4) solid #555;
          transform: rotate(-135deg);
        }
      }
    }
  }
  .tips {
    background-color: #fff;
    border-bottom: px2rem(1) solid #e5e5e5;
    margin-bottom: px2rem(20);
    h3 {
      font-size: px2rem(30);
      padding: px2rem(20) px2rem(30);
      font-weight: 400;
      color: #666;
      border-bottom: px2rem(1) solid #e5e5e5;
    }
    .tip {
      font-size: px2rem(28);
      color: #555;
      margin-left: px2rem(30);
      height: px2rem(80);
      line-height: px2rem(80);
      & > img {
        margin-top: px2rem(20);
      }
      & > span {
        margin-left: px2rem(20);
      }
    }
  }
  .media {
    width: 100%;
    background-color: #fff;
    .title {
      padding: px2rem(20) px2rem(30);
      font-size: px2rem(30);
      color: #666;
    }
    .photos {
      width: 100%;
      padding-left: px2rem(30);
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        display: flex;
        .first-photo {
          position: relative;
          flex-shrink: 0;
          width: px2rem(250);
          height: px2rem(140);
          margin-right: px2rem(10);
          .play {
            display: inline-block;
            position: absolute;
            right: px2rem(10);
            bottom: px2rem(4);
            width: px2rem(40);
            height: px2rem(40);
            border: px2rem(2) solid #fff;
            border-radius: 50%;
            text-align: center;
            line-height: px2rem(40);
            background: #333;
            opacity: 0.7;
            &::after {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-20%, -50%);
              content: "";
              display: inline-block;
              width: 0;
              height: 0;
              border: px2rem(12) solid transparent;
              border-left-color: #fff;
            }
          }
          & > img {
            width: px2rem(250);
            height: px2rem(140);
          }
        }
        .photo-item {
          flex-shrink: 0;
          width: px2rem(180);
          height: px2rem(140);
          margin-left: px2rem(10);
          & > img {
            width: px2rem(180);
            height: px2rem(140);
          }
        }
      }
    }
    .link-group {
      font-size: px2rem(28);
      color: #666;
      padding-left: px2rem(30);
      display: flex;
      .link {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(80);
        line-height: px2rem(80);
        .link-text {
          flex: 1;
        }
        .link-num {
          flex-shrink: 0;
          margin-right: px2rem(20);
        }
        i {
          display: inline-block;
          width: px2rem(14);
          height: px2rem(14);
          border-top: px2rem(4) solid #888;
          border-left: px2rem(4) solid #888;
          transform: rotate(135deg);
          margin-right: px2rem(30);
        }
      }
    }
  }
}
</style>
