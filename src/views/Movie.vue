<template>
  <div id="movie">
    <main-header></main-header>
    <movie-nav></movie-nav>
    <movie-list></movie-list>
    <main-nav></main-nav>
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from "@/components/Movie/main-header";
import movieNav from "@/components/Movie/movie-nav";
import movieList from "@/components/Movie/movie-list";
import mainNav from "@/components/Movie/main-nav";
export default {
  name: "Movie",
  components: {
    mainHeader,
    movieNav,
    movieList,
    mainNav
  }
};
</script>

<style lang="scss" scoped>
</style>
