<template>
    <div class="historia-container">
      <section class="historia-section">
        <div class="section-content">
          <h2>Nuestra Historia</h2>
          <div class="timeline">
            <div v-for="(evento, index) in eventos" :key="index" class="timeline-event">
              <div
                class="timeline-header"
                @click="toggleDetail(index)" 
              >
                <span class="timeline-date">{{ evento.fecha }}</span>
                <i
                  :class="{
                    'ri-arrow-down-s-line': !detallesVisibles[index],
                    'ri-arrow-up-s-line': detallesVisibles[index]
                  }"
                  class="dropdown-arrow"
                ></i>
              </div>
              <p>{{ evento.descripcion }}</p>
              <div v-show="detallesVisibles[index]" class="timeline-detail">
                <p>{{ evento.detalle }}</p>
                <img v-if="evento.imagen" :src="evento.imagen" alt="Imagen del evento" class="timeline-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
<script>
  import { reactive } from 'vue';
  
  export default {
    name: 'HistoriaCooperativa',
    data() {
      return {
        eventos: [
          {
            fecha: '4 de mayo de 1935',
            descripcion: 'En Porteña, Provincia de Córdoba, el día 4 de mayo de 1935...',
            detalle: 'Aquí se puede agregar más información sobre este evento.',
            imagen: 'https://www.coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/Imagen%20de%20WhatsApp%202023-07-06%20a%20las%2011.09.10.jpg?itok=OPaUf3Qu',
          },
          {
            fecha: 'Noviembre de 1935',
            descripcion: 'Con el empuje de estos pioneros...',
            detalle: 'Más detalles sobre este evento...',
            imagen: 'path/to/image2.jpg',
          },
          {
            fecha: 'Diciembre de 1940',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'Diciembre de 1940',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'Diciembre de 1940',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'Diciembre de 1940',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
        ],
        detallesVisibles: reactive({}), 
      };
    },
    methods: {
      toggleDetail(index) {
        this.detallesVisibles[index] = !this.detallesVisibles[index]; 
      },
    },
  };
</script>
  
<style scoped>
h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}
.historia-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-event {
  background-color: #f1f1f1;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer; 
}

.timeline-date {
  font-weight: bold;
  color: #2980b9;
  font-size: 1.1rem;
}

.timeline-event p {
  font-size: 1rem;
  color: #34495e;
  margin-top: 10px;
}

.timeline-detail {
  padding-top: 10px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.timeline-image {
  margin-top: 10px;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.dropdown-arrow {
  font-size: 1.5rem;
  color: #0e1850;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: absolute;
  background-color: #107ccf56;
  border-radius: 5px;
  right: 15px;
  top: 50%;
  transform: translateY(-50%); 
}

.timeline-detail-enter-active,
.timeline-detail-leave-active {
  transition: all 0.3s ease;
}

</style>