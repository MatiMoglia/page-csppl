<template>
    <div>
      <div class="banner-container">
        <img src="https://www.coopspportena.com.ar/sites/default/files/BANNER%20PACKS_BANNER%20PACKS.jpg" 
             alt="Banner Cooplus">
      </div>
      <h1>COOPLUS+</h1>
      
      <div class="container-cooplus">
        <p>
          La nueva forma de ver televisión, un producto diferente que desde la Cooperativa queremos ofrecerte para que puedas tener TV HD + Internet de 100, 200 y 300 Megas + Telefonía en tu casa. Esta experiencia viene a transformar tu forma de ver televisión, más de 100 canales en vivo y el mejor contenido On Demand, desde cualquier dispositivo, donde sea que estés. COOPLUS, + evolución para vos.
        </p>
        <p>
          (Todo el Equipamiento que instalamos en tu hogar se entrega en comodato. Esto significa que en caso de solicitar la baja del servicio deberás devolverlo a la Cooperativa.)
        </p>
      </div>
      <h1>¡Nuestros Packs!</h1>
      <div class="container-packs">
            <div 
                class="pack" 
                :id="'hogar-pack'"
                @mouseover="highlightPack(true, 'hogar-pack')" 
                @mouseleave="highlightPack(false, 'hogar-pack')" 
                @click="selectPack('Pack Hogar')">
                <h2>PACK HOGAR</h2>
                <p><strong><span class="highlight-price">$23.999</span></strong></p>
                <ul>
                <li><span class="highlight">Internet 100Mb Fibra Óptica</span></li>
                <li>TV HD</li>
                <li><span class="highlight">HBO</span></li>
                <li><span class="highlight">UNIVERSAL</span></li>
                <li>Series y películas</li>
                <li>App para dispositivos</li>
                <li>Instalación SIN CARGO</li>
                <li>Telefonía Fija</li>
                <li>Asistencia Técnica</li>
                <li>.</li>
                </ul>
                <button>PEDILO ACÁ</button>
            </div>

            <div 
                class="pack" 
                :id="'cooplus-pack'"
                @mouseover="highlightPack(true, 'cooplus-pack')" 
                @mouseleave="highlightPack(false, 'cooplus-pack')" 
                @click="selectPack('Pack CooPlus')">
                <h2>PACK COOPLUS</h2>
                <p><strong><span class="highlight-price">$34.999</span></strong></p>
                <ul>
                <li><span class="highlight">Internet 200Mb Fibra Óptica</span></li>
                <li>TV HD</li>
                <li><span class="highlight">HBO</span></li>
                <li><span class="highlight">UNIVERSAL</span></li>
                <li><span class="highlight">Fútbol</span> y <span class="highlight">Golf</span></li>
                <li>Series y películas</li>
                <li>App para dispositivos</li>
                <li>Instalación SIN CARGO</li>
                <li>Telefonía Fija</li>
                <li>Asistencia Técnica</li>
                </ul>
                <button>PEDILO ACÁ</button>
            </div>
        </div>
        <div class="container-adhesion">
          <h1>¡Adherite ahora mismo!</h1>
        <p>Completa el siguiente formulario para poder elegir el pack que desees y disfrutar del servicio.</p>
        </div>
      <div class="container-form" id="formulario">
        <formCooplus :pack="selectedPack"/>
      </div>
    </div>
</template>
  
<script>
import formCooplus from "@/components/FormCooplus";
  
  export default {
    components: {
      formCooplus
    },
    data() {
      return {
        selectedPack: 'Pack Hogar'
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
    }
  };
</script>
<style scoped>
  h1 {
    text-align: center;
    font-size: 2.8rem;
    color: #ca43ca;
    margin-top: 20px;
    
    
  }
  
  .container-cooplus, .container-packs {
    margin: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
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
    background: #053e74; 
    color: rgb(255, 255, 255);
    padding: 15px;
    margin: -20px -20px 20px -20px; 
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 2.2em;
}

p {
  font-size: 1.2em;
  color: #555;
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
  color: #d821c0; 
}
.highlight-price {
  font-weight: bold;
  color: #000000; 
  font-size: 1.5em;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #dd52e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.2em;
}

button:hover {
  background-color: #ca43ca;
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
</style>
  