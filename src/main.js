import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/lib/hotcss/hotcss";
import loading from "./components/common/loading/loading";
import FastClick from "fastclick";

import "./filter"; // 引入全局过滤器

Vue.use(loading);
Vue.config.productionTip = false;
FastClick.attach(document.body); // 解决移动端点击300ms延迟问题

// 定义路由守卫
// 1.简单模拟没有登录时的拦截情况
router.beforeEach((to, from, next) => {
  if (to.path === "/mine") {
    store.state.username ? next() : router.replace("/login");
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
