<template>
  <div>
    <main-header></main-header>
    <div class="movie">这里是Home!</div>
  </div>
</template>

<script>
// @ is an alias to /src
import mainHeader from "@/components/Movie/main-header";
export default {
  name: "Movie",
  components: {
    mainHeader
  }
};
</script>

<style lang="scss" scoped>
</style>
