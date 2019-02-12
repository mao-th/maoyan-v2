import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/lib/hotcss/hotcss";
import loading from "./components/common/loading/loading";
import "./filter"; // 引入全局过滤器

Vue.use(loading);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
