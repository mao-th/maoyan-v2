// 管理所有的请求路径
import { get, post } from "./http.js";
/**
 * 获取正在热映电影列表
 * @param {any} params
 */
export const getMovieList = params => get("/ajax/movieOnInfoList", params);
/**
 * 获取即将上映 - 最受欢迎电影列表
 * @param {any} params
 */
export const getMostExpected = params => get("/ajax/mostExpected", params);
/**
 * 获取即将上映 - 下部分电影列表
 * @param {any} params
 */
export const getComingList = params => get("/ajax/comingList", params);
/**
 * 触底触发，获取更多电影列表数据
 * @param {any} params
 */
export const getMoreComingList = params => get("/ajax/moreComingList", params);
/**
 *  获取城市列表
 *  @params {any} params
 */
export const getCityList = params => get("/api/cities.json", params);
/**
 * 定位当前地理城市 - 百度API
 * @param {any} params
 */
export const getLocationCity = params => get("/location/ip", params);
/**
 * 根据关键字查询电影以及电影院数据
 * @param {any} params
 */
export const searchKeyWord = params => get("/ajax/search", params);
/**
 * 根据movieID获取电影的详情信息
 * @param {any} params
 */
export const getmovieDetail = params => get("/ajax/detailmovie", params);
/**
 * 获取电影对应电影院列表
 * @param {any} params
 */
export const getMoiveCinemas = params => post("/ajax/movie", params);
/**
 * 获取电影院过滤器数据
 * @param {any} params
 */
export const getFilterCinemas = params => get("/ajax/filterCinemas", params);
