<template>
    <div class="container">
        <section class="servicios">
            <div class="slider">
                <transition name="fade" mode="out-in">
                    <div
                        class="slider__content animate__animated"
                        :class="animationClass"
                        :key="servicios[currentIndex].titulo"
                        :style="{ backgroundImage: `url(${servicios[currentIndex].imagen})` }"
                    >
                        <div class="slider__text">
                            <h2>{{ servicios[currentIndex].titulo }}</h2>
                            <p>{{ servicios[currentIndex].descripcion }}</p>
                            <button @click="showMoreInfo">Más info</button>
                        </div>
                    </div>
                </transition>
                <div class="slider__controls">
                    <button @click="previousService" class="control-button">←</button>
                    <button @click="nextService" class="control-button">→</button>
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
                    titulo: "Traslado Social",
                    imagen: "https://coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/Imagen%20Article%20web%20traslado%20social-01.jpg?itok=YsTgMpEu",
                    descripcion: "Servicio de traslado programado para pacientes que no pueden movilizarse de otro modo.",
                },
                {
                    titulo: "Banco de Sangre",
                    imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/Foto2.jpeg?itok=cRUvFYo4",
                    descripcion: "Banco solidario para garantizar sangre de calidad en tratamientos y emergencias.",
                },
                {
                    titulo: "Sepelio",
                    imagen: "https://coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/IMG_5039%5B1%5D.JPG?itok=6l6uR4Fk",
                    descripcion: "Cobertura integral con respeto y acompañamiento a familiares.",
                }
            ]
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
                this.currentIndex = (this.currentIndex - 1 + this.servicios.length) % this.servicios.length;
                this.animationClass = "animate__fadeIn";
            }, 250);
        },
        startAutoSlide() {
            this.interval = setInterval(() => {
                this.nextService();
            }, 8000);
        },
        showMoreInfo() {
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}

.servicios {
    width: 100%;
}

.slider {
    position: relative;
    width: 100%;
    height: 90vh;
    overflow: hidden;
}

.slider__content {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    color: white;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
}

.slider__text {
    position: absolute;
    left: 10%;
    top: 70%;
    transform: translateY(-70%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 15px;
    text-align: left;
    width: 70%; 
    max-width: 500px; 
    border-radius: 5px ;
}

h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
}

p {
    font-size: 1.1rem;
}

button {
    background: #1f2c79;
    color: white;
    font-size: 1.2rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.3s;
}

button:hover {
    background: #0056b3;
}

.slider__controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.control-button {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
}

.control-button:hover {
    background: rgba(255, 255, 255, 0.3);
}
</style>
