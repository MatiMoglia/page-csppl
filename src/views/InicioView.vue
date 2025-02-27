<template>
    <Navbar/>
    <Slider/>
    <Novedades/>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import Slider from "../components/Slider.vue";
  import Novedades from "../components/NovedadesGrid.vue";
  
  export default {
    components: {
      Navbar,
      Slider,
      Novedades,
    },
  };
  </script>