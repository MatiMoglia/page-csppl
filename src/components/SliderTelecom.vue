<template>
    <div class="container">
      <section class="servicios">
        <div class="slider">
          <!-- Animación de deslizamiento para los banners -->
          <transition name="fade" mode="out-in">
            <div
              :key="servicios[currentIndex].imagen"
              class="slider__banner"
              :style="{ backgroundImage: 'url(' + servicios[currentIndex].imagen + ')' }"
            >
              <div class="slider__text">
                <h1>{{ servicios[currentIndex].nombre }}</h1>
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
            imagen: "https://media.istockphoto.com/id/1215789535/es/foto/familia-feliz-con-los-ni%C3%B1os-sentarse-en-el-sof%C3%A1-usando-la-computadora-port%C3%A1til.jpg?s=612x612&w=0&k=20&c=m__P8CWt_onNg1irKYGKVWRs5AqDI2io-nJAjNE2K1U=",
          },
          {
            nombre: "Telefonía Fija",
            descripcion: "Conectate con el mejor servicio de telefonía.",
            imagen: "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/HXF7Q6YTMNKSZG5XTVIBNKQPCY.jpg",
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
h1 {
    font-size: 1.9rem;
    margin-bottom: 10px;
}
p {
    font-size: 1.4rem;
    margin-bottom: 10px;
}
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
    min-height: 300px;
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease-in-out;
  }
  
  .slider__text {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 15px;
    text-align: center;
    width: 80%;
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
  