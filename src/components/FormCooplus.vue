<template>
  <div class="form-container" data-aos="fade-up">
    <div class="form-section">
      <h2>Formulario de Adhesión</h2>
      <form @submit.prevent="enviarFormulario">
        
        <label for="nombreAdhesion">Nombre y Apellido *</label>
        <input type="text" id="nombreAdhesion" v-model="formAdhesion.nombre" :class="{'input-error': !formAdhesion.nombre && formSubmittedAdhesion}" required />
        
        <label for="direccion">Dirección *</label>
        <input type="text" id="direccion" v-model="formAdhesion.direccion" :class="{'input-error': !formAdhesion.direccion && formSubmittedAdhesion}" required />

        <label for="dni">DNI *</label>
        <input type="number" id="dni" v-model="formAdhesion.dni" :class="{'input-error': !formAdhesion.dni && formSubmittedAdhesion}" required />

        <label for="fechaNacimiento">Fecha de Nacimiento *</label>
        <input type="date" id="fechaNacimiento" v-model="formAdhesion.fechaNacimiento" :class="{'input-error': !formAdhesion.fechaNacimiento && formSubmittedAdhesion}" required />

        <label for="telefono">Teléfono *</label>
        <input type="tel" id="telefono" v-model="formAdhesion.telefono" :class="{'input-error': !formAdhesion.telefono && formSubmittedAdhesion}" required />

        <label for="email">Email *</label>
        <input type="email" id="email" v-model="formAdhesion.email" :class="{'input-error': !formAdhesion.email && formSubmittedAdhesion}" required />

        <label>Selecciona el Pack *</label>
        <select v-model="formAdhesion.pack" :class="{'input-error': !formAdhesion.pack && formSubmittedAdhesion}" required>
          <option value="">Selecciona un pack</option>
          <option value="Pack Hogar">Pack Hogar</option>
          <option value="Pack CooPlus">Pack CooPlus</option>
        </select>

        <label for="decodificadores">Cantidad de Decodificadores *</label>
        <select v-model="formAdhesion.decodificadores" :class="{'input-error': !formAdhesion.decodificadores && formSubmittedAdhesion}" required>
          <option value="">Selecciona la cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="Más de 3">Más de 3</option>
        </select>

        <div v-if="formAdhesion.decodificadores === 'Más de 3'">
          <label for="cuentaAdicional">Decos adicionales *</label>
          <input type="number" id="cuentaAdicional" v-model="formAdhesion.cuentaAdicional" :class="{'input-error': !formAdhesion.cuentaAdicional && formSubmittedAdhesion}" required />
        </div>

        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  </div>

  <div class="video-consulta-container">
    <div class="video-section" data-aos="fade-right" data-aos-delay="200">
      <h3>Conoce más sobre nuestro servicio</h3>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/cQCvt9xZoSY" frameborder="0" allowfullscreen></iframe>
    </div>

    <div class="dropdown" data-aos="flip-left" data-aos-delay="500" @mouseenter="mostrarFormularioConsulta = true" @mouseleave="mostrarFormularioConsulta = false">
      <button class="dropdown-btn">
        ¿Tienes alguna consulta?
        <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarFormularioConsulta}"></i>
      </button>

      <div class="dropdown-content" v-show="mostrarFormularioConsulta">
        <input type="text" placeholder="Nombre" v-model="formConsulta.nombre" :class="{'input-error': !formConsulta.nombre && formSubmittedConsulta}">

        <input type="email" placeholder="Correo electrónico" v-model="formConsulta.email" :class="{'input-error': !formConsulta.email && formSubmittedConsulta}">

        <input type="tel" placeholder="Número de teléfono" v-model="formConsulta.telefono" :class="{'input-error': !formConsulta.telefono && formSubmittedConsulta}">

        <textarea placeholder="Deja tu mensaje aquí..." v-model="formConsulta.consulta" :class="{'input-error': !formConsulta.consulta && formSubmittedConsulta}"></textarea>

        <button @click="enviarConsulta" class="btn-enviar">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      formAdhesion: {
        nombre: '',
        direccion: '',
        dni: '',
        fechaNacimiento: '',
        telefono: '',
        email: '',
        pack: '',
        decodificadores: '',
        cuentaAdicional: ''
      },
      formConsulta: {
        nombre: '',
        email: '',
        telefono: '',
        consulta: ''
      },
      formSubmittedAdhesion: false,
      formSubmittedConsulta: false,
      mostrarFormularioConsulta: false
    };
  },
  methods: {
    enviarFormulario() {
      this.formSubmittedAdhesion = true;
      const requiredFields = ['nombre', 'direccion', 'dni', 'fechaNacimiento', 'telefono', 'email', 'pack', 'decodificadores'];
      if (this.formAdhesion.decodificadores === 'Más de 3') {
        requiredFields.push('cuentaAdicional');
      }

      const isFormValid = requiredFields.every(field => this.formAdhesion[field]);

      if (!isFormValid) {
        toast.error('Por favor, complete todos los campos obligatorios.');
        return;
      }
      toast.success('Formulario de adhesión enviado correctamente.');
      this.resetFormAdhesion();
    },
    enviarConsulta() {
      this.formSubmittedConsulta = true;

      if (!this.formConsulta.nombre || !this.formConsulta.email || !this.formConsulta.telefono || !this.formConsulta.consulta) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }
      toast.success('Consulta enviada correctamente.');
      this.resetFormConsulta();
    },
    resetFormAdhesion() {
      this.formAdhesion = {
        nombre: '',
        direccion: '',
        dni: '',
        fechaNacimiento: '',
        telefono: '',
        email: '',
        pack: this.pack,
        decodificadores: '',
        cuentaAdicional: ''
      };
      this.formSubmittedAdhesion = false;
    },
    resetFormConsulta() {
      this.formConsulta = {
        nombre: '',
        email: '',
        telefono: '',
        consulta: ''
      };
      this.formSubmittedConsulta = false; 
    }
  },
  mounted() {
    AOS.init();
  }
};
</script>
  
<style scoped>
  .form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
    margin-top: 30px;
    padding-left: 120px;
    padding-right: 120px;
  }
  
  .form-section {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    border: 1px solid #c92986;
  }
  
  h2, h3 {
    text-align: left;
    color: #0e1850;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    font-family: "Montserrat", sans-serif;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #0e1850;
  }
  
  .input-error {
    border-color: red;
  }
  
  button {
    width: 100%;
    padding: 20px;
    background-color: #0e1850;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: "Montserrat", sans-serif;
  }
  
  button:hover {
    background-color: #053e74;
  }
  
  .video-consulta-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding-left: 120px;
    padding-right: 120px;
    padding-top: 10px;
    padding-bottom: 20px;
}
.video-consulta-container h3 {
  font-size: 1.1em;
  margin-bottom: 25px;
}

.consulta-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 8px;
}

.consulta-section textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

.btn-enviar {
    background-color: #0e1850;
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}

.btn-enviar:hover {
    background-color: #053e74;
}

.video-section {
    flex: 1;
    padding: 20px;
    border-radius: 8px;
    background-color: #ddd;
    
}
  
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.dropdown-arrow {
  font-size: 20px;
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.rotate-arrow {
  transform: rotate(180deg);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: 100%;
  z-index: 10;
  padding: 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown:hover .dropdown-content {
  display: block;
}
@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr; 
  }
}

</style>
  