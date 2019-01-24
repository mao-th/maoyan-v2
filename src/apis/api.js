// 管理所有的请求路径
import { get, post } from "./http.js";
/**
 * 获取正在热映电影列表
 * @param {any} parmas
 */
export const getMovieList = parmas => get("/ajax/movieOnInfoList", parmas);
/**
 * 获取即将上映 - 最受欢迎电影列表
 * @param {any} parmas
 */
export const getMostExpected = parmas => get("/ajax/mostExpected", parmas);
/**
 * 获取即将上映 - 下部分电影列表
 * @param {any} parmas
 */
export const getComingList = parmas => get("/ajax/comingList", parmas);
/**
 * 触底触发，获取更多电影列表数据
 * @param {any} parmas
 */
export const getMoreComingList = parmas => get("/ajax/moreComingList", parmas);
/**
 *  获取城市列表
 *  @parmas {any} parmas
 */
export const getCityList = parmas => get("/api/cities.json", parmas);
/**
 * 定位当前地理城市 - 百度API
 * @param {any} parmas
 */
export const getLocationCity = parmas => get("/location/ip", parmas);
/**
 * 根据关键字查询电影以及电影院数据
 * @param {any} parmas
 */
export const searchKeyWord = parmas => get("/ajax/search", parmas);
