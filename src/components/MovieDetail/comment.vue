<template>
  <div id="comment-wrap">
    <h3 class="comment-title">讨论</h3>
    <div class="comment-selected">精选</div>
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in comments" :key="index">
        <div class="item-left">
          <img :src="item.avatarurl" alt="头像" />
        </div>
        <div class="item-right">
          <div class="item-title">
            <span v-text="item.nickName">Mr.J</span>
            <span></span>
          </div>
          <div class="item-sc">给这部电影打了{{ item.score * 2 }}分</div>
          <p class="item-message" v-text="item.content"></p>
          <div class="item-info">
            <span class="comment-time">{{ item.time }}</span>
            <div class="info-right">
              <span class="comment-up">
                <i class="iconfont icon-like"></i>
                {{ item.approve }}
              </span>
              <span class="comment-count">
                <i class="iconfont icon-pinglun"></i>
                {{ item.reply }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-footer">
      <span>查看全部{{ total }}条评论</span>
      <i class="more-comment"></i>
    </div>
  </div>
</template>

<script>
import { getMovieComments } from "@/apis/api";
export default {
  name: "comment",
  data() {
    return {
      comments: [],
      total: 0
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    const p = {
      movieId: this.movieId
    };
    getMovieComments(p).then(res => {
      res = res.data;
      this.total = res.total;
      if (res.hcmts) {
        this.comments = res.hcmts.slice(0, 3);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
#comment-wrap {
  color: #666;
  font-size: px2rem(28);
  border-top: px2rem(1) solid #e5e5e5;
  background-color: #fff;
  .comment-title {
    font-size: px2rem(28);
    line-height: px2rem(46);
    padding: px2rem(20) px2rem(30);
    border-bottom: px2rem(1) solid #e5e5e5;
  }
  .comment-selected {
    padding: px2rem(23) 0 px2rem(8) px2rem(30);
  }
  .comment-list {
    padding-left: px2rem(30);
    .comment-item {
      display: flex;
      padding: px2rem(15) px2rem(25) px2rem(15) 0;
      border-bottom: px2rem(1) solid #e5e5e5;
      &:last-child {
        border-bottom: 0 none;
      }
      .item-left {
        width: px2rem(68);
        height: px2rem(68);
        img {
          width: px2rem(68);
          height: px2rem(68);
          border-radius: 50%;
        }
      }
      .item-right {
        flex: 1;
        margin-left: px2rem(20);
        .item-title {
          color: #333;
          font-size: px2rem(24);
        }
        .item-sc {
          color: #999;
          font-size: px2rem(22);
        }
        .item-message {
          color: #333;
        }
        .item-info {
          color: #999;
          font-size: px2rem(24);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: px2rem(20);
          margin-bottom: px2rem(5);
          .info-right {
            & > span {
              line-height: 1;
              display: inline-block;
              margin-left: px2rem(20);
              border: px2rem(1) solid #ccc;
              padding: px2rem(10) px2rem(24);
              // 实现两端成半圆
              border-radius: px2rem(100);
            }
            .comment-up {
              .icon-like {
                font-size: px2rem(26);
              }
            }
            .comment-count {
              .icon-pinglun {
                font-size: px2rem(26);
              }
            }
          }
        }
      }
    }
  }
  .comment-footer {
    height: px2rem(80);
    line-height: px2rem(80);
    border-top: px2rem(1) solid #e5e5e5;
    border-bottom: px2rem(1) solid #e5e5e5;
    text-align: center;
    color: #f63;
    font-weight: lighter;
  }
}
</style>
