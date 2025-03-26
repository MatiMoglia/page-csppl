<template>
    <h1 class="title">Agua Potable</h1>
    <br>
    <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
          <i class="ri-water-flash-line"></i>
        </button>
  
        <div v-if="mostrarGuardia" class="guardia-popup">
          <p>Número de Guardia: <strong>3564-593561</strong></p>
        </div>
    <div class="aguapotable">
      <br>
      <div class="agua-container" data-aos="fade-up">
        <p>
          Con una red de 53 kilómetros de longitud y más de 2429 conexiones, brindamos el servicio de agua potable a la localidad de Porteña tras el otorgamiento de la concesión de dicho servicio por parte del municipio local.
          Este recurso primordial para la vida lo obtenemos de acuíferos situados en proximidades a Villa María, entre Yucat y Puente Andino, a través de perforaciones que alcanzan los 120-180 metros de profundidad.
          Desde allí, el agua recorre una galería subterránea hasta llegar a la cámara de carga que la envía al acueducto San Francisco-Morteros.
        </p>
        <p>
          <strong>El agua que llega a cada hogar porteñense cumple con un protocolo de control reglamentado.</strong>
          El mismo incluye diversos análisis a cargo de los laboratorios de la Universidad Tecnológica Nacional y del Instituto Nuestra Señora de Lourdes de nuestra localidad.
          A su vez el ERSeP envía pruebas de agua que son analizadas por la Facultad Regional de Villa María, UTN.
        </p>
        <p>
          A ello le sumamos los procedimientos de cloración y análisis periódicos en distintos puntos de la red que garantizan la salubridad del recurso.
        </p>
        <br>
        <h3>Información sobre del servicio:</h3>
        <div class="btn-files">
          <button @click="openFileReglamento" class="open-btn">
            Leer reglamento Agua Potable
          </button>
          <button @click="openFileCuadro" class="open-btn">
            Cuadro tarifario Agua Potable
          </button>
        </div>
      </div>
  
      <div class="dropdown-containers">
        <div class="dropdown" @mouseenter="mostrarRecomendaciones = true" @mouseleave="mostrarRecomendaciones = false">
          <button class="dropdown-btn" data-aos="fade-up">
            Cuidado del tanque del Agua
            <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarRecomendaciones}"></i>
          </button>
          <div class="dropdown-content" v-show="mostrarRecomendaciones">
            <img src="https://www.coopspportena.com.ar/sites/default/files/LIMPIEZA%20DE%20TANQUE%20DE%20AGUA.jpg" alt="Cuidado del tanque de agua">
            <button @click="abrirModal" class="btn-agrandar">Ver</button>
          </div>
        </div>
  
        <div v-if="mostrarModal" class="modal" @click="cerrarModalClick">
          <div class="modal-content" @click.stop>
            <img src="https://www.coopspportena.com.ar/sites/default/files/LIMPIEZA%20DE%20TANQUE%20DE%20AGUA.jpg" alt="Imagen grande">
            <button class="close-modal" @click="cerrarModal">
              <i class="ri-close-line"></i>
            </button>
          </div>
        </div>
  
        <div class="dropdown" @mouseenter="mostrarCuidados = true" @mouseleave="mostrarCuidados = false">
          <button class="dropdown-btn" data-aos="fade-up">
            Cuidado del Agua Potable
            <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarCuidados}"></i>
          </button>
          <div class="dropdown-content" v-show="mostrarCuidados">
            <img src="https://www.coopspportena.com.ar/sites/default/files/Recomendaciones%20agua%20potable-02.jpg" alt="Cuidado del agua">
            <button @click="abrirModal" class="btn-agrandar">Ver</button>
          </div>
        </div>
  
        <div v-if="mostrarModal" class="modal" @click="cerrarModalClick">
          <div class="modal-content" @click.stop>
            <img src="https://www.coopspportena.com.ar/sites/default/files/Recomendaciones%20agua%20potable-02.jpg" alt="Imagen grande">
            <button class="close-modal" @click="cerrarModal">
              <i class="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>
  
      <formSolicitud servicio="Agua Potable" sugerencia="no" adjuntar="si" data-aos="fade-right"/>
    </div>
