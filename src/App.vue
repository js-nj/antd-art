<template>
  <div id="app">
	<Login />
    <Index />
  </div>
</template>

<script>
import Index from './pages/index.vue'
import Login from './pages/login.vue'

export default {
  name: 'App',
  components: {
    Index,
	Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
