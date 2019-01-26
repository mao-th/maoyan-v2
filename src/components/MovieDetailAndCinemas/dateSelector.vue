<template>
  <div id="date-selector">
    <ul class="date-list" ref="dateList">
      <li 
        class="date-item" 
        :class="{active: selectIndex == index}" 
        v-for="(item, index) in dates"
        :key="index"
        @click="handleChangeIndex($event, index)"
      >
      {{ item.date | filtersMoment}}
      </li>
    </ul>
  </div>
</template>

<script>
// 引入momentjs插件
import moment from "moment";
import "moment/locale/zh-cn"; // 引入中文语言环境
export default {
  name: "date-selector",
  props: {
    dates: Array
  },
  data() {
    return {
      selectIndex: 0,
      everytime_offset: 15, // 每次偏移量
      everytime_time: 15 // 每次偏移的时间间隔
    };
  },
  filters: {
    /**
     *  通过 momentjs 结合 正则实现对日期的格式化
     */
    filtersMoment(date) {
      if (moment().format("YYYY-MM-DD") === date) {
        return moment(date)
          .format("dddMM月DD日")
          .replace(/^.{2}/, "今天"); // 正则代表匹配开头的两个任意字符
      } else if (
        moment()
          .add(1, "day")
          .format("YYYY-MM-DD") === date
      ) {
        return moment(date)
          .format("dddMM月DD日")
          .replace(/^.{2}/, "明天");
      } else if (
        moment()
          .add(2, "day")
          .format("YYYY-MM-DD") === date
      ) {
        return moment(date)
          .format("dddMM月DD日")
          .replace(/^.{2}/, "后天");
      }
      return moment(date).format("dddMM月DD日");
    }
  },
  methods: {
    handleChangeIndex(e, index) {
      this.selectIndex = index;
      // dateList元素的总宽度（包含超出部分）
      let scrollWidth = this.$refs.dateList.scrollWidth;
      // dateList元素的窗口可视化宽度，在这里其实等于设备宽度
      let offsetWidth = this.$refs.dateList.offsetWidth;
      // dateList元素滚动条最大可滚动到的位置
      let maxScroll = scrollWidth - offsetWidth - 2;
      // 滚动条需要偏移到的位置
      let offset = (index - 1) * (e.target.scrollWidth + 5);
      let timer; // 计时器
      let direction = offset > this.$refs.dateList.scrollLeft ? 1 : -1; // 偏移的方向
      let d = Math.abs(offset - this.$refs.dateList.scrollLeft); // 需要偏移的距离
      timer = setInterval(() => {
        this.$refs.dateList.scrollLeft += direction * this.everytime_offset;
        d -= this.everytime_offset;

        if (d <= 0) {
          clearInterval(timer);
        }

        // 当达到最小滚动距离时清除计时器
        if (this.$refs.dateList.scrollLeft <= 0) {
          console.log("到头了");
          clearInterval(timer);
        }
        // 当达到最大滚动距离时清除计时器
        if (this.$refs.dateList.scrollLeft >= maxScroll) {
          console.log("到尾了");
          clearInterval(timer);
        }
      }, this.everytime_time);
    }
  }
};
</script>

<style lang="scss" scoped>
#date-selector {
  background-color: #fff;
  font-size: px2rem(28);
  color: #666;
  line-height: px2rem(84);
  .date-list {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .date-item {
      flex: 1 0 px2rem(230);
      line-height: px2rem(84);
      margin-left: px2rem(9);
      white-space: nowrap;
      text-align: center;
      box-sizing: border-box;
      &:last-child {
        margin-right: px2rem(9);
      }
      &.active {
        color: $btnColor;
        border-bottom: px2rem(6) solid $btnColor;
      }
    }
  }
}
</style>
