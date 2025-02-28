<template>
    <Slider/>
    <ServiciosCard/>
    <CooplusCard/>
    <Novedades/>
  </template>
  
  <script>
  import Slider from "../components/Slider.vue";
  import Novedades from "../components/NovedadesGrid.vue";
  import ServiciosCard from "../components/ServiciosCard.vue";
  import CooplusCard from "@/components/CooplusCard.vue";
  export default {
    components: {
      Slider,
      Novedades,
      ServiciosCard,
      CooplusCard,
    },
  };
  </script>