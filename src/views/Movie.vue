<template>
  <div id="movie">
    <main-header></main-header>
    <movie-nav></movie-nav>
    <movie-list :movieList="movieList"></movie-list>
    <main-nav></main-nav>
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from "@/components/Movie/main-header";
import movieNav from "@/components/Movie/movie-nav";
import movieList from "@/components/Movie/movie-list";
import mainNav from "@/components/Movie/main-nav";
import { getMovieList } from "@/apis/api";
export default {
  name: "Movie",
  data() {
    return {
      movieList: []
    };
  },
  components: {
    mainHeader,
    movieNav,
    movieList,
    mainNav
  },
  created() {
    const p = {
      ci: 280
    };

    getMovieList(p)
      .then(res => {
        res = res.data;
        this.movieList = res.movieList;
      })
      .catch(err => {
        console.log(err);
      });
  }
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
