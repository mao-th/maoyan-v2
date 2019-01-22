import { getMoreComingList } from "../apis/api";
// mixin
const mixin = {
  props: {
    city: Object
  },
  data() {
    return {
      isTouchBottom: true, // 防止触底多次触发
      queryStringMovieIds: "", // queryString 对应=> movieIds
      isScroll: true // 用于添加和移除该事件
    };
  },
  computed: {
    cityId() {
      return this.city.id;
    }
  },
  methods: {
    /**
     * 触底函数
     * @param {Event} e
     */
    handlerTouchBottom(e) {
      this.handlerMovieIds();
      console.log(this.queryStringMovieIds);
      if (!this.queryStringMovieIds) return;

      // 获取当前滚动条的位置
      let scrollTop = e.target.scrollTop;
      // 获取元素的可视化高度
      let offsetHeight = e.target.offsetHeight;
      // 获取元素的滚动总高度
      let totalH = e.target.scrollHeight;

      // console.log(`scrollTop: ${scrollTop}`);
      // console.log(`totalH: ${totalH}`);
      // console.log(`offsetHeight: ${offsetHeight}`);
      // console.log(`totalH - offsetHeight: ${totalH - offsetHeight}`);
      // 计算是否已经触底
      if (scrollTop >= totalH - offsetHeight - 100 && this.isTouchBottom) {
        this.isTouchBottom = false;
        this.handlerMoreComingList();
      }
    },
    /**
     * 请求加载更多api
     * @param {Function} getMoreComingList
     */
    handlerMoreComingList() {
      const p = {
        ci: this.cityId,
        movieIds: this.queryStringMovieIds,
        token: ""
      };
      getMoreComingList(p)
        .then(res => {
          res = res.data;
          this.movieList = this.movieList.concat(res.coming);
          this.$nextTick(() => {
            this.isTouchBottom = true;
            this.queryStringMovieIds = "";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 提取queryString字段信息
     */
    handlerMovieIds() {
      let startIndex = this.movieList.length;
      // 裁剪movieIds的id信息
      if (startIndex < this.movieIds.length - 1) {
        // slice方法不会修改原数组，而splice会修改原数组.
        this.queryStringMovieIds = this.movieIds
          .slice(startIndex, startIndex + 10)
          .join(",");
      } else {
        this.isScroll = false;
      }
    }
  }
};

export default mixin;
