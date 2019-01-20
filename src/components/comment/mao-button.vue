<template>
  <div class="btn" :style="{ backgroundColor: btnColor }">
    <!-- 可定制插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "mao-button",
  props: {
    color: String,
    btnNum: Number
  },
  computed: {
    btnColor() {
      // 指定默认颜色
      return this.color || "#f03d37";
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  width: px2rem(98);
  height: px2rem(54);
  line-height: px2rem(54);
  text-align: center;
  color: #fff;
  border-radius: px2rem(8);
  font-size: $font-btn;
}
</style>
