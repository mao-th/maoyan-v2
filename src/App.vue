<template>
  <!-- 路由占位符 -->
  <keep-alive exclude="MovieDetailAndCinemas,Shows">
    <router-view/>
  </keep-alive>
</template>

<script>
export default {};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
