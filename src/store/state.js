/**
 *  state
 */
// let accessCityList;
// let search;
// try {
//   // 防止用户本地禁用了localStorage 本地存储功能
//   if (localStorage.Maoyan_historyCity) {
//     accessCityList = JSON.parse(localStorage.Maoyan_historyCity);
//   }
//   if (localStorage.search) {
//     search = JSON.parse(localStorage.search);
//   }
// } catch (err) {
//   console.log(err);
// }

export default {
  accessCityList: [], // 最近访问的城市列表
  search: { movie: [], cinema: [] }, // 搜索的关键字列表
  RT: "", // 电影上映时间（用于movie页和movieDetailAndCinemas页进行通信
  username: "" // 用户名
};
