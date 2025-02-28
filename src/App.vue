<template>
  <Navbar/>
  <div>
      <router-view></router-view>
  </div>
  <footer>
    <p>prueba</p>
  </footer>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  export default {
    components: {
      Navbar
    }
  };
</script>

<style>

footer {
    background: #0e1850;
    color: white;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
}
</style>
