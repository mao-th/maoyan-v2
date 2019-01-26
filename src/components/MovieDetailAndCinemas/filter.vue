<template>
  <div id="filter-wrap">
    <!-- 过滤器选显卡部分 -->
    <div class="filter-list">
      <div class="filter-item" 
        :class="{active: tabNumber == index}" 
        v-for="(item, index) in filterList" 
        :key="index"
        @click="handleChangeTab(index)"
      >
        <span v-text="item"></span>
        <i class="arrow"></i>
      </div>
    </div>
    <!-- 过滤器内容部分 -->
    <div class="filter-tabs">
      <!-- 全城tab页内容 -->
      <div class="region-tab" v-show="tabNumber === 0">
        <div class="tabs">
          <div class="tab" :class="{active: regionTabNumber === 1}" @click="handleChangeRegionTabNum(1)">商区</div>
          <div class="tab" :class="{active: regionTabNumber === 2}" @click="handleChangeRegionTabNum(2)">地铁站</div>
        </div>
        <!-- 商区/地铁站内容 -->
        <div class="tab-content" v-show="regionTabNumber === 1">
          <div class="content-left">
            <div class="left-item" :class="{active: regionLeftTabIndex === 0}">全部(198)</div>
            <div class="left-item">全部(198)</div>
            <div class="left-item">全部(198)</div>
          </div>
          <div class="content-right">
            <div class="right-item" :class="{active: regionRightTabIndex === 0}">
              <i class="hook">√</i>
              <span class="item-name">全部</span>
              <span class="count">40</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 品牌tab页内容 -->
      <div v-show="tabNumber === 1">tab2</div>
      <div v-show="tabNumber === 2">tab3</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cinemas-filter",
  props: {
    isClose: Boolean
  },
  data() {
    return {
      region: "全城",
      brank: "品牌",
      feature: "特色",
      tabNumber: 4, // 当前展示的tab页面索引
      oldTabNumber: 4, // 上一次展示的tab页面索引
      regionTabNumber: 1, // 用于控制region页面中的头部选项卡激活样式
      regionLeftTabIndex: 0, // 用于控制region内容页面中的左边激活样式
      regionRightTabIndex: 0 // 用于控制region内容页面中的右边激活样式
    };
  },
  computed: {
    filterList() {
      return [this.region, this.brank, this.feature];
    }
  },
  methods: {
    /**
     *  用于切换过滤器的内容
     */
    handleChangeTab(index) {
      // 重复点击相同的tab页面时
      if (this.oldTabNumber == index) {
        this.oldTabNumber = 4;
        this.tabNumber = 4;
        this.$emit("close"); // 关闭
        return;
      }
      this.oldTabNumber = index;
      this.tabNumber = index;
      this.$emit("open"); // 打开
    },
    /**
     *  用于切换region页的内容
     */
    handleChangeRegionTabNum(tabNum) {
      this.regionTabNumber = tabNum;
    }
  },
  watch: {
    isClose() {
      if (this.isClose) {
        console.log("filter - 关闭tab");
        this.oldTabNumber = 4;
        this.tabNumber = 4;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#filter-wrap {
  background-color: #fff;
  font-size: px2rem(26);
  color: #777;
  .filter-list {
    display: flex;
    line-height: px2rem(80);
    border-top: px2rem(1) solid #e5e5e5;
    border-bottom: px2rem(1) solid #e5e5e5;
    .filter-item {
      flex: 1;
      position: relative;
      text-align: center;
      &::after {
        content: "";
        position: absolute;
        top: px2rem(15);
        right: 0;
        display: inline-block;
        width: px2rem(1);
        height: px2rem(50);
        background-color: #e5e5e5;
      }
      &:last-child::after {
        display: none;
      }
      &.active {
        color: #e54847;
        .arrow {
          border-right-color: $btnColor;
          transform: rotate(90deg);
          margin-bottom: px2rem(6);
        }
      }
      .arrow {
        display: inline-block;
        border: px2rem(8) solid transparent;
        border-right-color: #b0b0b0;
        transform: rotate(-90deg);
        margin-left: px2rem(8);
      }
    }
  }
  .filter-tabs {
    font-size: px2rem(30);
    .region-tab {
      .tabs {
        display: flex;
        line-height: px2rem(82);
        .tab {
          flex: 1;
          text-align: center;
          &.active {
            color: $btnColor;
            border-bottom: px2rem(6) solid $btnColor;
          }
        }
      }
      .tab-content {
        display: flex;
        height: px2rem(870);
        font-size: px2rem(28);
        .content-left {
          width: 30%;
          .left-item {
            line-height: px2rem(88);
            padding-left: px2rem(20);
            &.active {
              background-color: #f5f5f5;
              color: $btnColor;
            }
          }
        }
        .content-right {
          width: 70%;
          background-color: #f5f5f5;
          .right-item {
            display: flex;
            justify-content: space-between;
            line-height: px2rem(89);
            padding-left: px2rem(50);
            &.active {
              color: $btnColor;
            }
            .item-name {
              flex: 1;
              padding-left: px2rem(12);
            }
            .count {
              font-size: px2rem(24);
              margin-right: px2rem(50);
            }
          }
        }
      }
    }
  }
}
</style>
