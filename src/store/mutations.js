/**
 *  mutations
 */
import {
  SET_CITY,
  SET_RT,
  SET_ACCESSCITYLIST,
  SET_SEARCH,
  SET_SEARCH_MOVIE,
  SET_SEARCH_CINEMA,
  SET_USERNAME,
  DELETE_SEARCH_MOVIE,
  DELETE_SEARCH_CINEMA
} from "./mutation-types";

// function saveLocalStorage(state) {
//   try {
//     localStorage.search = JSON.stringify(state.search);
//   } catch (err) {
//     console.log(err);
//   }
// }

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
  [SET_SEARCH](state, payload) {
    state.search = payload;
  },
  [SET_SEARCH_MOVIE](state, payload) {
    state.search.movie = payload;
    // 并保存到localStorage中
    // saveLocalStorage(state);
  },
  [SET_SEARCH_CINEMA](state, payload) {
    state.search.cinema = payload;
    // 并保存到localStorage中
    // saveLocalStorage(state);
  },
  [SET_USERNAME](state, payload) {
    state.username = payload;
  },
  [DELETE_SEARCH_MOVIE](state, index) {
    state.search.movie.splice(index, 1);
    // 并保存到localStorage中
    // saveLocalStorage(state);
  },
  [DELETE_SEARCH_CINEMA](state, index) {
    state.search.cinema.splice(index, 1);
    // 并保存到localStorage中
    // saveLocalStorage(state);
  }
};
