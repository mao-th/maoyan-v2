import loadingComponent from "./mao-loading";
import Vue from "vue";

let instance;

const LoadingConstructor = Vue.extend(loadingComponent);

instance = new LoadingConstructor({
  el: document.createElement("div")
});

const loading = (options = {}) => {
  if (options) {
    // 遍历选项列表，然后对组件的组件的选项进行初始化
    console.log("初始化");
  }
};

export default loading;
