<template>
    <Slider/>
    <ServiciosCard/>
    <BtnsInicio/>
    <CardCooponline/>
    <CooplusCard/>
    <Novedades/>
    <SliderSpam/>
    <CardNecrologia/>
    <NrosGuardia/>
  </template>
  
  <script>
  import Slider from "../components/comp-inicio/Slider.vue";
  import Novedades from "../components/NovedadesGrid.vue";
  import ServiciosCard from "../components/comp-inicio/CardServicios.vue";
  import CooplusCard from "@/components/comp-inicio/CardCooplus.vue";
  import SliderSpam from "@/components/comp-inicio/SliderSpam.vue";
  import NrosGuardia from "@/components/csppl-info/NrosGuardia.vue";
  import BtnsInicio from "@/components/comp-inicio/Btns-inicio.vue";
  import CardCooponline from "@/components/comp-inicio/CardCooponline.vue";
  import CardNecrologia from "@/components/comp-inicio/CardNecrologia.vue";
  export default {
    components: {
      Slider,
      Novedades,
      ServiciosCard,
      CooplusCard,
      SliderSpam,
      NrosGuardia,
      BtnsInicio,
      CardCooponline,
      CardNecrologia,
    },
  };
  </script>