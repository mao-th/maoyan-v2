// import loadingComponent from "./mao-loading";
import loadingComponent1 from "./mao-loading1";
import Vue from "vue";

let instance;

const LoadingConstructor = Vue.extend(loadingComponent1);

const loading = {
  show: () => {
    instance = new LoadingConstructor({
      el: document.createElement("div")
    });
    // 创建实例并进行挂载
    document.body.appendChild(instance.$el);
  },
  remove: () => {
    if (instance) {
      document.body.removeChild(instance.$el);
      instance = null;
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