</template>
  
<script>
import formSolicitud from '@/components/FormAltaBaja.vue';
import AOS from "aos";
import "aos/dist/aos.css";
  export default {
    data() {
      return {
        mostrarGuardia: false,
        mostrarRecomendaciones: false,
        mostrarCuidados: false,
        mostrarModal: false,
      };
    },
    components: {
      formSolicitud
    },
    methods: {
      openFileReglamento() {
        window.open('https://drive.google.com/file/d/1h-xcV4hr6gUSvIhjFjeA40WDl5dJbW5y/view?usp=sharing');
      },
      openFileCuadro() {
        window.open('https://drive.google.com/file/d/1h-xcV4hr6gUSvIhjFjeA40WDl5dJbW5y/view?usp=sharing');
      },
      abrirModal() {
        this.mostrarModal = true;
        document.addEventListener("keydown", this.handleEscape);
      },
      cerrarModal() {
        this.mostrarModal = false;
        document.removeEventListener("keydown", this.handleEscape);
      },
      cerrarModalClick(event) {
        if (event.target.classList.contains("modal")) {
          this.cerrarModal();
        }
      },
      handleEscape(event) {
        if (event.key === "Escape") {
          this.cerrarModal();
        }
      }
    },
    mounted(){
      AOS.init();
    }
  }
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
.aguapotable {
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding-right: 120px;
  padding-left: 120px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.aguapotable button {
  font-family:"Montserrat", sans-serif;
}
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
}
.agua-container {
  padding: 15px;
  background-color: rgba(244, 244, 244, 0.9); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-left: 5px solid #0e1850;
}
  
h1, h2 {
    text-align: center;
    color: #2c3e50;
}
  
p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
}
  
ul {
    list-style-type: none;
    padding: 0;
}
  
li {
    font-size: 18px;
    color: #333;
    line-height: 1.6;
    gap: 10px;
    margin: 12px;
}
.dropdown-containers {
    display: flex;
    gap: 15px;
}
.dropdown {
    margin: 20px auto;
    width: 50%;
    text-align: center;
}
  
.dropdown-btn {
    background-color: #0e1850;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
    transition: 0.3s;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dropdown-btn:hover {
    background-color: #3974ac;
}
  
.dropdown-content {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 5px;
    text-align: center;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    overflow-y: auto;
}
  
.dropdown-content img {
    width: 100%; 
    height: 150px;
    object-fit: cover; 
    border-radius: 5px; 
}
  
.dropdown-arrow {
    transition: transform 0.3s;
}
  
.rotate-arrow {
    transform: rotate(180deg);
}
.open-btn {
    margin-top: 15px;
    background-color: #0e1850;
    color: white;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
}
  
.open-btn:hover {
    background-color: #3974ac;
}
.btn-files {
    display: flex;
    gap: 20px;
    margin: 10px;
}
.guardia-btn {
    position: fixed;
    bottom: 110px;
    right: 30px;
    background-color: #2848ff;
    color: white;
    padding: 12px 18px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    z-index: 1000;
}
.guardia-btn:hover {
    background-color: #0e1850;
}

.guardia-popup {
    position: fixed;
    bottom: 40px;
    right: 20px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    color: #0e1850;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
}
  
.modal-content {
    position: relative;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    max-width: 90%;
    max-height: 80%;
    overflow: auto;
}
  
.modal-content img {
    width: 100%;
    height: auto;
}
  
.close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f73939;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}
.btn-agrandar {
    margin-top: 15px;
    background-color: #0e1850;
    color: white;
    padding: 5px 5px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
}
.guardia-popup {
    position: fixed;
    bottom: 160px;
    right: 30px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    color: #0e1850;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
  