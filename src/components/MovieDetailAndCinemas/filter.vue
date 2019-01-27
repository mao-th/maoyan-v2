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
          <div class="tab" :class="{active: regionTabIndex === 1}" @click="handleChangeRegionTabIndex(1)">商区</div>
          <div class="tab" :class="{active: regionTabIndex === 2}" @click="handleChangeRegionTabIndex(2)">地铁站</div>
        </div>
        <!-- 商区/地铁站内容 -->
        <div class="region-content">
          <div class="content-left">
            <div 
              class="left-item" 
              v-for="(item, index) in regionSubItems"
              :key="index"
              :class="{active: regionLeftTabIndex === index}"
              v-text="item.name + '(' + item.count + ')'"
              @click="handleChangeRegionLeftIndex(index, item.id)"
            >
            </div>
          </div>
          <div class="content-right">
            <div 
              class="right-item" 
              v-for="(item, index) in regionSubSubItems"
              :key="index"
              :class="{active: regionRightTabIndex === index}"
              @click="handleChangeRegionRightIndex(index, item.id)"
            >
              <i class="hook" v-show="regionRightTabIndex === index">√</i>
              <span class="item-name" v-text="item.name"></span>
              <span class="count" v-text="item.count"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 品牌tab页内容 -->
      <div class="brand-tab" v-show="tabNumber === 1">
        <div class="brand-list">
          <div 
            class="brand-item" 
            v-for="(item, index) in brandSubItems"
            :key="index"
            :class="{active: brankIndex === index}"
            @click="handleChangeBrandIndex(index, item.id)"
          >
            <i class="brand-hook" v-show="brankIndex === index">√</i>
            <span class="brand-name" v-text="item.name"></span>
            <span class="brand-count" v-text="item.count"></span>
          </div>
        </div>
      </div>
      <div class="feature-tab" v-show="tabNumber === 2">
        <div class="feature-content">
          <div class="content service">
            <div class="title">特色功能</div>
            <div class="list">
              <div 
              class="item"
              v-for="(item, index) in serviceSubItems" 
              :key="index"
              :class="{active: featureSeriveIndex === index}"
              v-text="item.name"
              @click="handleChangeFeatureSeriveIndex(index, item.id)"
              ></div>
            </div>
          </div>
          <div class="content halltype">
            <div class="title">特色功能</div>
            <div class="list">
               <div 
              class="item"
              v-for="(item, index) in hallTypeSubItems" 
              :key="index"
              :class="{active: featureHallTypeIndex === index}"
              v-text="item.name"
              @click="handleChangeFeatureHallTypeIndex(index, item.id)"
              ></div>
            </div>
          </div>
        </div>
        <div class="feature-bottom">
          <div class="btn reset" @click="handleFeatureReset">重置</div>
          <div class="btn enter">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cinemas-filter",
  props: {
    isClose: Boolean,
    filterCinemas: Object
  },
  data() {
    return {
      regionName: "全城",
      brandName: "品牌",
      featureName: "特色",
      tabNumber: 4, // 当前展示的tab页面索引
      oldTabNumber: 4, // 上一次展示的tab页面索引
      regionTabIndex: 1, // 用于控制region页面中的头部选项卡激活样式
      regionLeftTabIndex: 0, // 用于控制region内容页面中的左边激活样式
      regionRightTabIndex: 0, // 用于控制region内容页面中的右边激活样式
      brankIndex: 0, // 用于控制brank内容页面的激活样式
      featureSeriveIndex: 0, // 用于控制fearture内容页面中的特色功能激活样式
      featureHallTypeIndex: 0 // 用于控制fearture内容页面中的特殊厅激活样式
    };
  },
  computed: {
    filterList() {
      return [this.regionName, this.brandName, this.featureName];
    },
    brand() {
      return this.filterCinemas.brand || {};
    },
    brandSubItems() {
      // 品牌数据
      return this.brand.subItems || [];
    },
    district() {
      return this.filterCinemas.district || {};
    },
    districtSubItems() {
      // 商区数据
      return this.district.subItems || [];
    },
    districtSubItemsByIndex() {
      return this.districtSubItems[this.regionLeftTabIndex] || {};
    },
    districtSubSubItems() {
      // 商区/区域数据
      return this.districtSubItemsByIndex.subItems || [];
    },
    hallType() {
      return this.filterCinemas.hallType || {};
    },
    hallTypeSubItems() {
      // 特殊厅数据
      return this.hallType.subItems || [];
    },
    service() {
      return this.filterCinemas.service || {};
    },
    serviceSubItems() {
      // 特色功能数据
      return this.service.subItems || [];
    },
    subway() {
      return this.filterCinemas.subway || {};
    },
    subwaySubItems() {
      // 地铁数据
      return this.subway.subItems || [];
    },
    subwaySubItemsByIndex() {
      // 地铁数据
      return this.subwaySubItems[this.regionLeftTabIndex] || {};
    },
    subwaySubSubItems() {
      // 地铁/子数据
      return this.subwaySubItemsByIndex.subItems || [];
    },
    regionSubItems() {
      // 集成 商区/地铁数据
      if (this.regionTabIndex === 1) {
        return this.districtSubItems;
      }
      return this.subwaySubItems;
    },
    regionSubSubItems() {
      // 集成 商区/地铁子数据
      if (this.regionTabIndex === 1) {
        return this.districtSubSubItems;
      }
      return this.subwaySubSubItems;
    }
  },
  methods: {
    /**
     *  用于切换过滤器的内容,以及打开/关闭过滤器内容
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
    handleChangeRegionTabIndex(tabNum) {
      this.regionTabIndex = tabNum;
    },
    /**
     *  用于切换region页内容左侧的激活样式
     */
    handleChangeRegionLeftIndex(index, id) {
      this.regionLeftTabIndex = index;
    },
    /**
     *  用于切换region页内容右侧的激活样式
     */
    handleChangeRegionRightIndex(index, id) {
      this.regionRightTabIndex = index;
    },
    /**
     *  用于切换brand页内容激活样式
     */
    handleChangeBrandIndex(index, id) {
      this.brankIndex = index;
    },
    /**
     *  用于切换feature页内容service的激活样式
     */
    handleChangeFeatureSeriveIndex(index, id) {
      this.featureSeriveIndex = index;
    },
    /**
     *  用于切换feature页内容hallType的激活样式
     */
    handleChangeFeatureHallTypeIndex(index, id) {
      this.featureHallTypeIndex = index;
    },
    /**
     *  用于重置feature页的选择
     */
    handleFeatureReset() {
      this.featureSeriveIndex = 0;
      this.featureHallTypeIndex = 0;
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
      .region-content {
        display: flex;
        font-size: px2rem(28);
        .content-left {
          width: 30%;
          height: px2rem(870);
          overflow-y: scroll;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            display: none;
          }
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
          height: px2rem(870);
          background-color: #f5f5f5;
          overflow-y: scroll;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            display: none;
          }
          .right-item {
            display: flex;
            justify-content: space-between;
            line-height: px2rem(89);
            padding-left: px2rem(50);
            &.active {
              color: $btnColor;
              .item-name {
                padding-left: px2rem(12);
              }
            }
            .item-name {
              flex: 1;
              padding-left: px2rem(32);
            }
            .count {
              font-size: px2rem(24);
              margin-right: px2rem(50);
            }
          }
        }
      }
    }
    .brand-tab {
      .brand-list {
        height: px2rem(704);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .brand-item {
          display: flex;
          justify-content: space-between;
          height: px2rem(88);
          line-height: px2rem(88);
          border-bottom: px2rem(1) solid #e5e5e5;
          &.active {
            color: $btnColor;
            .brand-name {
              margin-left: px2rem(18);
            }
          }
          .brand-hook {
            margin-left: px2rem(20);
          }
          .brand-name {
            flex: 1;
            margin-left: px2rem(56);
          }
          .brand-count {
            font-size: px2rem(24);
            margin-right: px2rem(90);
          }
        }
      }
    }
    .feature-tab {
      .feature-content {
        height: px2rem(600);
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
        .content {
          .title {
            margin: px2rem(22) 0 0 px2rem(24);
          }
          .list {
            display: flex;
            flex-wrap: wrap;
            font-size: px2rem(22);
            margin: 0 px2rem(24) px2rem(24) px2rem(24);
            .item {
              flex-shrink: 0;
              width: 21%;
              height: px2rem(60);
              line-height: px2rem(60);
              padding: px2rem(6) 0;
              text-align: center;
              border: px2rem(1) solid #ccc;
              border-radius: px2rem(10);
              margin-top: px2rem(20);
              margin-right: 2.67%;
              @include ellipsis();
              &.active {
                color: $btnColor;
                border: px2rem(1) solid $btnColor;
                background-color: #fcf0f0;
              }
            }
          }
        }
      }
      .feature-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(120);
        font-size: px2rem(28);
        background-color: #fafafa;
        border-top: px2rem(1) solid #e5e5e5;
        .btn {
          width: 21.3%;
          height: px2rem(68);
          line-height: px2rem(68);
          text-align: center;
          border-radius: px2rem(12);
          &.reset {
            border: px2rem(1) solid #e5e5e5;
            margin-left: px2rem(22);
          }
          &.enter {
            color: #fff;
            background-color: $btnColor;
            border: px2rem(1) solid $btnColor;
            margin-right: px2rem(22);
          }
        }
      }
    }
  }
}
</style>
