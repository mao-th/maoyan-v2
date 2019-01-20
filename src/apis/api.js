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

export const getComingList = parmas => get("/ajax/comingList", parmas);
