<template>
  <div v-if="loading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
  <div class="form-container">
    <h2 class="subtitle">Gestión del Grupo Familiar</h2>
    <form>
      <h3>Datos del titular del servicio:</h3>
      <p>Primero ingrese este dato para determinar el titular del servicio.</p>
      <div>
        <label for="nroTitular">Número de Titular</label>
        <input type="text" id="nroTitular" v-model="nuevoFamiliar.nroTitular" @input="seleccionarCampo('nroTitular')" />
        <div class="titular">
          <button class="btn-consulta"
                  :class="{'active': tipoConsulta === 'consulta'}"
                  @click="consultarTitular">
            Consultar titular existente
          </button>
          <button class="btn-nuevo"
            :class="{ 'active': tipoConsulta === 'nuevo' }"
            :disabled="!habilitarNuevo"
            @click="abrirModal">
            Nuevo Titular
          </button>
        </div>
      </div>
    </form>
    <form @submit.prevent="agregarFamiliar">
      <br><br><br>
      <h3>Agregar personas del grupo familiar:</h3>

      <label for="nroTitular">Número del Titular: *</label>
      <input type="text" id="nroTitular" v-model="nuevoFamiliar.nroTitular" :disabled="titularEncontrado" 
        :class="['input-bloqueado', { 'input-encontrado': titularEncontrado }]" readonly>

      <label for="dniTitular">DNI del Titular: *</label>
      <input type="text" id="dniTitular" name="dniTitular" v-model="nuevoFamiliar.dniTitular" :disabled="titularEncontrado" 
        :class="['input-bloqueado', { 'input-encontrado': titularEncontrado }]" readonly />

      <label for="nombreTitular">Nombre del Titular: *</label>
      <input type="text" id="nombreTitular" name="nombreTitular" v-model="nuevoFamiliar.titular" :disabled="titularEncontrado" 
        :class="['input-bloqueado', { 'input-encontrado': titularEncontrado }]" readonly />

      <label for="nombre">Nombre y Apellido *</label>
      <input type="text" id="nombre" v-model="nuevoFamiliar.nombre" required />

      <label for="dni">DNI *</label>
      <input type="text" id="dni" v-model="nuevoFamiliar.dni" required />

      <label for="fechaNacimiento">Fecha de Nacimiento *</label>
      <input type="date" id="fechaNacimiento" v-model="nuevoFamiliar.fechaNacimiento" required />
      
      <label for="grupoSanguineo">Grupo Sanguíneo *</label>
      <select id="grupoSanguineo" v-model="nuevoFamiliar.grupoSanguineo" required>
          <option value="">Seleccione</option>
          <option v-for="grupo in gruposSanguineos" :key="grupo" :value="grupo">{{ grupo }}</option>
      </select>
      
      <p>Selecciona el servicio social: </p>
      <div class="btn-servicios">
          <button class="btn-servicio" type="button" :class="{'active': nuevoFamiliar.servicios.includes('Traslado')}" 
              @click="toggleServicio('Traslado')">Traslado Social
          </button>
          <button class="btn-servicio" type="button" :class="{'active': nuevoFamiliar.servicios.includes('Sepelio')}" 
              @click="toggleServicio('Sepelio')">Sepelio
          </button>
          <button class="btn-servicio" type="button" :class="{'active': nuevoFamiliar.servicios.includes('Banco de Sangre')}" 
              @click="toggleServicio('Banco de Sangre')">Banco de Sangre
          </button>
      </div>
      <div class="btn-cobertura">
              <button class="btn-servicio cobertura-total" type="button" @click="seleccionarCoberturaTotal">
                  Cobertura Total
                  <span class="most-popular">El más pedido</span>
              </button>
          </div>

          <button class="btn-enviar" type="submit" :disabled="botonDeshabilitado">Agregar Familiar</button>
    </form>
  </div>
  <div v-if="mostrarModal" class="modal">
  <div class="modal-content">
    <h3 style="text-align: center;">Nuevo Titular</h3>

    <label for="numeroTitular">Número Titular: *</label>
    <input type="number" id="numeroTitular" v-model="nuevoTitular.numero" style="text-align: center;" class="input-bloqueado" readonly />

    <label for="nombreTitular">Nombre Completo: *</label>
    <input type="text" id="nombreTitular" v-model="nuevoTitular.nombre" required />

    <label for="dniTitular">DNI: *</label>
    <input type="text" id="dniTitular" v-model="nuevoTitular.dni" required />

    <div class="modal-buttons">
      <button @click="guardarTitular" class="btn-guardar"><i class="ri-save-3-line"></i></button>
      <button @click="cerrarModal" class="btn-cerrar"><i class="ri-close-line"></i></button>
    </div>
  </div>
