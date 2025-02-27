<template>
    <div class="servicios-container">
      <h2>Nuestros Servicios</h2>
      <div class="servicios-grid">
        <div 
          v-for="(servicio, index) in servicios" 
          :key="index" 
          class="servicio-card"
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
            icono: "https://cdn-icons-png.flaticon.com/128/2321/2321626.png"
          },
          { 
            nombre: "Telecomunicaciones", 
            descripcion: "Internet, telefonía y servicio de Cooplus.",
            icono: "https://cdn-icons-png.flaticon.com/128/2933/2933987.png"
          },
          { 
            nombre: "Agua Potable", 
            descripcion: "Agua potable segura y de calidad para los hogares.",
            icono: "https://cdn-icons-png.flaticon.com/128/1078/1078793.png"
          },
          
          { 
            nombre: "Servicios Sociales", 
            descripcion: "Banco de Sangre, traslado social y servicio de sepelio.",
            icono: "https://cdn-icons-png.flaticon.com/128/9037/9037386.png"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .servicios-container {
    text-align: center;
    padding: 20px;
    color: #0e1850;
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
    width: 250px;
  }
  
  .servicio-icono {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  
  .servicio-card h3 {
    margin: 10px 0;
    font-size: 18px;
  }
  
  .servicio-card p {
    font-size: 14px;
    color: gray;
  }
  </style>
  