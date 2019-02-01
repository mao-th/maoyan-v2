<template>
  <div
    class="btn"
    :style="{ backgroundColor: btnColor }"
    v-text="btnContent"
  ></div>
</template>

<script>
export default {
  name: "mao-button",
  props: {
    btnNum: Number
  },
  data() {
    return {
      btnColor: "",
      btnContent: ""
    };
  },
  methods: {
    renderBtn() {
      switch (this.btnNum) {
        // case 2:  bug状态
        //   this.btnColor = "#f03d37";
        //   this.btnContent = "购票";
        //   break;
        case 3:
          this.btnColor = "#f03d37";
          this.btnContent = "购票";
          break;
        case 4:
          this.btnColor = "#3c9fe6";
          this.btnContent = "预售";
          break;
        case 1:
          this.btnColor = "#faaf00";
          this.btnContent = "想看";
          break;
      }
    }
  },
  mounted() {
    this.renderBtn();
  }
};
</script>

<style lang="scss" scoped>
.btn {
  flex-shrink: 0;
  align-self: center;
  width: px2rem(96);
  height: px2rem(54);
  line-height: px2rem(54);
  text-align: center;
  color: #fff;
  border-radius: px2rem(8);
  font-size: $font-btn;
}
</style>
