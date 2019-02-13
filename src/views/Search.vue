<template>
  <div id="search-wrap">
    <!-- 头部优化 - 应用上插槽 -->
    <main-header title="毛毛电影v2">
      <div @click="$router.back()" slot="left" class="back"></div>
    </main-header>
    <!-- 搜索框 -->
    <div class="search-hearder">
      <div class="search-input">
        <i class="iconfont icon-sousuo"></i>
        <input
          v-model="keyWord"
          @input="handleInput"
          type="text"
          :placeholder="
            $route.query.searchType === 'cinema' ? '搜影院' : '搜电影、搜影院'
          "
          ref="input"
        />
        <i
          class="iconfont icon-guanbi"
          v-show="keyWord.length"
          @click="handleClear"
        ></i>
      </div>
      <div @click="$router.back()" class="cancel">取消</div>
    </div>
    <!-- 热门搜索 -->
    <div class="hot-search" v-show="isShow">
      <ul class="search-list">
        <li
          class="search-item"
          v-for="(item, index) in keyWordList"
          :key="index"
        >
          <i class="iconfont icon-jishi"></i>
          <span
            class="search-kw"
            v-text="item"
            @click="handleSetKeyWord(item)"
          ></span>
          <div class="delete-kw" @click="handleDeleteKeyWord(index)"></div>
        </li>
      </ul>
      <div class="hot-title">热门搜索</div>
    </div>
    <div class="search-result" v-show="!isShow">
      <!-- 电影列表 -->
      <search-movie :movies="movies"></search-movie>
      <!-- 电影院列表 -->
      <search-cinema :cinemas="cinemas"></search-cinema>
      <!-- 当电影和电影院都没有查询到数据的时候展示 -->
      <div class="no-result" v-show="!isEmptyMovies && !isEmptyCinemas">
        <div class="tips">没有找到相关内容</div>
        <div class="everyone-search">大家都在搜</div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
