import Vue from "vue";

// 用于存放自定义的全局过滤器
/**
 *  imgUrl: 图片地址
 *  format: 需要替换的图片宽高 - 格式： /148.202
 */
Vue.filter("imgFilter", (imgUrl, format) => {
  return imgUrl.replace("/w.h", format);
});
