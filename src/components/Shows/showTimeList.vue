<template>
  <div id="showtime-list-wrap">
    <div class="vip-tips" v-for="(item, index) in vipInfo" :key="index">
      <div class="label" v-text="item.tag"></div>
      <div class="label-text" v-text="item.title"></div>
      <div class="process" v-text="item.process"></div>
    </div>
    <div class="showtime-list" v-if="plist.length">
      <div class="showtime-item" v-for="(item, index) in plist" :key="index">
        <div class="time-block">
          <div class="start-time" v-text="item.tm"></div>
          <div class="end-time">
            {{ item.tm | endTimeFilter(item.dt, dur) }} 散场
          </div>
        </div>
        <div class="info-block">
          <div class="language" v-text="item.lang + ' ' + item.tp"></div>
          <div class="halltype" v-text="item.th"></div>
        </div>
        <div class="price">
          <div class="sell-price">
            <span>¥</span>
            <!-- <span v-html="item.sellPr"></span> -->
            <span v-html="20"></span>
          </div>
          <div class="vip-price" v-if="item.vipPriceName">
            <span v-text="item.vipPriceName"></span>
            <span v-text="'¥' + item.vipPrice"></span>
          </div>
          <div class="vip-desc" v-text="item.extraDesc"></div>
        </div>
        <mao-button :btnNum="3"></mao-button>
      </div>
    </div>
    <div class="no-seat" v-else>
      <img
        src="data:image/png;base64,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"
        alt=""
      />
      <div class="text">今日场次已映完</div>
      <div
        class="next-date-btn"
        @click="handleToNextDate"
        v-if="shows[showsIndex + 1]"
      >
        点击查看{{ nextDay }}场次
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import maoButton from "@/components/common/mao-button";
export default {
  name: "showTime-list",
  props: {
    shows: Array,
    vipInfo: Array,
    stone: Object,
    dur: Number,
    showsIndex: Number
  },
  computed: {
    showsByIndex() {
      // 根据索引获取到的show对象 ： 日期及其场次信息等等..
      return this.shows[this.showsIndex] || {};
    },
    plist() {
      // 获取到指定show对象中的plist ： 场次信息
      return this.showsByIndex.plist || [];
    },
    // fonts / src 是用于解决价格的文字格式
    fonts() {
      return this.stone.fonts || {};
    },
    src() {
      console.log(this.fonts.woff);
      return this.fonts.woff || "";
    },
    nextDay() {
      // 计算明天的日期
      return moment()
        .add("day", 1)
        .format("MM月DD日");
    }
  },
  filters: {
    endTimeFilter(startTime, dateTime, dur) {
      startTime = dateTime + " " + startTime;
      return moment(startTime)
        .add(dur, "minutes")
        .format("HH:mm");
    }
  },
  methods: {
    handleToNextDate() {
      this.$emit("changeDateIndex", this.showsIndex + 1);
    }
  },
  components: {
    maoButton
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#showtime-list-wrap {
  font-size: px2rem(24);
  background-color: #fff;
  margin-bottom: px2rem(20);
  .vip-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2rem(30);
    height: px2rem(84);
    line-height: px2rem(84);
    background-color: #fff5ea;
    .label {
      display: inline-block;
      padding: 0 px2rem(2);
      line-height: px2rem(30);
      font-size: px2rem(20);
      color: #fff;
      border: px2rem(1) solid rgb(255, 153, 0);
      background-color: #ff941a;
      border-radius: px2rem(4);
      margin-right: px2rem(20);
    }
    .label-text {
      flex: 1;
      color: #fa9600;
    }
    .process {
      &::after {
        display: inline-block;
        content: "";
        width: px2rem(16);
        height: px2rem(16);
        border-left: px2rem(1) solid #ccc;
        border-top: px2rem(1) solid #ccc;
        transform: rotateZ(135deg);
      }
    }
  }
  .showtime-list {
    font-size: px2rem(22);
    .showtime-item {
      display: flex;
      justify-content: space-between;
      padding: px2rem(34) 0;
      margin: 0 px2rem(30);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #e5e5e5;
      &:last-child {
        border-bottom: 0 none;
      }
      .time-block {
        .start-time {
          color: #333;
          font-size: px2rem(40);
        }
      }
      .info-block {
        flex: 1;
        margin-left: px2rem(34);
        .language {
          font-size: px2rem(26);
          color: #333;
          margin-top: px2rem(14);
        }
        .halltype {
          margin-top: px2rem(8);
        }
      }
      .price {
        flex-shrink: 0;
        width: px2rem(250);
        .sell-price {
          display: inline-block;
          font-size: px2rem(38);
          color: #f03d37;
          & > span:first-child {
            font-size: px2rem(22);
          }
          .stonefont {
            font-family: stonefont;
          }
        }
        .vip-price {
          display: inline-block;
          line-height: px2rem(30);
          font-size: px2rem(24);
          border: px2rem(1) solid #f90;
          border-radius: px2rem(4);
          color: #f90;
          transform-origin: left;
          transform: scale(0.8);
          margin-left: px2rem(6);
          & > span {
            padding: 0 px2rem(4);
          }
          & > span:first-child {
            color: #fff;
            background-color: #f90;
          }
        }
        .vip-desc {
          margin-top: px2rem(4);
        }
      }
    }
  }
  .no-seat {
    width: 100%;
    height: px2rem(460);
    background-color: #f0f0f0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: px2rem(155);
    }
    .text {
      font-size: px2rem(32);
      color: #acacac;
      line-height: 1;
      margin-top: px2rem(24);
    }
    .next-date-btn {
      height: px2rem(70);
      width: px2rem(340);
      background-color: #fff;
      color: #f03d37;
      font-size: px2rem(28);
      line-height: px2rem(70);
      border: px2rem(1) solid rgba(0, 0, 0, 0.15);
      border-radius: px2rem(10);
      margin-top: px2rem(40);
    }
  }
}
</style>
