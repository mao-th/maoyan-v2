/**
 *  getters
 */
export default {
  city: state =>
    state.accessCityList[0] || { id: 20, nm: "广州", py: "guangzhou" }, // 当前选择的城市
  rt: state => state.RT, // 电影的上映时间 - 用于movie页和movieDetailAndCinemas页进行通信
  searchMovieAndCinema: state => state.search.movie, // 搜索电影和电影院的关键字列表
  searchCinema: state => state.search.cinema // 搜索电影院的关键字列表
};
