import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let accessCityList;
let search;
try {
  // 防止用户本地禁用了localStorage 本地存储功能
  if (localStorage.Maoyan_historyCity) {
    accessCityList = JSON.parse(localStorage.Maoyan_historyCity);
  }
  if (localStorage.search) {
    search = JSON.parse(localStorage.search);
  }
} catch (err) {
  console.log(err);
}

export default new Vuex.Store({
  state: {
    accessCityList: accessCityList || [],
    search: search || { movie: [], cinema: [] }
  },
  mutations: {
    SET_CITY(state, payload) {
      state.city = payload;
    },
    SET_ACCESSCITYLIST(state, payload) {
      state.accessCityList = payload;
    },
    SET_SEARCH_MOVIE(state, payload) {
      state.search.movie = payload;
      // 并保存到localStorage中
      try {
        localStorage.search = JSON.stringify(state.search);
      } catch (err) {
        console.log(err);
      }
    },
    SET_SEARCH_CINEMA(state, payload) {
      state.search.cinema = payload;
      // 并保存到localStorage中
      try {
        localStorage.search = JSON.stringify(state.search);
      } catch (err) {
        console.log(err);
      }
    }
  },
  getters: {
    city: state =>
      state.accessCityList[0] || { id: 20, nm: "广州", py: "guangzhou" },
    searchMovieAndCinema: state => state.search.movie,
    searchCinema: state => state.search.cinema
  },
  actions: {}
});
