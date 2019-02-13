<template>
  <div id="star-wrap">
    <ul>
      <li
        class="star-item"
        v-for="(star, index) in stars"
        :key="index"
        :class="star"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "star",
  props: {
    sc: Number
  },
  computed: {
    stars() {
      let stars = [];

      // 全填充的星星数
      let full_num = parseInt(this.sc / 2);
      let half_num = 0;
      if (this.sc % 2 != 0 && this.sc % 2 >= 1.0) {
        half_num++;
      }
      let empty_num = 5 - full_num - half_num;

      for (let i = 0; i < 5; i++) {
        if (i < full_num) {
          stars.push("full");
        }
      }
      if (half_num) {
        stars.push("half");
      }
      for (let i = 0; i < empty_num; i++) {
        stars.push("empty");
      }
      return stars;
    }
  }
};
</script>

<style lang="scss" scoped>
#star-wrap {
  display: inline-block;
  .star-item {
    width: px2rem(36);
    height: px2rem(36);
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: px2rem(6);
    & > ul {
      list-style: none;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: px2rem(10);
    }
    &.full {
      background-image: url(../../assets/png/star-full-new.png);
    }
    &.half {
      background-image: url(../../assets/png/star-half-new.png);
    }
    &.empty {
      background-image: url(../../assets/png/star-empty-new.png);
    }
  }
}
</style>