import searchMovie from "@/components/Search/search-movie";
import searchCinema from "@/components/Search/search-cinema";
import { _queueSort } from "@/common/common";
import { mapGetters } from "vuex";
import { searchKeyWord } from "@/apis/api";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "", // 搜索的关键字
      movies: {}, // 根据关键字查询到的movies对象
      cinemas: {}, // 根据关键字查询到的cinemas对象
      timer: null, // 定义计时器
      isShow: true // 控制关键字列表是否展示,
    };
  },
  computed: {
    ...mapGetters(["searchMovieAndCinema", "searchCinema", "city"]),
    keyWordList() {
      return this.$route.query.searchType !== "cinema"
        ? this.searchMovieAndCinema
        : this.searchCinema;
    },
    cityId() {
      return this.city.id;
    },
    // 用于判断对象是否为空
    isEmptyMovies() {
      return Object.keys(this.movies).length;
    },
    isEmptyCinemas() {
      return Object.keys(this.cinemas).length;
    },
    stype() {
      return this.$route.query.searchType !== "cinema" ? -1 : 2; // -1 表示搜索电影和电影院 / 2表示搜索电影院
    }
  },
  components: {
    mainHeader,
    searchMovie,
    searchCinema
  },
  methods: {
    /**
     *  根据关键字发送ajax请求进行查询
     */
    searchKW() {
      const p = {
        cityId: this.cityId,
        kw: this.keyWord,
        stype: this.stype
      };
      searchKeyWord(p).then(res => {
        this.isShow = false; // 隐藏热门搜索
        res = res.data;
        this.movies = res.movies ? res.movies : {};
        this.cinemas = res.cinemas ? res.cinemas : {};

        this.$nextTick(() => {
          // 2019-01-25 优化退格到最后时出现的请求延迟现象。
          // 用于控制当在按退格键，删除了最后一个的时候就强制隐藏电影列表页
          // 不然会出现请求延迟的情况，导致在没有输入keyword的时候延迟展示上一次请求的结果
          if (!this.keyWord.trim()) {
            this.isShow = true;
          }
          // 2.添加在关键字列表中
          _queueSort(this.keyWordList, this.keyWord);
          // 保存到当前vuex中
          this.$route.query.searchType !== "cinema"
            ? this.$store.commit("SET_SEARCH_MOVIE", this.keyWordList)
            : this.$store.commit("SET_SEARCH_CINEMA", this.keyWordList);
        });
      });
    },
    /**
     *  设置定时器来控制用户输入停止后才发送请求
     */
    handleInput() {
      // 定义计时器
      clearTimeout(this.timer);

      // 重置
      if (!this.keyWord.trim()) {
        this.isShow = true;
        return;
      }

      this.timer = setTimeout(() => {
        // 1.发送ajax请求根据关键字获取查询数据
        this.searchKW();
      }, 150);
    },
    /**
     *  清除输入框的内容并重新获取焦点
     */
    handleClear() {
      this.keyWord = "";
      this.isShow = true;
      // 优化 - 在清除后重新获取焦点
      this.$refs.input.focus();
    },
    /**
     *  删除关键字列表中的对应项
     */
    handleDeleteKeyWord(index) {
      this.keyWordList.splice(index, 1);
    },
    /**
     *  根据在关键字列表的点击设置查询的关键字
     */
    handleSetKeyWord(keyWord) {
      this.keyWord = keyWord;
      // 优化 - 在重新设置后获取焦点
      this.$refs.input.focus();

      // 发送ajax请求
      this.searchKW();
    }
  },
  /**
   *  使用keep-alive后的出现的生命周期钩子函数
   */
  deactivated() {
    this.keyWord = "";
    this.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
#search-wrap {
  height: 100%;
  background-color: #f5f5f5;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .search-hearder {
    display: flex;
    justify-content: space-between;
    align-content: center;
    line-height: px2rem(60);
    padding: px2rem(16) 0 px2rem(16) px2rem(30);
    border-bottom: px2rem(1) solid #e5e5e5;
    .search-input {
      flex: 1;
      display: flex;
      padding: 0 px2rem(20);
      border: px2rem(2) solid rgb(230, 230, 230);
      border-radius: px2rem(10);
      background: #fff;
      .icon-sousuo {
        color: #777;
        font-weight: 600;
        font-size: px2rem(36);
        margin-right: px2rem(12);
      }
      input {
        flex: 1;
        outline: none;
        border: 0 none;
        font-size: px2rem(26);
        line-height: px2rem(60);
      }
      .icon-guanbi {
        font-size: px2rem(32);
        color: #777;
      }
    }
    .cancel {
      padding: 0 px2rem(20);
      font-size: px2rem(32);
      color: $btnColor;
    }
  }
  .hot-search {
    font-size: px2rem(28);
    background-color: #fff;
    .search-list {
      margin-left: px2rem(30);
      .search-item {
        display: flex;
        line-height: px2rem(88);
        border-bottom: px2rem(1) solid #e5e5e5;
        .icon-jishi {
          font-size: px2rem(30);
          color: rgb(172, 169, 169);
          font-weight: 600;
          margin-right: px2rem(20);
        }
        .search-kw {
          flex: 1;
        }
        .delete-kw {
          width: px2rem(20);
          height: px2rem(20);
          padding: px2rem(34) px2rem(30);
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAASFJREFUKBV9kj2OwjAQhWPTkwppL0ADXZIGutVKHICODglWVLtUXIIOuIBvshfIj4SUKhdAossBEt7LMsFEmJGcmWTeZ09mrOI4PiqlRliLIAiu3huD9hfpNbRzTaiu66+qqv7SNB24uCRJdsgdoB/D+wQXCHKssQsmhM330FbQrcIwTBQCjycRIoyVa60/pewXkIHGa0AGr2CcsuycZKiltSBfbBhlXQB9WOUZasSeQH4kDOB8h+DqbRRFJwHEawnEQ8jyeBIhbrzhZpIX/wTajQC0hcjZ7Ra0IQArlsfuuuDmH7sQ5mQANGY3DB/aUSkkfjBDXjsZrvlHHs8u7Pv+VAP6fgcR52Wwyy7LcuJlWTZEqeFjf3dUFEUfF32GxvVumtjRa2eCUPQAAAAASUVORK5CYII=);
          background-repeat: no-repeat;
          background-size: px2rem(20);
          background-position: px2rem(30);
        }
      }
    }
    .hot-title {
      line-height: px2rem(120);
      color: #666;
      font-weight: 400;
      font-size: px2rem(30);
      padding-left: px2rem(30);
    }
  }
  .search-result {
    .no-result {
      color: #999;
      border-bottom: px2rem(1) solid #e5e5e5;
      .tips {
        line-height: px2rem(88);
        background-color: #fff;
        font-size: px2rem(30);
        text-align: center;
      }
      .everyone-search {
        line-height: px2rem(60);
        font-size: px2rem(26);
        padding-left: px2rem(30);
      }
    }
  }
}
</style>
