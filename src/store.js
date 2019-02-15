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
    accessCityList: accessCityList || [], // 最近访问的城市列表
    search: search || { movie: [], cinema: [] }, // 搜索的关键字列表
    RT: "", // 电影上映时间（用于movie页和movieDetailAndCinemas页进行通信
    username: "" // 用户名
  },
  mutations: {
    SET_CITY(state, payload) {
      state.city = payload;
    },
    SET_RT(state, payload) {
      state.RT = payload;
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
    },
    SET_USERNAME(state, payload) {
      state.username = payload;
    }
  },
  getters: {
    city: state =>
      state.accessCityList[0] || { id: 20, nm: "广州", py: "guangzhou" }, // 当前选择的城市
    rt: state => state.RT, // 电影的上映时间 - 用于movie页和movieDetailAndCinemas页进行通信
    searchMovieAndCinema: state => state.search.movie, // 搜索电影和电影院的关键字列表
    searchCinema: state => state.search.cinema // 搜索电影院的关键字列表
  },
  actions: {}
});
