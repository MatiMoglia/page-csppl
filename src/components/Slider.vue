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
  
          <div class="slider__text">
            <h4>{{ servicios[currentIndex].nombre }}</h4>
            <p>{{ servicios[currentIndex].descripcion }}</p>
          </div>
  
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
            nombre: "Energía Eléctrica",
            descripcion: "Suministro de energía eléctrica.",
            imagen:
              "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/Banner%20digital_guias%20telefonicas-03.jpg?itok=L-MMmDXt",
          },
          {
            nombre: "Agua Potable",
            descripcion: "Distribución de agua limpia y segura.",
            imagen:
              "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/Banner%20digital_factura%20digital-02.jpg?itok=Fa6bIzt9",
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
        }, 8000);
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
</style>
  