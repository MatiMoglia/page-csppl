<template>
  <div class="form-container">
    <div class="form-section">
      <h2>Nuestro formulario de Adhesión</h2>
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
        <select v-model="formAdhesion.decos" :class="{'input-error': !formAdhesion.decos && formSubmittedAdhesion}" required>
          <option value="">Selecciona la cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="Más de 3">Más de 3</option>
        </select>

        <div v-if="formAdhesion.decos === 'Más de 3'">
          <label for="cuentaAdicional">Decos adicionales *</label>
          <input type="number" id="cuentaAdicional" v-model="formAdhesion.cuentas" :class="{'input-error': !formAdhesion.cuentas && formSubmittedAdhesion}" required />
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
        <input type="text" placeholder="Nombre" v-model="formConsulta.nombre" required>

        <input type="email" placeholder="Correo electrónico" v-model="formConsulta.email" required>

        <input type="tel" placeholder="Número de teléfono" v-model="formConsulta.telefono" required>

        <textarea placeholder="Deja tu mensaje aquí..." v-model="formConsulta.descripcion" required></textarea>

        <button class="btn-enviar" @click="enviarConsulta">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import AOS from "aos";
import "aos/dist/aos.css";
import apiClient from '../services/apiCooplus'; 
import apiReclamos from '@/services/apiReclamos';
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
        decos: '',
        cuentas: '',
        fechapedido: new Date().toISOString().split('T')[0]
      },
      formConsulta: {
        nombre: '',
        email: '',
        telefono: '',
        descripcion: '',
        fechaReclamo: '',
        servicio:'',
        estado: ''
      },
      formSubmittedAdhesion: false,
      mostrarFormularioConsulta: false
    };
  },
  methods: {
      async enviarConsulta() {
      this.formSubmittedConsulta = true;
      this.formConsulta.fechaReclamo = new Date().toISOString().split('T')[0];
      this.formConsulta.servicio = "COOPLUS";
      this.formConsulta.estado = "Pendiente";

        if (!this.formConsulta.nombre) {
          toast.error("Ingrese su nombre.");
          return;
        } else if (!this.isValidEmail(this.formConsulta.email)) {
          toast.error("Ingrese un correo electrónico válido.");
          return;
        } else if (!this.formConsulta.telefono) {
          toast.error("Ingrese su número de teléfono.");
          return;
        } else if (!this.formConsulta.descripcion) {
          toast.error("Ingrese su consulta.");
          return;
        }
          try {
            const response = await apiReclamos.enviarReclamo(this.formConsulta);
            console.log("Respuesta de la API:", response);

            if (response && response._id) {
            toast.success("Reclamo enviado con éxito");
            this.resetFormConsulta();
            } else {
            toast.error("Error al enviar el reclamo. Respuesta inesperada.");
            }
        } catch (error) {
            console.error("Error al enviar el reclamo:", error);
            toast.error("Error al conectar con el servidor.");
        }
      },
      enviarFormulario() {
      this.loading = true;
      this.formAdhesion.fechapedido = new Date().toISOString().split('T')[0];

      if (this.formAdhesion.nombre === "") {
        toast.error("Ingrese el nombre completo.");
      } else if (this.formAdhesion.direccion === "") {
        toast.error("Ingrese una direccion valida.");
      } else if (this.formAdhesion.dni === "") {
        toast.error("Ingrese un DNI valido.");
      } else if (this.formAdhesion.pack === "") {
        toast.error("Seleccione un pack.");
      } else if (!this.isValidEmail(this.formAdhesion.email)) {
        toast.error("El correo electrónico no es válido.");
      } else if (this.formAdhesion.telefono === "") {
        toast.error("Ingrese el número de teléfono.");
      } else {
        apiClient.enviarFormulario(this.formAdhesion)
          .then(response => {
            if (response.status === 201) {
              toast.success("Formulario enviado con éxito");
              this.resetFormAdhesion();
            } else {
              console.log("Error al enviar el formulario");
            }
          })
          .catch(error => {
            toast.error("Error al enviar el formulario: " + (error.response ? error.response.data : error.message));
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
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
        descripcion: ''
      };
    },
  },
  mounted() {
    AOS.init();
  }
};
</script>
  
<style scoped>
.form-container {
  display: grid;
  padding: 20px;
  margin-top: 30px;
  padding-left: 130px;
  padding-right: 130px;
}
  
.form-section {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(244, 244, 244, 0.9);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
  
h2 {
  text-align: left;
  color: #0e1850;
  font-size: 2rem;
  margin: 0;
}

h3 {
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
  transition: 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
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
  