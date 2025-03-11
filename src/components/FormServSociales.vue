<template>
  <div class="form-container">
    <h2 class="subtitle">Gestión del Grupo Familiar</h2>
    <form>
      <h3>Datos del titular del servicio:</h3>
      <p>Primero ingrese alguno de estos datos para determinar el titular del servicio.</p>
      <div>
        <label for="nombre">Nombre y Apellido</label>
        <input type="text" id="nombre" v-model="nuevoFamiliar.titular" @input="seleccionarCampo('titular')" />

        <label for="dni">DNI</label>
        <input type="number" id="dni" v-model="nuevoFamiliar.dniTitular" @input="seleccionarCampo('dniTitular')" />

        <label for="nroTitular">Número de Titular</label>
        <input type="number" id="nroTitular" v-model="nuevoFamiliar.nroTitular" @input="seleccionarCampo('nroTitular')" />
        <div class="titular">
          <button class="btn-consulta"
                  :class="{'active': tipoConsulta === 'consulta'}"
                  @click="consultarTitular">
            Consultar titular existente
          </button>
          <button class="btn-nuevo"
              :class="{ 'active': tipoConsulta === 'nuevo' }"
              :disabled="!habilitarNuevo"
              @click="agregarTitular">
        Nuevo Titular
          </button>
        </div>
        <div v-if="titularEncontrado">
            <h3>Titular Encontrado:</h3>
            <p><strong>Nombre:</strong> {{ titularEncontrado.titular }}</p>
            <p><strong>DNI:</strong> {{ titularEncontrado.dniTitular }}</p>
            <p><strong>Número de Titular:</strong> {{ titularEncontrado.nroTitular }}</p>
          </div>
      </div>
    </form>
    <form @submit.prevent="agregarFamiliar">
      <br><br><br>
      <h3>Agregar personas del grupo familiar:</h3>

      <label for="nombre">Nombre y Apellido *</label>
      <input type="text" id="nombre" v-model="nuevoFamiliar.nombre" />

      <label for="dni">DNI *</label>
      <input type="number" id="dni" v-model="nuevoFamiliar.dni"/>

      <label for="fechaNacimiento">Fecha de Nacimiento *</label>
      <input type="date" id="fechaNacimiento" v-model="nuevoFamiliar.fechaNacimiento" />
      
      <label for="grupoSanguineo">Grupo Sanguíneo *</label>
      <select id="grupoSanguineo" v-model="nuevoFamiliar.grupoSanguineo">
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

      <button class="btn-enviar" type="submit">Agregar Familiar</button>
    </form>

    <h3>Miembros del Grupo Familiar</h3>
    <ul>
        <li v-for="(familiar, index) in familiares" :key="index">
            {{ familiar.nombre }} - {{ familiar.dni }} - {{ familiar.fechaNacimiento }} - {{ familiar.grupoSanguineo }}
            <br>SS: {{familiar.servicios }}
            <br>Titular: {{ familiar.titular }}
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
        mostrarFamiliares: false,
        nroTitular: '',
      },
      familiares: [],
      gruposSanguineos: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      titulares: [
        { titular: "Juan Pérez", dniTitular: 12345678, nroTitular: 1001 },
        { titular: "Mati Moglia", dniTitular: 45700951, nroTitular: 1002 }
      ],
      titularEncontrado: null,
      mensaje: "",
      tipoConsulta: "",
      campoSeleccionado: null,
      habilitarNuevo: false
    };
  },
  methods: {
    agregarFamiliar() {
      if (!this.nuevoFamiliar.nombre || !this.nuevoFamiliar.dni || !this.nuevoFamiliar.fechaNacimiento || !this.nuevoFamiliar.grupoSanguineo) {
        toast.error("Debe completar todos los campos obligatorios para agregar un familiar.");
        return;
      }
      this.familiares.push({ ...this.nuevoFamiliar });
      this.nuevoFamiliar = { nombre: '', fechaNacimiento: '', grupoSanguineo: '', dni: '', titular: '', dniTitular: '', servicios: [] };
    },
    eliminarFamiliar(index) {
      this.familiares.splice(index, 1);
    },
    enviarGrupoFamiliar() {
      toast.success(`Grupo enviado con ${this.familiares.length} familiares`);
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
      if (this.nuevoFamiliar.servicios.length === 3) {
        this.nuevoFamiliar.servicios = [];
      } else {
        this.nuevoFamiliar.servicios = ['Traslado', 'Sepelio', 'Banco de Sangre'];
      }
    },
    seleccionarCampo(campo) {
      this.campoSeleccionado = campo;
    },
    consultarTitular() {
      if (this.tipoConsulta === 'consulta') {
      this.tipoConsulta = ''; 
    } else {
      this.tipoConsulta = 'consulta';
    }

      if (!this.campoSeleccionado) {
        this.mensaje = "Debe ingresar al menos un dato para la consulta del titular.";
        toast.error(this.mensaje);
        return;
      }

      this.titularEncontrado = this.titulares.find(t =>
        this.campoSeleccionado === "titular" ? t.titular.toLowerCase() === this.nuevoFamiliar.titular.toLowerCase() :
        this.campoSeleccionado === "dniTitular" ? t.dniTitular === Number(this.nuevoFamiliar.dniTitular) :
        this.campoSeleccionado === "nroTitular" ? t.nroTitular === Number(this.nuevoFamiliar.nroTitular) :
        false
      );

      if (this.titularEncontrado) {
        this.mensaje = "";
        this.habilitarNuevo = false;
      } else {
        this.mensaje = "Titular no encontrado. ¿Desea agregarlo?";
        toast.info(this.mensaje);
        this.habilitarNuevo = true;
        this.titularEncontrado = null;
      }
    },
    agregarTitular() {
      if (!this.nuevoFamiliar.titular || !this.nuevoFamiliar.dniTitular || !this.nuevoFamiliar.nroTitular) {
        this.mensaje = "Debe completar todos los campos antes de agregar un nuevo titular.";
        toast.error(this.mensaje);
        return;
      }

      this.titulares.push({ ...this.nuevoFamiliar });

      this.mensaje = "Titular agregado con éxito.";
      this.habilitarNuevo = false;
      this.tipoConsulta = '';
      this.nuevoFamiliar = { titular: '', dniTitular: '', nroTitular: '', nombre: '', dni: '', fechaNacimiento: '', grupoSanguineo: '', servicios: [] };
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
