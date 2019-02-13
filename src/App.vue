<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive exclude="MovieDetailAndCinemas,Shows">
      <router-view />
    </keep-alive>
    <main-nav v-show="$route.meta.showMainNav"></main-nav>
  </div>
</template>

<script>
import mainNav from "@/components/common/main-nav";
export default {
  name: "App",
  components: {
    mainNav
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
