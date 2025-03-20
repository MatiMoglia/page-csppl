<template>
    <h1 class="title">Novedades principales</h1>
    <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
    </div>
    <div class="portal-noticias">
      <div class="slider-container">
        <div class="slider">
          <div 
            v-for="(novedad, index) in sliderNovedades" 
            :key="index" 
            class="slide"
            :class="{ active: index === currentSlide }"
          >
            <img :src="novedad.imagen" :alt="novedad.titulo" class="slide-img" />
            <div class="slide-text">
              <h3>{{ novedad.titulo }}</h3>
              <p>{{ novedad.subtitulo }}</p>
              <button @click="verNovedad(novedad.id)">Leer más</button>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevSlide">‹</button>
          <button @click="nextSlide">›</button>
        </div>
      </div>
      <div class="noticias-destacadas">
    <h2 class="subtitle">Ultimas novedades subidas:</h2>
    <div v-for="(novedad, index) in ultimasNoticias" :key="'detalle-' + index" class="novedad-detalle">
        <img :src="novedad.imagen" :alt="novedad.titulo" class="novedad-img" />
        <div class="novedad-texto">
            <h2>{{ novedad.titulo }}</h2>
            <p><strong>Fecha de publicación:</strong> {{ formatFecha(novedad.fecha) }}</p>
            <p>{{ novedad.subtitulo }}</p>
            <p>{{ novedad.contenido }}</p>
            <button @click="verNovedad(novedad.id)">Leer más</button>
        </div>
    </div>
</div>
      <div class="redes-sociales">
        <h2>¡Síguenos en nuestras redes sociales!</h2>
        <div class="social-links">
          <a href="https://www.facebook.com/" target="_blank">
            <i class="ri-facebook-fill"></i> Facebook
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <i class="ri-instagram-fill"></i> Instagram
          </a>
        </div>
      </div>
      <NovedadesGriad />
      <trabajoInter/>
    </div>
</template>

<script>
import apiNovs from "@/services/apiNovs";
import NovedadesGrid from "@/components/NovedadesGrid.vue";
import trabajoInter from "@/components/csppl-info/trabajoInter.vue";
import { toast } from 'vue3-toastify';

export default {
    data() {
      return {
        novedades: [],
        currentSlide: 0,
        interval: null,
        loading: false,
      };
    },
    components: {
      NovedadesGrid,
      trabajoInter
    },
    computed: {
      sliderNovedades() {
        return this.novedades.slice(0, 3);
      },
      ultimasNoticias() {
        return this.novedades.slice(-3).reverse(); 
      },
    },
    methods: {
        async fetchNovedades() {
        this.loading = true;
        try {
            const response = await apiNovs.getNovedades();

            if (Array.isArray(response)) {  
                this.novedades = response;  
            } else {  
                console.log("Respuesta inesperada:", response);  
                this.novedades = [];  
                toast.error("Error al cargar las novedades");  
            }

        } catch (error) {
            console.error("Error en fetchNovedades:", error);
            this.novedades = [];
            toast.error("Error al cargar las novedades");
        } finally {
            this.loading = false;
        }
      },
      verNovedad(id) {
        this.$router.push({ name: "NovedadDetalle", params: { id } });
      },
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.sliderNovedades.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.sliderNovedades.length) % this.sliderNovedades.length;
      },
      startAutoSlide() {
        this.interval = setInterval(this.nextSlide, 15000);
      },
      formatFecha(fecha) {
      if (!fecha) return "Fecha no disponible";
      const partes = fecha.split("-");
      return `${partes[0]}/${partes[1]}/${partes[2]}`;
      },
    },
    mounted() {
      this.fetchNovedades();
      this.startAutoSlide();
    },
    beforeUnmount() {
      clearInterval(this.interval);
    }
  };
</script>
  
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.377);
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 6px solid #0e144b;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.noticias-destacadas {
  width: 80%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #1f2c79;
  border-bottom: 3px solid #1f2c79;
  padding-bottom: 10px;
}

.novedad-detalle {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  align-items: center;
  background-color: rgba(244, 244, 244, 0.9); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
}

.novedad-img {
  width: 40%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.novedad-texto {
  width: 60%;
}

.novedad-texto h2 {
  margin: 10px 0;
}
  
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
}
.subtitle {
    padding: 15px;
    border-left: 5px solid #0e1850;
    font-size: 1.5rem;
    color: #1f2c79;
    margin-bottom: 20px;
}
  
.portal-noticias {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
  
.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
}
  
.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
  
.slide {
  min-width: 100%;
  display: none;
  position: relative;
  width: 100%;
  margin: auto;
  overflow: hidden;
}
  
.slide.active {
  display: block;
}
  
.slide-img {
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  object-fit: cover;
}
  
.slide-text {
  position: absolute;
  bottom: 35px;
  left: 110px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  border-radius: 5px;
  
}
button {
  margin-top: 10px;
  background-color: #112491;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  align-items: center;
  transition: ease 0.4s;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
button:hover {
  background-color: #445adb;
}
.slider-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
  
.slider-controls button {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 5px;
  transition: ease 0.3s;
}
.slider button {
  margin-top: 10px;
  background-color: #112491;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  align-items: center;
  transition: ease 0.4s;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
.slider button:hover {
  background-color: #445adb;
}

.slider-controls button:hover {  
  background: rgba(0, 0, 0, 0.8);
}
  
.redes-sociales {
  margin-top: 20px;
}
  
.redes-sociales h2 {
  font-size: 1.6rem;
  color: #1f2c79;
  border-top: 5px solid #0e1850;
  padding: 15px;
  width: 100%;
}
  
.social-links {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 20px;
}
  
.social-links a {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #124172;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}
  
.social-links a:hover {
  color: #4699f3;
}
  
.social-links i {
  font-size: 2rem;
  margin-right: 10px;
  color: #2600ff;
  transition: color 0.3s;
}
  
.social-links a:hover i {
  color: #4699f3;
}
</style>
  