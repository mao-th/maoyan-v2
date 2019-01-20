// 封装axios请求
import axios from "axios";

/**
 * get请求
 * @param {String} url 请求的url地址
 * @param {any} parmas 请求的参数
 */
export function get(url, parmas) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: parmas
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
/**
 * post请求
 * @param {String} url 请求的url地址
 * @param {any} parmas 请求的参数
 */
export function post(url, parmas) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, parmas)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
