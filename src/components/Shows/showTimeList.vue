<template>
  <div id="showtime-list-wrap">
    <div class="vip-tips" v-for="(item, index) in vipInfo" :key="index">
      <div class="label" v-text="item.tag"></div>
      <div class="label-text" v-text="item.title"></div>
      <div class="process" v-text="item.process"></div>
    </div>
    <div class="showtime-list">
      <div class="showtime-item" v-for="(item, index) in plist" :key="index">
        <div class="time-block">
          <div class="start-time" v-text="item.tm"></div>
          <div class="end-time">{{ item.tm | endTimeFilter(item.dt, dur) }} 散场</div>
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
  </div>
</template>

<script>
import moment from "moment";
import maoButton from "@/components/common/mao-button";
export default {
  name: "showTime-list",
  props: {
    plist: Array,
    vipInfo: Array,
    stone: Object,
    dur: Number
  },
  computed: {
    fonts() {
      return this.stone.fonts || {};
    },
    src() {
      console.log(this.fonts.woff);
      return this.fonts.woff || "";
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
}
</style>
