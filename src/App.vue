<template>
  <div id="app">
    <!-- <Home /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from '@/views/Home.vue'

export default {
  name: 'app',
  components: {
    // Home,
  }
}
</script>

<style>
body {
  background-color: rgb(230, 204, 213);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1b3926;
  margin-top: 30px;
}
</style>
