<template>
    <div>
      <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
        <i class="ri-tv-line"></i>
      </button>
      <div v-if="mostrarGuardia" class="guardia-popup">
        <p>Número de Guardia: <strong>3564-630995</strong></p>
      </div>
      <div class="banner-container" data-aos="fade-up">
        <img src="https://www.coopspportena.com.ar/sites/default/files/BANNER%20PACKS_BANNER%20PACKS.jpg" 
             alt="Banner Cooplus">
      </div>
      <h1 class="title" data-aos="fade-up">COOPLUS+</h1>
      <div class="container-cooplus" data-aos="fade-up" data-aos-delay="200">
        <p>
          La nueva forma de ver televisión, un producto diferente que desde la Cooperativa queremos ofrecerte para que puedas tener TV HD + Internet de 100, 200 y 300 Megas + Telefonía en tu casa. Esta experiencia viene a transformar tu forma de ver televisión, más de 100 canales en vivo y el mejor contenido On Demand, desde cualquier dispositivo, donde sea que estés. COOPLUS, + evolución para vos.
        </p>
        <p>
          (Todo el Equipamiento que instalamos en tu hogar se entrega en comodato. Esto significa que en caso de solicitar la baja del servicio deberás devolverlo a la Cooperativa.)
        </p>
      </div>
      <h2 class="subtitle" data-aos="zoom-in">¡Conoce nuestros Packs!</h2>
      <div class="container-packs">
          <div 
            class="pack" id="hogar-pack" data-aos="flip-left"
            :id="'hogar-pack'"
            @mouseover="highlightPack(true, 'hogar-pack')" 
            @mouseleave="highlightPack(false, 'hogar-pack')" 
            @click="selectPack('Pack Hogar')">
            <span class="most-popular economico">Plan económico</span>
            <h2>PACK HOGAR</h2>
            <p><strong><span class="highlight-price">$23.999</span></strong></p>
            <ul>
              <li><span class="highlight">INTERNET <strong style="color: #d11aa9;">100 MB</strong></span></li>
               <li>TV HD Plataforma SENSA</li>
               <br><br><br><br>
                <li><span style="font-weight: bold;">MAX y UNIVERSAL</span></li>
                <li>
                <img src="../assets/css/img/max.png" 
                alt="ESPN Premium" class="small-channel-logo">

                <img src="../assets/css/img/universal.png" 
                  alt="TNT Sports" class="small-channel-logo">
              </li>
              <br><br><br><br>
                <li>App para dispositivos <strong style="color: #d11aa9; cursor: pointer;">SENSA</strong></li>
                <li>Instalación <strong>SIN CARGO</strong></li>
                <li>Telefonía Fija</li>
                <li>Asistencia Técnica</li>
            </ul>
            <button>PEDILO ACÁ</button>
          </div>
          <div 
            class="pack" id="cooplus-pack" data-aos="flip-right"
            :id="'cooplus-pack'"
            @mouseover="highlightPack(true, 'cooplus-pack')" 
            @mouseleave="highlightPack(false, 'cooplus-pack')" 
            @click="selectPack('Pack CooPlus')">
            <span class="most-popular">El más pedido</span>
            <h2>PACK COOPLUS</h2>
            <p><strong><span class="highlight-price">$34.999</span></strong></p>
            <ul>
              <li><span class="highlight">INTERNET <strong style="color: #d11aa9;">200 MB</strong></span></li>
              <li>TV HD Plataforma SENSA</li>
              <li><span  style="color: #d11aa9; font-weight: bold;">Canales de Fútbol Premium</span></li>
              <li>
                <img src="../assets/css/img/espn.webp" 
                  alt="TNT Sports" class="small-channel-logo">
                <img src="../assets/css/img/tnt.png" 
                  alt="ESPN Premium" class="small-channel-logo">
              </li>
              <li><span style="font-weight: bold;">MAX y UNIVERSAL</span></li>
              <li>
                <img src="../assets/css/img/max.png" 
                alt="ESPN Premium" class="small-channel-logo">

                <img src="../assets/css/img/universal.png" 
                  alt="TNT Sports" class="small-channel-logo">
              </li>
              <li>App para dispositivos <strong style="color: #d11aa9; cursor: pointer">SENSA</strong></li>
              <li>Instalación <strong>SIN CARGO</strong></li>
              <li>Telefonía Fija</li>
              <li>Asistencia Técnica</li>
            </ul>
              <button>PEDILO ACÁ</button>
          </div>
      </div>
      <h2 class="subtitle" data-aos="zoom-in">¡Mirá todo lo que podés hacer con SENSA!</h2>
      <div class="advantages-container">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="advantage-row" data-aos="fade-right">
          <div v-for="(card, idx) in row" :key="idx" class="advantage-card">
            <i :class="card.icon"></i>
            <h4>{{ card.title }}</h4>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>

      <div class="sensa-container">
        <div class="sensa-background"></div>
          <div class="sensa-content">
            <h2 data-aos="zoom-in">¿Dónde puedo ver SENSA?</h2>
            <div class="container-sensa-dispositivos" data-aos="fade-up">
              <ul>
                <li><strong>Celulares:</strong> Android y iPhone</li>
                <li><strong>Tablets:</strong> Android</li>
                <li><strong>Smart TV:</strong> Android TV, Apple TV, Amazon Fire TV y Roku TV</li>
                <li><strong>PC y Notebooks</strong></li>
                <li><strong>Chromecast</strong></li>
              </ul>
            </div>
          </div>
      </div>
      <div>
      <img src="../assets/css/img/sensa-img.jpg" class="channel-sensa" alt="Sensa" data-aos="fade-up">
    </div>
    </div>
    <div class="container-adhesion" data-aos="fade-up" data-aos-delay="200">
      <h1 class="title">¡Adherite ahora mismo!</h1>
      <p>Completa el siguiente formulario para poder elegir el pack que desees y disfrutar del servicio.</p>
    </div>
    <div class="container-form" id="formulario"  data-aos-delay="200">
      <formCooplus :pack="selectedPack"/>
    </div>
