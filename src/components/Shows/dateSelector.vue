<template>
  <div id="date-selector">
    <ul class="date-list" ref="dateList">
      <li
        class="date-item"
        v-for="(item, index) in shows"
        :key="index"
        :class="{ active: selectIndex == index }"
        v-text="item.dateShow"
        @click="handleChangeDateIndex(index)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "date-seletor",
  props: {
    shows: Array
  },
  data() {
    return {
      selectIndex: 0
    };
  },
  methods: {
    handleChangeDateIndex(index) {
      this.selectIndex = index;
      this.$emit("changeDateIndex", index);
    }
  },
  activated() {
    // 因为keep-alive的机制，所以在每次激活该组件时需要重置状态
    this.selectIndex = 0;
  }
};
</script>

<style lang="scss" scoped>
#date-selector {
  background-color: #fff;
  font-size: px2rem(28);
  color: #666;
  height: px2rem(90);
  line-height: px2rem(90);
  border-top: px2rem(1) solid #e5e5e5;
  .date-list {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .date-item {
      position: relative;
      display: inline-block;
      line-height: px2rem(86);
      white-space: nowrap;
      text-align: center;
      box-sizing: border-box;
      margin-left: px2rem(60);
      &:first-child {
        margin-left: px2rem(30);
      }
      &.active {
        color: $btnColor;
        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          content: "";
          display: inline-block;
          width: 110%;
          height: px2rem(4);
          background-color: $btnColor;
        }
      }
    }
  }
}
</style>
