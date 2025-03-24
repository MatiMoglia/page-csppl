<template>
    <div class="slider-container">
      <button class="arrow left" @click="previous">←</button>
  
      <transition name="fade" mode="out-in">
        <div 
          :key="servicios[currentIndex].ruta" 
          class="slider-item"
          @click="goToPage(servicios[currentIndex].ruta)"
        >
          <img 
            :src="servicios[currentIndex].imagen" 
            :alt="servicios[currentIndex].nombre" 
            class="slider-img" 
          />
        </div>
      </transition>
  
      <button class="arrow right" @click="next">→</button>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        currentIndex: 0,
        interval: null,
        servicios: [
          {
            imagen: "https://coopspportena.com.ar/sites/default/files/styles/banner_promocional_index/public/banner-promocion/bitmap.png?itok=Wk-J96p_",
            ruta: "/testVelocidad",
          },
          {
            imagen:  require("@/assets/css/img/convenios.jpg"),
            ruta: "/contacto",
          },
          {
            imagen: require("@/assets/css/img/internet300.jpg"),
            ruta: "/telecomunicaciones",
          },
        ],
      };
    },
    mounted() {
      this.startAutoSlide();
    },
    methods: {
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.servicios.length;
      },
      previous() {
        this.currentIndex = 
          (this.currentIndex - 1 + this.servicios.length) % this.servicios.length;
      },
      goToPage(ruta) {
        this.$router.push(ruta);
      },
      startAutoSlide() {
        this.interval = setInterval(() => {
          this.next();
        }, 5000);
      },
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>
  
<style scoped>
.slider-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
}
  
.slider-item {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
}
  
.slider-img {
    width: 85%;
    height: 100%;
    object-fit: cover;
}
.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    color: white;
    border: none;
    padding: 10px;
    font-size: 25px;
    cursor: pointer;
    z-index: 10;
    transition: 0.3s ease;
}

.left {
    left: 8%;
}

.right {
    right: 8%;
}

.arrow:hover {
    color: black;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
  