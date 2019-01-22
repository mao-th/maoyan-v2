import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let accessCityList;
try {
  // 防止用户本地禁用了localStorage 本地存储功能
  if (localStorage.Maoyan_historyCity) {
    accessCityList = JSON.parse(localStorage.Maoyan_historyCity);
  }
} catch (err) {
  console.log(err);
}

export default new Vuex.Store({
  state: {
    accessCityList: accessCityList || []
  },
  mutations: {
    SET_CITY(state, payload) {
      state.city = payload;
    },
    SET_ACCESSCITYLIST(state, payload) {
      state.accessCityList = payload;
    }
  },
  getters: {
    city: state =>
      state.accessCityList[0] || { id: 20, nm: "广州", py: "guangzhou" }
  },
  actions: {}
});
