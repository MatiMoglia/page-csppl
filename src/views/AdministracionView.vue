<template>
  <h1 class="title">Manejo de ADMIN</h1>
  <div class="button-container">
    <button @click="toggleForm('mostrarFormulario')" class="btn-formulario">
      {{ mostrarFormulario ? 'Ocultar' : 'Mostrar' }} Formularios de ALTA/BAJA
    </button>
    <button @click="toggleForm('mostrarCooplus')" class="btn-cooplus">
      {{ mostrarCooplus ? 'Ocultar' : 'Mostrar' }} Formularios de Cooplus
    </button>
    <button @click="toggleForm('mostrarCorreos')" class="btn-correos">
      {{ mostrarCorreos ? 'Ocultar' : 'Mostrar' }} Datos de usuarios
    </button>
  </div>
  <MVCAltaBaja v-if="mostrarFormulario" />
  <MVCCooplus v-if="mostrarCooplus" />
  <Correos v-if="mostrarCorreos" />
</template>

<script>
import MVCAltaBaja from '@/components/forms/MVCAlta-Baja.vue';
import MVCCooplus from '@/components/forms/MVCCooplus.vue';
import Correos from '@/components/forms/Correos.vue';

export default {
  components: {
    MVCAltaBaja,
    MVCCooplus,
    Correos,
  },
  data() {
    return {
      mostrarFormulario: false,
      mostrarCooplus: false,
      mostrarCorreos: false,
    };
  },
  methods: {
    toggleForm(form) {
      this.mostrarFormulario = false;
      this.mostrarCooplus = false;
      this.mostrarCorreos = false;

      this[form] = !this[form];
    }
  }
};
</script>

<style scoped>
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-left: 120px;
  padding-right: 120px;
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

.button-container button {
  flex: 1;
  padding: 15px;
  font-size: 1.2em;
  background-color: #053e74;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.btn-formulario:hover {
  background-color: #1d70be;
}

.btn-cooplus:hover {
  background-color: #ff3385;
}
.btn-correos:hover {
  background-color: #1d70be;
}
</style>
