/**
 *  mutations
 */
import {
  SET_CITY,
  SET_RT,
  SET_ACCESSCITYLIST,
  SET_SEARCH_MOVIE,
  SET_SEARCH_CINEMA,
  SET_USERNAME
} from "./mutation-types";

export default {
  [SET_CITY](state, payload) {
    state.city = payload;
  },
  [SET_RT](state, payload) {
    state.RT = payload;
  },
  [SET_ACCESSCITYLIST](state, payload) {
    state.accessCityList = payload;
  },
  [SET_SEARCH_MOVIE](state, payload) {
    state.search.movie = payload;
    // 并保存到localStorage中
    try {
      localStorage.search = JSON.stringify(state.search);
    } catch (err) {
      console.log(err);
    }
  },
  [SET_SEARCH_CINEMA](state, payload) {
    state.search.cinema = payload;
    // 并保存到localStorage中
    try {
      localStorage.search = JSON.stringify(state.search);
    } catch (err) {
      console.log(err);
    }
  },
  [SET_USERNAME](state, payload) {
    state.username = payload;
  }
};
