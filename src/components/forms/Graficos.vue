<template>
    <h2 class="title">Graficos Estadisticos</h2>
    <div class="charts-container">
      <div class="chart-container">
        <h3 class="subtitle">Formularios por Servicio (Alta)</h3>
        <PieChart v-if="chartDataAlta.labels.length > 0" :chart-data="chartDataAlta" :chart-options="chartOptions" />
        <p v-else>No hay datos para los forms de alta.</p>
      </div>
      <div class="chart-container">
        <h3 class="subtitle">Formularios por Servicio (Baja)</h3>
        <PieChart v-if="chartDataBaja.labels.length > 0" :chart-data="chartDataBaja" :chart-options="chartOptions" />
        <p v-else>No hay datos para los forms de baja.</p>
      </div>
      <div class="chart-container">
        <h3 class="subtitle">Reclamos recibidos (servicios)</h3>
        <PieChart v-if="chartDataReclamos.labels.length > 0" :chart-data="chartDataReclamos" :chart-options="chartOptions" />
        <p v-else>No hay datos para los reclamos.</p>
      </div>
      <div class="chart-container">
        <h3 class="subtitle">Reclamos recibidos (Estado)</h3>
        <PieChart v-if="chartDataEstados.labels.length > 0" :chart-data="chartDataEstados" :chart-options="chartOptions" />
        <p v-else>No hay datos para los reclamos.</p>
      </div>
    </div>
</template>
  
<script>
  import { defineComponent, reactive, onMounted } from "vue";
  import { PieChart } from "vue-chart-3";
  import apiForms from "@/services/apiForms"; 
  import apiReclamos from "@/services/apiReclamos";

  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, PieController } from "chart.js";
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, PieController);
  
  export default defineComponent({
    components: { PieChart }, 
    setup() {
      const chartDataAlta = reactive({
        labels: [], 
        datasets: [
          {
            label: "Cantidad de Formularios (Alta)",
            data: [], 
            backgroundColor: [], 
            hoverOffset: 10 
          }
        ]
      });
  
      const chartDataBaja = reactive({
        labels: [], 
        datasets: [
          {
            label: "Cantidad de Formularios (Baja)",
            data: [], 
            backgroundColor: [], 
            hoverOffset: 10 
          }
        ]
      });

      const chartDataReclamos = reactive({
        labels: [], 
        datasets: [
          {
            label: "Cantidad de Reclamos",
            data: [], 
            backgroundColor: [], 
            hoverOffset: 10 
          }
        ]
      });

      const chartDataEstados = reactive({
        labels: [], 
        datasets: [
          {
            label: "Estado de los reclamos",
            data: [], 
            backgroundColor: [], 
            hoverOffset: 10 
          }
        ]
      });
  
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: "bottom", 
            labels: {
              font: {
                size: 14
              }
            }
          }
        }
      };
  
      const colores = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
      ];
  
      const cargarDatos = async () => {
        const response = await apiForms.obtenerFormularios();
        
        if (response.success) {
          const forms = response.data;
          const conteoServiciosAlta = {};
          const conteoServiciosBaja = {};
  
          forms.forEach(form => {
            const servicio = form.servicio || "Desconocido";
            const accion = form.accion || "Desconocida";
  
            if (accion === "Alta") {
              conteoServiciosAlta[servicio] = (conteoServiciosAlta[servicio] || 0) + 1;
            } else if (accion === "Baja") {
              conteoServiciosBaja[servicio] = (conteoServiciosBaja[servicio] || 0) + 1;
            }
          });

          console.log("Conteo de servicios Alta:", conteoServiciosAlta);
          console.log("Conteo de servicios Baja:", conteoServiciosBaja);
          chartDataAlta.labels = Object.keys(conteoServiciosAlta);
          chartDataAlta.datasets[0].data = Object.values(conteoServiciosAlta);
          chartDataAlta.datasets[0].backgroundColor = chartDataAlta.labels.map(
            (_, i) => colores[i % colores.length]
          );
          chartDataBaja.labels = Object.keys(conteoServiciosBaja);
          chartDataBaja.datasets[0].data = Object.values(conteoServiciosBaja);
          chartDataBaja.datasets[0].backgroundColor = chartDataBaja.labels.map(
            (_, i) => colores[i % colores.length]
          );
        } else {
          console.error("Error al cargar los datos de la API:", response);
        }
      };
      const cargarDatosReclamos = async () => {
        const response = await apiReclamos.obtenerReclamos();
        if (response.success) {
          const reclamos = response.data;
          const conteoReclamos = {};
          const conteoEstados = {};
  
          reclamos.forEach(reclamo => {
            const servicio = reclamo.servicio || "Desconocido";
            const estado = reclamo.estado || "Desconocido";
            conteoReclamos[servicio] = (conteoReclamos[servicio] || 0) + 1;
            conteoEstados[estado] = (conteoEstados[estado] || 0) + 1;
          });

          console.log("Conteo de reclamos:", conteoReclamos);
          chartDataReclamos.labels = Object.keys(conteoReclamos);
          chartDataReclamos.datasets[0].data = Object.values(conteoReclamos);
          chartDataReclamos.datasets[0].backgroundColor = chartDataReclamos.labels.map(
            (_, i) => colores[i % colores.length]
          );
          console.log("Conteo de reclamos:", conteoEstados);
          chartDataEstados.labels = Object.keys(conteoEstados);
          chartDataEstados.datasets[0].data = Object.values(conteoEstados);
          chartDataEstados.datasets[0].backgroundColor = chartDataEstados.labels.map(
            (_, i) => colores[i % colores.length]
          );
        } else {
          console.error("Error al cargar los datos de la API:", response);
        }
      };
      onMounted(() => {
        cargarDatosReclamos();
        cargarDatos();
      });
  
      return { chartDataAlta, chartDataBaja, chartOptions, chartDataReclamos, chartDataEstados };
    }
  });
</script>
  
<style scoped>
.title {
  color: #0056b3;
  background-color: #ececec38;
  font-size: 2rem;
  border-left: 5px solid #0e1850;
  border-right: 5px solid #0e1850;
  margin-left: 100px;
  margin-right: 100px;
  text-align: center;
  padding: 20px;
  margin-bottom: 10px;
}
.charts-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding-left: 100px;
  padding-right: 100px;
}
  
.chart-container {
  width: 350px; 
  margin: auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}
.chart-container:hover {
  transform: scale(1.05);
}
  
.subtitle {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
  