<template>
  <div id="movie">
    <main-header :title="title"></main-header>
    <movie-nav :city="city" @changeComponent="changeComponent"></movie-nav>
    <!-- 动态组件 -->
    <!-- 使用keep-alive的组件会多出两个生命周期函数：activated（激活的时候） 和 deactivated（失活的时候） -->
    <keep-alive>
      <component :is="componentName" :city="city"></component>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from "@/components/common/main-header";
import movieNav from "@/components/Movie/movie-nav";
import movieList from "@/components/Movie/movie-list";
import movieList2 from "@/components/Movie/movie-list2";
import { mapGetters } from "vuex";
export default {
  name: "Movie",
  data() {
    return {
      title: "毛毛电影v2",
      componentName: "movie-list"
    };
  },
  computed: {
    ...mapGetters(["city"])
  },
  components: {
    mainHeader,
    movieNav,
    movieList,
    movieList2
  },
  methods: {
    /**
     *  用于进行动态组件的切换
     */
    changeComponent(flag) {
      if (flag) {
        this.componentName = "movie-list";
      } else {
        this.componentName = "movie-list2";
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
#movie {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
