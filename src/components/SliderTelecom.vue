<template>
    <div class="container">
      <section class="servicios">
        <div class="slider">
          <transition name="fade" mode="out-in">
            <div
              :key="servicios[currentIndex].imagen"
              class="slider__banner"
              :style="{ backgroundImage: 'url(' + servicios[currentIndex].imagen + ')' }"
            >
              <div class="slider__text">
                <h2>{{ servicios[currentIndex].nombre }}</h2>
                <p>{{ servicios[currentIndex].descripcion }}</p>
              </div>
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
            nombre: "Fibra Óptica",
            descripcion: "Contratá la mejor velocidad de internet para tu hogar.",
            imagen: "https://www.cirrus.cl/wp-content/uploads/2022/05/Slide_01_internet.jpg",
          },
          {
            nombre: "Internet Rural",
            descripcion: "Contrata el servicio para la zona rural de Porteña.",
            imagen: "https://www.clarin.com/2018/04/28/BJwIVYGpf_1256x620__1.jpg",
          },
          {
            nombre: "Precios Accesibles",
            descripcion: "Elegi el pack de Internet que mas te convenga.",
            imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/Banner%20digital_guias%20telefonicas-03.jpg?itok=L-MMmDXt",
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
        }, 250);
      },
      previousService() {
        this.animationClass = "animate__fadeOut";
        setTimeout(() => {
          this.currentIndex =
            (this.currentIndex - 1 + this.servicios.length) % this.servicios.length;
          this.animationClass = "animate__fadeIn";
        }, 250);
      },
      startAutoSlide() {
        this.interval = setInterval(() => {
          this.nextService();
        }, 10000);
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
    max-width: 100%;
    overflow: hidden;
}
  
.slider {
    position: relative;
    width: 100%;
    margin: auto;
    overflow: hidden;
}
  
.slider__banner {
    position: relative;
    width: 100%;
    min-height: 400px;
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease-in-out;
}
  
.slider__text {
  position: absolute;
  bottom: 10%;
  left: 30%;
  transform: translateX(-50%);
  border-radius: 10px;
  color: #052241;
  padding: 15px;
  text-align: center;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.534);
}

.slider__text h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: left;
}

.slider__text p {
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: left;
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
}
  
.slider__controls button:hover {
    background: rgba(7, 58, 100, 0.267);
}
  
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
  
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
  