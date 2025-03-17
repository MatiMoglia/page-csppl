<template>
    <h1 class="title">Telefonía Fija</h1>
    <br>
    <div class="telefonia">
        <div class="telefonia-container">
            <div class="features-list">
                <p class="service-description">
                    Nuestro servicio de telefonía fija ofrece una comunicación confiable y de alta calidad, 
                    permitiéndote mantenerte conectado con tus seres queridos y negocios sin interrupciones. 
                    Con múltiples funcionalidades avanzadas, garantizamos una experiencia superior y sin complicaciones.
                </p>
                <h2 class="subtitle">Con nuestro Plan tenés:</h2>
                <ul>
                    <li><i class="ri-check-line"></i> Identificador de llamadas</li>
                    <li><i class="ri-check-line"></i> Hot Line</li>
                    <li><i class="ri-check-line"></i> No molestar</li>
                    <li><i class="ri-check-line"></i> Despertador / Alarma</li>
                    <li><i class="ri-check-line"></i> Desvío de llamadas</li>
                </ul>
                <div class="guides-buttons">
                    <h3>Guías Telefónicas</h3>
                    <div class="buttons-container">
                        <a href="https://drive.google.com/your-link" class="guide-button" target="_blank">
                            <i class="ri-contacts-book-line"></i> Guía Porteña
                        </a>
                        <a href="https://drive.google.com/your-link" class="guide-button" target="_blank">
                            <i class="ri-contacts-book-line"></i> Guía Seeber
                        </a>
                        <a href="https://drive.google.com/your-link" class="guide-button" target="_blank">
                            <i class="ri-contacts-book-line"></i> Guía Vignaud
                        </a>
                    </div>
                </div>
            </div>
            <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
                <i class="ri-phone-line"></i>
            </button>
            <div v-if="mostrarGuardia" class="guardia-popup">
                <p>Número de Guardia: <strong>3564-630995</strong></p>
            </div>
        </div>
        <formSolicitud servicio="Telefonía" sugerencia="no" adjuntar="no"/>
    </div>
    <br>
</template>
<script>
import formSolicitud from "@/components/FormAltaBaja.vue";
export default {
    data() {
        return {
            mostrarGuardia: false
        }
    },
    components: {
        formSolicitud
    }
};

</script>
  
<style scoped>
html {
  scroll-behavior: smooth;
}
.telefonia {
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding-right: 120px;
    padding-left: 120px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
.title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.5rem;
    padding: 15px;
}
.subtitle {
    color: #333;
    text-align: left;
    font-size: 1.8rem;
    margin-bottom: 20px;
}
h1{
    text-align: center;
    
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
  
.telefonia-container {
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    margin: 0;
}
.features-list {
    text-align: left;
}
  
.features-list h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
    margin-top: 10px
}
  
.features-list ul {
    list-style: none;
    padding-left: 0;
}
  
.features-list li {
    font-size: 1.2rem;
    margin: 10px 0;
    display: flex;
    align-items: center;
}
.features-list li i {
    font-size: 1.5rem;
    margin-right: 10px;
    color: #1a36d1;
}
  
.guides-buttons {
    text-align: center;
}

.guides-buttons h3 {
    font-size: 1.8rem;
    color: #ffffff;
    padding-top: 15px;
    margin: 10px -15px -15px -15px; 
    background: #0e1850;
}
.guide-button i {
    margin-right: 5px;
    color: #ffffff; 
}
.buttons-container {
    display: flex;
    justify-content: center;
    gap: 70px;
    background: #0e1850;
    color: rgb(255, 255, 255);
    padding: 20px;
    margin: 10px -15px -15px -15px; 
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.guide-button {
    background-color: #2848ff;
    color: white;
    padding: 12px 60px;
    font-size: 1.1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}
.guide-button:hover {
    background-color: #1a36d1;
    cursor: pointer;
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
</style>
  