</template>
  
<script>
import formCooplus from "@/components/FormCooplus";
import AOS from "aos";
import "aos/dist/aos.css";

  export default {
    components: {
      formCooplus
    },
    data() {
      return {
        selectedPack: 'Pack Hogar',
        mostrarGuardia: false,
        cards: [
          { title: "Multiple contenido", description: "Mirá todo tu contenido hasta en 5 pantallas móviles en simultáneo.", icon: "ri-tv-line" },
          { title: "Pausalo cuando quieras", description: "¡Ya no dependas de la transmisión en vivo! Pausá un programa y continualo cuando vos quieras.", icon: "ri-pause-line" },
          { title: "No te pierdas de nada", description: "¿Te perdiste tu momento favorito? Retrocedé tu contenido en vivo.", icon: "ri-speed-line" },
          { title: "Miralo cuando quieras", description: "Guardamos todos tus programas en vivo hasta por 24hs! Buscalo en la grilla y no te pierdas de nada.", icon: "ri-refresh-line" },
          { title: "Sistema de busqueda", description: "Buscá entre cientos de series y películas para ver cuando quieras!", icon: "ri-search-line" },
        ]
      };
    },
    methods: {
      highlightPack(isHovered, packId) {
        const packElement = document.querySelector(`#${packId}`);
        if (packElement) {
          if (isHovered) {
            packElement.classList.add('highlight');
          } else {
            packElement.classList.remove('highlight');
          }
        }
      },
      selectPack(packName) {
        document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
        this.selectedPack = packName;
      }
    },
    mounted() {
      AOS.init();
    },
    computed: {
      rows() {
        const rows = [];
        for (let i = 0; i < this.cards.length; i += 5) {
          rows.push(this.cards.slice(i, i + 5));
        }
        return rows; 
      } 
    }
  };
</script>
<style scoped>
.small-channel-logo {
  display: inline-block; 
  vertical-align: middle;
  width: 100px;
  margin: 10px;
}
.channel-sensa {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  width: 100%; 
}

.container-cooplus, .container-packs {
  margin: 20px;
  padding: 15px;
  border-radius: 8px;
  padding-left: 120px;
  padding-right: 120px;
}
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
}
.subtitle {
  color: #1f2c79;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}
.container-packs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  padding-left: 120px;
  padding-right: 120px;
}

.pack {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(21, 22, 102, 0.432);
  width: 45%;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.pack:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(65, 89, 226, 0.849);
}
.pack h2 {
  background: #0e1850; 
  color: rgb(255, 255, 255);
  padding: 30px;
  margin: -20px -20px 20px -20px; 
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

h2 {
  text-align: left;
  color: #333;
  font-size: 2.4em;
}

p {
  font-size: 1.2em;
  color: #000000;
  text-align: center;
  margin-top: 10px;
  
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 20px;
}

ul li {
  margin: 8px 0;
  font-size: 1.3em;
  color: #333;
  text-align: center;
}

.highlight {
  font-weight: normal;
  color: #000000; 
  
}
.highlight-price {
  font-weight: bold;
  color: #000000; 
  font-size: 1.5em;
}

.container-packs button {
  width: 100%;
  padding: 12px;
  background-color: #0e1850;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  transition: background-color 0.5s ease;
}

button:hover {
  background-color: #104a80;
  
}
.banner-container {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}

.banner-container img {
  width: 100%;
  height: auto;
  display: block;
}
.container-adhesion {
  color: #ffffff;
  background-color: #1f2c79;
}
.container-adhesion p{
  color: #ffffff;
  padding: 20px;
  margin-top: -10px;
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
  background-color: #d664bd;
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
.guardia-popup p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-top: 0px;
}
.most-popular {
  background-color: #eecd14;
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  top: 25px;
  left: 88%;
  transform: translateX(-50%);
}
.economico {
  background-color: #d664bd;
  color: white;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  top: 25px;
  left: 84%;
  transform: translateX(-50%);
}
.advantages-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
}
  
.advantage-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 80px;
  padding-left: 60px;
  padding-right: 60px;
}
  
.advantage-card {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 280px;
  height: 220px;
}
  
.advantage-card h4 {
  color: #d11aa9;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.advantage-card i {
  color: #1f2c79;
  font-size: 3.4rem;
}

.advantage-card p {
  font-size: 1.2rem;
}

.sensa-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f4f4f4;
  padding: 20px;
}

.sensa-background {
  position: absolute;
  left: 0;
  width: 40%;
  height: 100%;
  background-image: url('../assets/css/img/celular-sensa.png');
  background-size: cover;
  background-position: center;
}
.sensa-content {
  width: 50%;
  padding: 20px;
  margin-left: 50%;
}

.sensa-content h2 {
  align-items: left;
  display: flex;
  color:#d11aa9;
  font-size: 2.2rem;
}

.container-sensa-dispositivos ul {
  list-style-type: none;
  padding: 0;
}

.container-sensa-dispositivos li {
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: left !important;
}
</style>
  