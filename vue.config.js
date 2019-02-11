module.exports = {
  // 设置代理
  devServer: {
    proxy: {
      "/ajax": {
        target: "http://m.maoyan.com",
        changeOrigin: true
      },
      "/mmdb": {
        target: "http://m.maoyan.com",
        changeOrigin: true
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          // 路径重写
          "^/api": "/city-data"
        }
      },
      "/location": {
        target: "https://api.map.baidu.com",
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // 在这里可以设置全局引入的scss文件
        data: `@import "@/assets/scss/common.scss";`
      }
    }
  }
};
