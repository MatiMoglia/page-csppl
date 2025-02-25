<template>
  <div>
      <Headerlogo />
      <router-view></router-view>
  </div>
</template>

<script>
  import Headerlogo from "./components/Headerlogo.vue";

  export default {
    components: {
        Headerlogo
    }
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav li {
    display: inline;
    margin: 0 10px;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
}
</style>
