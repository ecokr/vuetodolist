<template>
  <div id="app">
    <todo />
  </div>
</template>

<script>
import todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    todo
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}
</style>
