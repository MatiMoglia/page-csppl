<template>
    <div>
      <PieChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
</template>
  
<script>
import { defineComponent, toRefs } from "vue";
import { Pie } from "vue-chart-3";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, PieController } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, PieController);

export default defineComponent({
  components: { Pie },
  props: {
    chartData: Object,
    chartOptions: Object
  },
  setup(props) {
    return { ...toRefs(props) };
  }
});
  </script>
  