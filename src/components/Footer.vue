<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Servicios</h3>
        <ul>
          <li>Agua Potable</li>
          <li>Alumbrado Público</li>
          <li>Energía Eléctrica</li>
          <li>Servicios Sociales</li>
          <li>Telecomunicaciones</li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Administración</h3>
        <p><strong>Atención:</strong> Lunes a viernes de 7:00 a 14:00</p>
        <p><strong>Teléfono:</strong> 03564 450 000</p>
        <p><strong>Email:</strong> <a href="mailto:admcsppl@gmail.com">admcsppl@gmail.com</a></p>
        <p><strong>Nuestra oficina:</strong> Av. Simón Daniele 259, Porteña, Córdoba. C.P.: 2415</p>
        <button @click="toggleMap" class="map-button">Mostrar/Ocultar Mapa</button>
        <div class="map-container" v-if="showMap">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.169553011653!2d-62.066510308304444!3d-31.01594009389834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943520ae808be0f7%3A0x7e78582e3cfd3a1a!2sCooperativa%20De%20Servicios%20Publicos%20De%20Porte%C3%B1a%20Limitada.!5e0!3m2!1ses-419!2sar!4v1740797966515!5m2!1ses-419!2sar"
            width="400" 
            height="300"
            style="border: 2px solid #2371b9;" 
            loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      
      <div class="footer-section data-fiscal-section">
        <h3>Data Fiscal</h3>
        <img src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" alt="Data Fiscal" class="data-fiscal">
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Cooperativa de Servicios Públicos de Porteña. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
data() {
  return {
    showMap: false,
  };
},
methods: {
  toggleMap() {
    this.showMap = !this.showMap;
  }
}
};
</script>

<style scoped>
.footer-section.data-fiscal-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.footer {
  background-color: #121941;
  color: white;
  text-align: left;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 10px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  padding: 15px;
}

.footer-section h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
  border-bottom: 2px solid #2371b9;
  padding-bottom: 8px;
  display: inline-block;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin: 8px 0;
  font-size: 1.1em;
}

.footer-section p {
  font-size: 1.1em;
  margin: 5px 0;
}

.footer-section a {
  color: #2152d8;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.data-fiscal {
  width: 100px;
  height: auto;
  margin-top: 10px;
}

.footer-bottom {
  background-color: #111111a8;
  padding: 20px 0px;
  text-align: center;
  width: 100% !important;
  position: relative;
  bottom: 0;
}

li {
  text-align: left;
}
.map-container {
  margin-top: 15px;
  width: 100%;
  max-width: 400px; 
  margin-bottom: 10px;
}

.map-container iframe {
  width: 100%;
  height: 300px;
  border: 2px solid #dadada; 
}

.map-button {
  background-color: #184a79;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s ease;
}

.map-button:hover {
  background-color: #1a5a8a;
}
</style>
