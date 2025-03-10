<template>
  <div class="form-container">
      <h2>Gestión de Grupo Familiar</h2>
      <form @submit.prevent="agregarFamiliar">
          <h3>Datos del titular del servicio:</h3>
          <p>Primero ingrese estos datos para determinar el titular del servicio</p>
          
          <label for="nombre">Nombre y Apellido del Titular *</label>
          <input type="text" id="nombre" v-model="nuevoFamiliar.titular" required />

          <label for="dni">DNI *</label>
          <input type="number" id="dni" v-model="nuevoFamiliar.dniTitular" required />

          <h3>Agregar/Eliminar personas del grupo familiar: </h3>

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
          gruposSanguineos: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
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
          console.log('Grupo enviado:', this.familiares);
          toast.success('Grupo familiar enviado con éxito!');
          this.familiares = [];
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
  display: grid;
  padding: 20px;
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete {
  background: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.btn-servicios {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-servicio {
  flex: 1;
  padding: 15px;
  font-size: 1em;
  background-color: #0e1850;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
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
</style>
