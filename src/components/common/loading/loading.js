// import loadingComponent from "./mao-loading";
import loadingComponent1 from "./mao-loading1";
import Vue from "vue";

let instance;

const LoadingConstructor = Vue.extend(loadingComponent1);
instance = new LoadingConstructor({
  el: document.createElement("div")
});
const loading = {
  show: () => {
    // 创建实例并进行挂载
    document.body.appendChild(instance.$el);
  },
  remove: () => {
    if (instance) {
      document.body.removeChild(instance.$el);
    }
  }
};
// 应用上插件的方式
export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    });
  }
};
