<template>
    <div class="form-container">
      <div class="form-section">
        <h2>Formulario ALTA/BAJA de {{ servicio }}</h2>
        <form @submit.prevent="enviarFormulario">
          
          <label for="nombre">Nombre y Apellido *</label>
          <input type="text" id="nombre" v-model="formSolicitud.nombre" :class="{'input-error': !formSolicitud.nombre && formSubmitted}" required />
  
          <label for="telefono">Teléfono *</label>
          <input type="tel" id="telefono" v-model="formSolicitud.telefono" :class="{'input-error': !formSolicitud.telefono && formSubmitted}" required />
  
          <label for="dni">DNI *</label>
          <input type="number" id="dni" v-model="formSolicitud.dni" :class="{'input-error': !formSolicitud.dni && formSubmitted}" required />
          
          <label for="domicilio">Domicilio *</label>
          <input type="text" id="domicilio" v-model="formSolicitud.domicilio" :class="{'input-error': !formSolicitud.domicilio && formSubmitted}" required />
          <div v-if="mostrarOpcionesInternet == 'si'">
            <label for="tipoInternet">Tipo de Internet *</label>
            <select id="tipoInternet" v-model="formSolicitud.tipoInternet">
              <option value="">Seleccione una opción</option>
              <option value="fibra">Fibra Óptica</option>
              <option value="cobre">Internet de Cobre</option>
              <option value="rural">Internet Rural</option>
            </select>

            <label for="megasInternet">Velocidad (Mbps) *</label>
            <select id="megasInternet" v-model="formSolicitud.megasInternet" :disabled="!formSolicitud.tipoInternet">
              <option v-for="mega in opcionesMegas" :key="mega" :value="mega">{{ mega }} Mbps</option>
            </select>
          </div>

          <label>Acción *</label>
          <div class="acciones">
            <button class="btn-alta" type="button" :class="{'active-alta': formSolicitud.accion === 'Alta'}" 
              @click="toggleAccion('Alta')">Dar de Alta
            </button>
            <button class="btn-baja" type="button" :class="{'active-baja': formSolicitud.accion === 'Baja'}" 
              @click="toggleAccion('Baja')">
              Dar de Baja
            </button>
          </div>
          <label for="email">Correo electrónico *</label>
          <input type="text" id="em il" v-model="formSolicitud.email" :class="{'input-error': !formSolicitud.email && formSubmitted}" required />

          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="formSolicitud.descripcion" :class="{'input-error': !formSolicitud.descripcion && formSubmitted}" placeholder="Ingrese una descripción del inmueble"></textarea>
          <div v-if="adjuntar === 'si'">
            <label for="documentos">Adjuntar Documentos</label>
            <input type="file" id="documentos" @change="handleFileUpload" multiple />
          </div>
          <div v-if="formSolicitud.files.length > 0">
            <p>Archivos adjuntos:</p>
            <ul>
              <li v-for="(file, index) in formSolicitud.files" :key="index">{{ file.name }}</li>
            </ul>
          </div>
          <div class="archivo-info" v-if="sugerencia === 'si'">
            <p><strong>Sugerencia:</strong> Adjuntar permiso municipal y certificación si es necesario. Consultar en administración al <strong style="color: green;">3564331499</strong>.</p>
          </div>
  
          <button type="submit">Enviar Solicitud</button>
        </form>
      </div>
    </div>
  </template>
  
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiClient from '../services/apiForms'; 
export default {
  props: {
      servicio: {
      type: String,
      required: true
      },
      sugerencia: {
      type: String,
      required: true
      },
      mostrarOpcionesInternet: {
        type: String,
        default: false
      },
      adjuntar: {
        type: String,
        default: false
      }
    },
    data() {
      return {
        formSolicitud: {
          nombre: '',
          telefono: '',
          dni: '',
          accion: '',
          domicilio: '',
          descripcion: '',
          files: [],
          tipoInternet: '',
          megasInternet: '' ,
          email: '',
          servicio: this.servicio, 
          fechapedido: new Date().toISOString().split('T')[0]
        },
        formSubmitted: false
      };
    },
    computed: {	
      opcionesMegas() {
        if (this.formSolicitud.tipoInternet === 'fibra') {
          return [100, 200, 300];
        } else if (this.formSolicitud.tipoInternet === 'cobre') {
          return [4];
        } else if (this.formSolicitud.tipoInternet === 'rural') {
          return [5];
        }
        return [];
      }
    },
    methods: {
      enviarFormulario() {
        this.loading = true;
        this.formSolicitud.fechapedido = new Date().toISOString().split('T')[0];
        
        if (this.formSolicitud.nombre === "") {
          toast.error("Ingrese el nombre completo.");
        } else if (this.formSolicitud.email === "") {
          toast.error("Ingrese el correo electrónico.");
        } else if (!this.isValidEmail(this.formSolicitud.email)) {
          toast.error("El correo electrónico no es válido.");
        } else if (this.formSolicitud.telefono === "") {
          toast.error("Ingrese el número de teléfono.");
        } else if (this.adjuntar === 'si' && this.formSolicitud.files.length === 0) {
          toast.error("Por favor, adjunte los documentos necesarios.");
        } else {
          apiClient.enviarFormulario(this.formSolicitud)
            .then(response => {
              if (response.status === 201) {
                toast.success("Formulario enviado con éxito");
                this.resetFormulario();
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
    resetFormulario() {
    this.formSolicitud = {
        nombre: "",
        email: "",
        telefono: "",
        files: [],
      };
      this.adjuntar = 'no';
      this.sugerencia = 'no';
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.formSolicitud.files = Array.from(files); 
    },
    resetForm() {
      this.formSolicitud = {
        nombre: '',
        telefono: '',
        dni: '',
        accion: '',
        domicilio: '',
        descripcion: '',
        files: []
      };
      this.formSubmitted = false;
      },
    toggleAccion(accion) {
      this.formSolicitud.accion = this.formSolicitud.accion === accion ? '' : accion;
    }
  }
};
</script>

<style scoped>
.form-container {
    display: grid;
    padding: 20px;
    margin-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
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

.acciones {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.acciones button {
    flex: 1;
    padding: 15px;
    font-size: 1em;
    background-color: #053e74;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.acciones .active-alta {
    background-color: #19ac67;
    color: white;
}

.acciones .active-baja {
    background-color: #ff503b;
    color: white;
}

.archivo-info {
    margin: 10px;
    font-size: 0.9em;
    color: #555;
}

@media (max-width: 768px) {
    .form-container {
      grid-template-columns: 1fr;
    }
}
</style>
