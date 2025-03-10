<template>
  <div class="form-container">
    <h2 class="subtitle">Gestión del Grupo Familiar</h2>
    <form @submit.prevent="agregarFamiliar">
      <h3>Datos del titular del servicio:</h3>
      <p>Primero ingrese estos datos para determinar el titular del servicio.</p>
      <div>
        <label for="nombre">Nombre y Apellido *</label>
        <input type="text" id="nombre" v-model="nuevoFamiliar.titular" />

        <label for="dni">DNI *</label>
        <input type="number" id="dni" v-model="nuevoFamiliar.dniTitular" />

        <div class="titular">
          <button class="btn-consulta" 
                  :class="{'active': tipoConsulta === 'consulta'}"
                  @click="tipoConsulta = 'consulta'">
            Consultar titular
          </button>
          <button class="btn-nuevo" 
                  :class="{'active': tipoConsulta === 'nuevo'}"
                  @click="tipoConsulta = 'nuevo'">
            Nuevo Titular
          </button>
        </div>
        <div v-if="tipoConsulta === 'consulta'" class="info-cuenta">
          <h4>Información del Titular</h4>
          <p><strong>Nombre:</strong> {{ informacionCuenta.nombre }}</p>
          <p><strong>DNI:</strong> {{ informacionCuenta.dni }}</p>
          <p><strong>Dirección:</strong> {{ informacionCuenta.direccion }}</p>
          <p><strong>Estado:</strong> {{ informacionCuenta.estado }}</p>
        </div>
      </div>
      <br>
      <h3>Agregar/Eliminar personas del grupo familiar:</h3>

      <label for="nombre">Nombre y Apellido *</label>
      <input type="text" id="nombre" v-model="nuevoFamiliar.nombre" required />

      <label for="dni">DNI *</label>
      <input type="number" id="dni" v-model="nuevoFamiliar.dni" required />

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
          <button class="btn-servicio" type="button" :class="{'active': nuevoFamiliar.servicios.includes('Banco')}" 
              @click="toggleServicio('Banco')">Banco de Sangre
          </button>
          <div class="btn-cobertura">
              <button class="btn-servicio cobertura-total" type="button" @click="seleccionarCoberturaTotal">
                  Cobertura Total
                  <span class="most-popular">El más pedido</span>
              </button>
          </div>
      </div>

      <button type="submit">Agregar Familiar</button>
    </form>

    <h3>Miembros del Grupo Familiar</h3>
    <ul>
        <li v-for="(familiar, index) in familiares" :key="index">
            {{ familiar.nombre }} - {{ familiar.fechaNacimiento }} - {{ familiar.grupoSanguineo }}
            <button @click="eliminarFamiliar(index)" class="btn-delete">Eliminar</button>
        </li>
    </ul>

    <button @click="enviarGrupoFamiliar" v-if="familiares.length > 0">Enviar Grupo Familiar</button>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
      },
      familiares: [],
      gruposSanguineos: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      tipoConsulta: 'nuevo', 
      informacionCuenta: { 
        nombre: 'Juan Pérez',
        dni: '12345678',
        direccion: 'Av. Siempre Viva 123',
        estado: 'Activo',
      },
    };
  },
  methods: {
    agregarFamiliar() {
      if (this.nuevoFamiliar.nombre && this.nuevoFamiliar.fechaNacimiento && this.nuevoFamiliar.grupoSanguineo) {
        this.familiares.push({ ...this.nuevoFamiliar });
        this.nuevoFamiliar = { nombre: '', fechaNacimiento: '', grupoSanguineo: '', dni: '', titular: '', dniTitular: '', servicios: [] };
      }
    },
    eliminarFamiliar(index) {
      this.familiares.splice(index, 1);
    },
    enviarGrupoFamiliar() {
      toast.success('Grupo enviado:', this.familiares);
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
      this.nuevoFamiliar.servicios = ['Traslado', 'Sepelio', 'Banco'];
    }
  }
};
</script>

<style scoped>
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
  gap: 10px;
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
  background-color: #053e74;
}

.btn-cobertura {
  position: relative;
  text-align: center;
  margin-top: 20px;
}

.cobertura-total {
  background-color: #053e74;
  color: white;
  font-weight: bold;
}

.most-popular {
  background-color: #ff9800;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  top: -10px;
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
  border-radius: 50%;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.titular {
  display: flex;
  gap: 10px;
}

.titular button {
  flex: 1;
  padding: 15px;
  font-size: 1em;
  background-color: #053e74;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.titular .btn-consulta {
  background-color: #0e1850;
  color: white;
}

.titular .btn-nuevo {
  background-color: #0e1850;
  color: white;
}

.titular .active {
  background-color: #135da1;
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
</style>