</div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiSS from '@/services/apiSS';

export default {
  data() {
    return {
      nuevoFamiliar: {
        titular: '',
        dniTitular: '',
        nombre: '',
        fechaNacimiento: '',
        grupoSanguineo: '',
        dni: '',
        servicios: [],
        nroTitular: '',
      },
      familiares: [],
      gruposSanguineos: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      titularEncontrado: false,
      mensaje: "",
      tipoConsulta: "",
      campoSeleccionado: null,
      habilitarNuevo: false,
      botonDeshabilitado: false,
      mostrarModal: false,
      nuevoTitular: {
        nombre: '',
        dni: '',
        numero: '',
      },
      loading: false,
    };
  },
  methods: {
    async consultarTitular() {
      this.loading = true;
      if (!this.nuevoFamiliar.nroTitular) {
        this.mensaje = "Debe ingresar un número de titular para la consulta.";
        toast.error(this.mensaje);
        return;
      }

      try {
        const resultado = await apiSS.obtenerAdherentes(this.nuevoFamiliar.nroTitular);

        console.log("Resultado API:", resultado);

        if (resultado.success && resultado.data.length > 0) {
          this.nuevoFamiliar.nroTitular = `${this.nuevoFamiliar.nroTitular}`;
          this.titularEncontrado = true;  
          this.mensaje = "";
          this.loading = false;
          await this.obtenerDatosTitular(this.nuevoFamiliar.nroTitular);
          this.habilitarNuevo = false;
        } else {
          this.mensaje = "Titular no encontrado. ¿Desea agregarlo?";
          this.nuevoFamiliar.dniTitular = '';
          this.nuevoFamiliar.titular = '';
          toast.warning(this.mensaje);
          this.titularEncontrado = false;
          this.habilitarNuevo = true;
          this.loading = false;
        }
      } catch (error) {
        console.error("Error al obtener los adherentes", error);
        this.mensaje = "Error al consultar el titular.";
        toast.error(this.mensaje);
        this.loading = false;
      }
    },
    toggleServicio(servicio) {
      const index = this.nuevoFamiliar.servicios.indexOf(servicio);
      if (index === -1) {
        this.nuevoFamiliar.servicios.push(servicio);
      } else {
        this.nuevoFamiliar.servicios.splice(index, 1);
      }
    },
    seleccionarCoberturaTotal() {
      this.nuevoFamiliar.servicios = ['Traslado', 'Sepelio', 'Banco de Sangre'];
    },
    seleccionarCampo(campo) {
      this.campoSeleccionado = campo;
    },
    async agregarFamiliar() {
      if (!this.nuevoFamiliar.nroTitular || 
          !this.nuevoFamiliar.nombre || 
          !this.nuevoFamiliar.dni || 
          !this.nuevoFamiliar.fechaNacimiento || 
          !this.nuevoFamiliar.grupoSanguineo) {
        toast.error('Todos los campos son obligatorios');
        return; 
      }
      if (this.nuevoFamiliar.servicios.length === 0) {
        toast.error('Debe seleccionar al menos un servicio social');
        return;
      }
      this.loading = true;
      this.botonDeshabilitado = true;

      try {
        const response = await apiSS.agregarFamiliar(this.nuevoFamiliar);
        if (response.success) {
          this.loading = false;
          toast.success('Familiar agregado exitosamente');
          this.nuevoFamiliar = {
            nroTitular: '',
            dniTitular: '',
            titular: '',
            nombre: '',
            dni: '',
            fechaNacimiento: '',
            grupoSanguineo: '',
            servicios: [],
          };
        } else {
          toast.error('Error al agregar familiar');
          this.loading = false;
        }
      } catch (error) {
        toast.error('Hubo un problema al agregar el familiar');
        this.loading = false;
      } finally {
        this.botonDeshabilitado = false; 
        this.loading = false;
      }
    },
    async obtenerDatosTitular(nroTitular) {
      try {
        const response = await apiSS.obtenerDatosTitular(nroTitular);

        if (response.success) {
          this.nuevoFamiliar.dniTitular = response.data.dniTitular;
          this.nuevoFamiliar.titular = response.data.titular;
        } else {
          toast.warning("No se encontraron datos del titular.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del titular", error);
        toast.error("Hubo un problema al obtener los datos del titular.");
      }
    },
    abrirModal() {
    this.mostrarModal = true;
    },

    cerrarModal() {
      this.mostrarModal = false;
    },

    async guardarTitular() {
      this.loading = true;
      if (!this.nuevoTitular.nombre || !this.nuevoTitular.dni) {
        toast.error("Debe completar todos los campos del nuevo titular.");
        return;
      }

      try {
        const response = await apiSS.guardarNuevoTitular(this.nuevoTitular);

        if (response.success) {
          toast.success("Nuevo titular guardado exitosamente.");
          this.nuevoFamiliar.nroTitular = this.nuevoTitular.numero;
          this.nuevoFamiliar.dniTitular = this.nuevoTitular.dni;
          this.nuevoFamiliar.titular = this.nuevoTitular.nombre;
          this.cerrarModal(); 
          this.loading = false;
        } else {
          toast.error("Error al guardar el nuevo titular.");
        }
      } catch (error) {
        console.error("Error al guardar el nuevo titular", error);
        toast.error("Hubo un problema al guardar el titular.");
        this.loading = false;
      }
    },
  },
  computed: {
    numeroTitular() {
      return Math.floor(1000 + Math.random() * 9000);
    }
  },
  created() {
    this.nuevoTitular.numero = this.numeroTitular;
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.377);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
}

.btn-guardar {
  padding: 10px;
  background-color: #11365e;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  border: none;
  cursor: pointer;
}
.btn-guardar:hover {
  background-color: #2e47d4;
}
.btn-cerrar {
  padding: 10px;
  background-color: #e23434;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  border: none;
  cursor: pointer;
}
.btn-cerrar:hover {
  background-color: #f83636;
}
.input-bloqueado {
  background-color: #e8ecf1; 
  color: #363636; 
  font-family: "Montserrat", sans-serif;
  cursor: not-allowed; 
  border: 1px solid #aaa; 
  transition: border 0.3s ease-in-out;
}
.input-encontrado {
  border: 2px solid #28a745 !important; 
}
.form-container {
  margin: 10px;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.subtitle {
  font-size: 1.8rem;
  color: #ffffff;
  padding-top: 15px;
  margin: -15px -30px 20px -30px; 
  background: #0e1850;
  padding: 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
}
h3 {
  color: #1f2c79;
  margin-bottom: 5px;
  text-align: left;
  font-size: 1.5rem;
}

p {
  font-size: 16px;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Montserrat", sans-serif;
}

button:hover {
  background-color: #0056b3;
}

.btn-servicios {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.btn-servicio {
  flex: 1;
  padding: 15px;
  background-color: #0e1850;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  font-weight: bold;
}

.btn-servicio.active {
  background-color: #196dbd;
}

.btn-cobertura {
  position: relative;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.cobertura-total {
  background-color: #0e1850;
  color: white;
  font-weight: bold;
  width: 50%;
}

.most-popular {
  background-color: #ff9800;
  color: white;
  padding: 5px 5px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  top: -17px;
  left: 50%;
  transform: translateX(-50%);
}

ul {
  padding: 0;
  list-style: none;
  margin-top: 20px;
}

li {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background: #f4f4f4;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: red;
  width: 10%;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}
li button:hover {
  background-color: rgb(177, 18, 18);
}

.titular {
  display: flex;
  gap: 10px;
}
.btn-nuevo, .btn-consulta {
  background-color: #0e1850; 
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: bold;
}
.btn-nuevo:hover, .btn-consulta:hover {
  background-color: #0056b3; 
}
.info-cuenta {
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.info-cuenta h4 {
  margin-top: 0;
  color: #0e1850;
}

.info-cuenta p {
  font-size: 16px;
  margin-bottom: 8px;
}
.btn-enviar {
  background-color: #209443; 
  color: white;
  border: none;
  padding: 15px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.btn-enviar:hover {
  background-color: #4ccc19;
}
.mensaje {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
.btn-consulta.active, .btn-nuevo.active {
  background-color: #0056b3;
  color: white;
}
.btn-nuevo:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
