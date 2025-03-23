<template>
  <div class="container">
    <section class="servicios">
      <div class="slider">
        <transition name="fade" mode="out-in">
          <img
            :key="servicios[currentIndex].imagen"
            :src="servicios[currentIndex].imagen"
            alt="Servicio Imagen"
            class="slider__img animate__animated"
            :class="animationClass"
          />
        </transition>

        <transition name="fade" mode="out-in">
          <div
            class="slider__text animate__animated"
            :key="servicios[currentIndex].nombre"
            :class="animationClass"
          >
            <h2>{{ servicios[currentIndex].nombre }}</h2>
            <p>{{ servicios[currentIndex].descripcion }}</p>
            <button
              class="btn-ver-mas animate__animated"
              :class="animationClass"
              @click="irAVista"
            >
              Ver más
            </button>
          </div>
        </transition>

        <div class="slider__controls">
          <button @click="previousService">←</button>
          <button @click="nextService">→</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "animate.css";
export default {
  data() {
    return {
      currentIndex: 0,
      animationClass: "animate__fadeIn",
      interval: null,
      servicios: [
        {
          nombre: "Gestion de Reclamos",
          descripcion: "Envianos tu consulta o reclamo online.",
          imagen:
            "https://www.oslpasteur.com.ar/portalHTML5/assets/images/reclamos.jpg",
          ruta: "/reclamos",
        },
        {
          nombre: "Factura Digital",
          descripcion: "Adherite al NUEVO metodo de envio de las facturas.",
          imagen:
            "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/Banner%20digital_factura%20digital-02.jpg?itok=Fa6bIzt9",
          ruta: "/facturaDigital",
        },
        {
          nombre: "Servicios Sociales",
          descripcion: "Adherite a la cobertura total de los servicios.",
          imagen:
            "https://wallpapers.com/images/hd/happy-family-pictures-ma4fl9ku2n89us3t.jpg",
          ruta: "/servicios-sociales",
        },
        {
          nombre: "Servicio de Fibra Optica",
          descripcion: "Conoce nuestros nuevos packs de Internet",
          imagen:
            "https://www.velocom.com.ar/wp-content/uploads/sites/6/post-internet-fibra-optica.jpg",
          ruta: "/telecomunicaciones",
        },
      ],
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    nextService() {
      this.animationClass = "animate__fadeOut";
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.servicios.length;
        this.animationClass = "animate__fadeIn";
      }, 500);
    },
    previousService() {
      this.animationClass = "animate__fadeOut";
      setTimeout(() => {
        this.currentIndex =
          (this.currentIndex - 1 + this.servicios.length) % this.servicios.length;
        this.animationClass = "animate__fadeIn";
      }, 500);
    },
    startAutoSlide() {
      this.interval = setInterval(() => {
        this.nextService();
      }, 8000);
    },
    irAVista() {
      this.$router.push(this.servicios[this.currentIndex].ruta);
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.slider {
  position: relative;
  width: 100%;
  margin: auto;
  overflow: hidden;
}

.slider__img {
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  object-fit: cover;
}

.slider__text {
  position: absolute;
  bottom: 20%;
  left: 30%;
  transform: translateX(-50%);
  border-radius: 10px;
  color: white;
  padding: 15px;
  text-align: center;
  width: 50%;
}

.slider__text h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: left;
}

.slider__text p {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: left;
}

.btn-ver-mas {
  display: block;
  width: 20%;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #143961;
  background: #f7f7f7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-ver-mas:hover {
  background: #dddddd;
}

.slider__controls {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translate(-50%, -50%);
}

.slider__controls button {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: ease 0.5s;
}

.slider__controls button:hover {
  background: rgba(7, 58, 100, 0.267);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
