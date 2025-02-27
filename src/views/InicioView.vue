<template>
    <Navbar/>
    <Slider/>
    <ServiciosCard/>
    <CooplusCard/>
    <Novedades/>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import Slider from "../components/Slider.vue";
  import Novedades from "../components/NovedadesGrid.vue";
  import ServiciosCard from "../components/ServiciosCard.vue";
  import CooplusCard from "@/components/CooplusCard.vue";
  export default {
    components: {
      Navbar,
      Slider,
      Novedades,
      ServiciosCard,
      CooplusCard,
    },
  };
  </script>