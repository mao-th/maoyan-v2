module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // 在这里可以设置全局引入的scss文件
        data: `@import "@/assets/lib/hotcss/px2rem.scss";`
      }
    }
  }
};
