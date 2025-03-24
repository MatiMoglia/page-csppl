<template>
    <BarChart :chart-data="chartData" :chart-options="chartOptions" />
</template>
  
<script>
import { defineComponent, toRefs } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);
export default defineComponent({
    components: { BarChart  },
    props: {
      chartData: Object,
      chartOptions: Object
    },
    setup(props) {
      return { ...toRefs(props) };
    }
});
</script>
  