// 管理所有的请求路径
import { get, post } from "./http.js";

export const getMovieList = parmas => get("/ajax/movieOnInfoList", parmas);
