<template>
  <div class="chatbot">
    <div class="whatsapp-container" @mouseover="mostrarTooltip = true" @mouseleave="mostrarTooltip = false">
      <button class="whatsapp-btn" @click="redirigirWhatsApp">
        <img src="../assets/css/img/wsp-logo.png" alt="WhatsApp" class="whatsapp-img" />
      </button>
      <div v-if="mostrarTooltip" class="tooltip">Habla con Administracion</div>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        mostrarTooltip: false
      };
    },
    methods: {
      redirigirWhatsApp() {
        const numero = "5493564331499";
        const mensaje = "Hola";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
      }
    }
  };
</script>
  
<style scoped>
.whatsapp-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1100;
  background: none
}
  
.whatsapp-btn {
  background: none;
  border: none;
  cursor: pointer;
}
  
.whatsapp-img {
  width: 70px;
  height: 70px;
  transition: transform 0.3s ease;
}
  
.whatsapp-img:hover {
  transform: scale(1.1);
}
  
.tooltip {
  background-color: rgba(0, 0, 0, 0.795);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  position: absolute;
  bottom: 20px;
  left: 80px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
</style>
  