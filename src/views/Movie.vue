<template>
  <div>
    <main-header></main-header>
    <movie-nav></movie-nav>
    <movie-list></movie-list>
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from "@/components/Movie/main-header";
import movieNav from "@/components/Movie/movie-nav";
import movieList from "@/components/Movie/movie-list";
export default {
  name: "Movie",
  components: {
    mainHeader,
    movieNav,
    movieList
  }
};
</script>

<style lang="scss" scoped>
</style>
