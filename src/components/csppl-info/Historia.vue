<template>
  <h1 class="title">Nuestra Historia</h1>
    <div class="historia-container">
      <div class="historia-inicio" data-aos="fade-up">
        <h2 class="subtitle">Inicios y Fundacion</h2>
        <p>La historia de nuestra cooperativa de servicios es el reflejo del esfuerzo y la visión de una comunidad unida por el bienestar común.
          Nació en 1935 con el propósito de brindar soluciones accesibles y de calidad a las necesidades esenciales de nuestros socios. 
          En sus primeros años, un grupo de vecinos comprometidos vio la necesidad de crear una entidad solidaria que garantizara el acceso equitativo a
          los servicios que hacian falta en la sociedad de ese momento. 
        </p>
        <p>
          A través del trabajo cooperativo y los valores de la ayuda mutua, la equidad y la participación democrática,
          nuestra institución comenzó a crecer, sumando nuevos servicios y mejorando la calidad de vida de la comunidad.
          Desde sus primeros días, cada avance ha sido fruto del compromiso de sus socios, quienes confiaron en el modelo cooperativo como la mejor herramienta para el desarrollo local.
        </p>
      </div>
      <div class="historia-inicio" data-aos="fade-up">
        <h2 class="subtitle">Linea Historica de la Cooperativa</h2>
        <p>Te presentamos la linea historica de los sucesos y acontecimientos mas importantes
          de nuestra cooperativa desde su fundación, respeto y homenaje a todos los que fundaron esta institución.
        <br>
        Son ya 90 años de alegrías y de penas, alegrías por los logros conseguidos y penas por todos aquellos que hoy ya no nos acompañan físicamente, pero que sí espiritualmente los sentimos a nuestro lado,
        y en sus nombres, este Consejo de Administración que ocasionalmente hoy
        rige los destinos de esta entidad, agradece a todos aquellos que anónimamente día a día apoyan nuestro esfuerzo.
        </p>
      </div>
      <section class="historia-section" data-aos="fade-up">
        <div class="section-content">
          <div class="timeline">
            <div v-for="(evento, index) in eventosFiltrados" :key="index" class="timeline-event">
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
          <button data-aos="flip-right" class="toggle-button" @click="toggleVerMas">{{ mostrarTodos ? 'Ver menos' : 'Ver más' }}</button>
        </div>
      </section>
    </div>
</template>
<script>
import { reactive } from 'vue';
import AOS from "aos";
import "aos/dist/aos.css";
  export default {
    name: 'HistoriaCooperativa',
    data() {
      return {
        eventos: [
          {
            fecha: '4 de mayo de 1935',
            descripcion: 'En Porteña, Provincia de Córdoba, el día 4 de mayo de 1935...',
            detalle: 'ejemplo',
            imagen: 'https://www.coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/Imagen%20de%20WhatsApp%202023-07-06%20a%20las%2011.09.10.jpg?itok=OPaUf3Qu',
          },
          {
            fecha: 'Noviembre de 1935',
            descripcion: 'Con el empuje de estos pioneros...',
            detalle: 'Más detalles sobre este evento...',
            imagen: '',
          },
          {
            fecha: 'marzo de 1955',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'Diciembre de 1970',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'enero de 1980',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
          {
            fecha: 'mayo de 1999',
            descripcion: 'La cooperativa comenzó la fabricación y venta de hielo...',
            detalle: 'Detalles adicionales sobre este evento.',
            imagen: '',
          },
        ],
        detallesVisibles: reactive({}), 
        mostrarTodos: false,
      };
    },
    computed: {
      eventosFiltrados() {
        return this.mostrarTodos ? this.eventos : this.eventos.slice(0, 5);
      }
    },
    methods: {
      toggleDetail(index) {
        this.detallesVisibles[index] = !this.detallesVisibles[index]; 
      },
      toggleVerMas() {
        this.mostrarTodos = !this.mostrarTodos;
      }
    },
    mounted() {
      AOS.init();
    },
  };
</script>
  
<style scoped>
.toggle-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #1f2c79;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-family:"Montserrat", sans-serif;
  transition: ease 0.5s;
  font-weight: bold;
}
.toggle-button:hover {
  background-color: #0e1850;
}
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
}
.historia-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.historia-inicio {
  padding: 15px;
  background-color: rgba(244, 244, 244, 0.9); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-left: 5px solid #0e1850;
  margin-bottom: 20px;
}
.subtitle {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1f2c79;
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
  color: #1f2c79;
  font-size: 1.1rem;
}

.timeline-event p {
  font-size: 1rem;
  color: #34495e;
  margin-top: 10px;
}
p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
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
 .section-content {
  padding: 10px;
 }

</style>