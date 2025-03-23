<template>
    <div class="botones-container">
      <div class="fila">
        <button class="btn-img" @click="modalActivo = 'mediosPago'">
          <i class="ri-money-dollar-circle-line"></i> Medios de Pago
        </button>
        <button class="btn-img" @click="modalActivo = 'puntosVenta'">
          <i class="ri-map-pin-line"></i> Puntos de Venta Energía
        </button>
      </div>
  
      <div class="fila">
        <a href="https://www.argentina.gob.ar/subsidios" target="_blank" class="btn-links">
          <i class="ri-file-list-3-line"></i> Subsidio Nacional
        </a>
        <router-link to="/telefono" class="btn-img">
          <i class="ri-phone-line"></i> Guía Telefónica
        </router-link>
      </div>
    </div>
  
    <div v-if="modalActivo === 'mediosPago'" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content pago" @click.stop>
      <img :src="require('@/assets/css/img/medios-pago.jpg')" alt="Medios de Pago" />
      <button class="cerrar-modal" @click="cerrarModal">✖</button>
      <a
        href="https://wa.me/5493564330695?text=Consulta%20sobre%20medios%20de%20pago"
        target="_blank"
        class="btn-consultar"
      >
      <i class="ri-whatsapp-line" style="font-size: 20px; "></i> Consultar
      </a>
    </div>
  </div>

  <div v-if="modalActivo === 'puntosVenta'" class="modal-overlay" @click="cerrarModal">
    <div class="modal-content venta" @click.stop>
      <img :src="require('@/assets/css/img/puntos-pr.jpg')" alt="Puntos de Venta Energía" />
      <button class="cerrar-modal" @click="cerrarModal">✖</button>
      <a
        href="https://wa.me/5493564330695?text=Consulta%20sobre%20puntos%20de%20venta%20energía"
        target="_blank"
        class="btn-consultar"
      >
      <i class="ri-whatsapp-line" style="font-size: 20px;"></i> Consultar
      </a>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        modalActivo: null
      };
    },
    methods: {
      cerrarModal() {
        this.modalActivo = null;
      }
    }
  };
</script>
  
<style scoped>
  .botones-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .fila {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1150px;
  }
  
  .btn-img,
  .btn-links {
    padding: 28px;
    font-size: 22px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #0e1850;
    font-family: "Montserrat", sans-serif;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-img:hover,
  .btn-links:hover {
    background-color: #2980dd;
    transform: scale(1.05);
  }
  
  .btn-img i,
  .btn-links i {
    margin-right: 20px;
    font-size: 24px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content.pago {
    background: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    width: 500px;
    height: 500px;
  }
  
  .modal-content.venta {
    background: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: flex-start;
    width: 400px;
    height: 550px;
  }
  
  .modal-content img {
  max-width: 70%;
  max-height: 80%;
  border-radius: 10px;
  margin-bottom: 20px;
}
.cerrar-modal {
    background: none;
    position: absolute;
    top: 10px;
    right: 10px;
    color: red;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: color 0.5s ease;
}
  
.cerrar-modal:hover {
    color: #ee4343;
}
.btn-consultar {
  margin-top: 10px;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  background-color: #25d366; 
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  width: 100%;
  max-width: 200px;
  transition: background-color 0.3s ease;
}

.btn-consultar:hover {
  background-color: #128c7e; 
}
</style>
  