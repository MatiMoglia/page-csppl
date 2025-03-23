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
            imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/Banner%20digital_factura%20digital-02.jpg?itok=Fa6bIzt9",
            ruta: "/facturaDigital",
          },
          {
            imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/banner-telecomunicaciones.jpg?itok=jXOG7ZnR",
            ruta: "/internet",
          },
          {
            imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/banner-gas.jpg?itok=YZL-kmLw",
            ruta: "/gas-natural",
          },
          {
            imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/banner-telefonia.jpg?itok=nbQ_6VNi",
            ruta: "/telefonia",
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
    margin-bottom: 20px;
}
  
.slider-item {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
}
  
.slider-img {
    width: 80%;
    height: 100%;
    object-fit: cover;
}
.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s ease;
}

.left {
    left: 5%;
}

.right {
    right: 5%;
}

.arrow:hover {
    background: rgba(255, 255, 255, 0.5);
    color: black;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
  