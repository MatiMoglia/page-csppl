<template>
  <div class="servicios-container">
    <h2 class="title">Nuestros Servicios</h2>
    <div class="servicios-grid">
      <div 
        v-for="(servicio, index) in servicios" 
        :key="index" 
        class="servicio-card"
        @click="irAVista(servicio.ruta)"
      >
        <img :src="servicio.icono" :alt="servicio.nombre" class="servicio-icono" />
        <h3>{{ servicio.nombre }}</h3>
        <p>{{ servicio.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servicios: [
        { 
          nombre: "Energía Eléctrica", 
          descripcion: "Suministro confiable de energía eléctrica para la comunidad de Porteña.",
          icono: "https://cdn-icons-png.flaticon.com/128/2321/2321626.png",
          ruta: "/energia"
        },
        { 
          nombre: "Telecomunicaciones", 
          descripcion: "Internet, telefonía y servicio de Cooplus.",
          icono: "https://cdn-icons-png.flaticon.com/128/2933/2933987.png",
          ruta: "/telecomunicaciones"
        },
        { 
          nombre: "Agua Potable", 
          descripcion: "Agua potable segura y de calidad para los hogares.",
          icono: "https://cdn-icons-png.flaticon.com/128/1078/1078793.png",
          ruta: "/agua"
        },
        { 
          nombre: "Servicios Sociales", 
          descripcion: "Banco de Sangre, traslado social y servicio de sepelio.",
          icono: "https://cdn-icons-png.flaticon.com/128/9037/9037386.png",
          ruta: "/servicios-sociales"
        }
      ]
    };
  },
  methods: {
    irAVista(ruta) {
      this.$router.push(ruta);
    }
  }
};
</script>

<style scoped>
.servicios-container {
  text-align: center;
  padding: 20px;
  color: #0e1850;
  padding-left: 100px;
  padding-right: 100px;
}
.title {
  color: #1f2c79;
  background-color: #ececec38;
  font-size: 2.4rem;
  padding: 15px;
  border-left: 5px solid #0e1850;
  border-right: 5px solid #0e1850;
}  

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}
  
.servicio-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(2, 4, 107, 0.178);
  padding: 20px;
  text-align: center;
  width: 270px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.servicio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(47, 76, 223, 0.849);
}
.servicio-icono {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
  
.servicio-card h3 {
  padding: 10px;
  font-size: 1.25rem;
}
  
.servicio-card p {
  font-size: 17px;
  color: gray;
}
</style>
