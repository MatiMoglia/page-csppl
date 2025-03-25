<template>
  <h1 class="title">Panel de Administración</h1>
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
    <button @click="toggleForm('mostrarReclamos')" class="btn-reclamos">
      {{ mostrarReclamos ? 'Ocultar' : 'Mostrar' }} Reclamos
    </button>
    <button @click="toggleForm('mostrarDonantes')" class="btn-donantes">
      {{ mostrarDonantes ? 'Ocultar' : 'Mostrar' }} Donantes
    </button>
    <button @click="toggleForm('mostrarNecrologicos')" class="btn-necrologicos">
      {{ mostrarNecrologicos ? 'Ocultar' : 'Mostrar' }} Datos de necrología
    </button>
    <button @click="toggleForm('mostrarNovedades')" class="btn-novedades">
      {{ mostrarNovedades ? 'Ocultar' : 'Mostrar' }} Novedades
    </button>
    <button @click="toggleForm('mostrarCVs')" class="btn-cvs">
      {{ mostrarCVs ? 'Ocultar' : 'Mostrar' }} curriculums enviados
    </button>
  </div>
  <Grafico v-if="mostrarGraficos"/>
  <MVCAltaBaja v-if="mostrarFormulario" />
  <MVCCooplus v-if="mostrarCooplus" />
  <Correos v-if="mostrarCorreos" />
  <ListaReclamos v-if="mostrarReclamos" />
  <ListaDonantes v-if="mostrarDonantes" />
  <MVCnecrologicos v-if="mostrarNecrologicos" />
  <MVCnovedades v-if="mostrarNovedades"/>
  <ListaCVs v-if="mostrarCVs"/>
</template>

<script>
import MVCAltaBaja from '@/components/forms/MVCAlta-Baja.vue';
import MVCCooplus from '@/components/forms/MVCCooplus.vue';
import Correos from '@/components/forms/Correos.vue';
import ListaReclamos from '@/components/forms/ListaReclamos.vue';
import ListaDonantes from '@/components/forms/ListaDonantes.vue';
import MVCnecrologicos from '@/components/forms/MVCnecrologicos.vue';
import Graficos from '@/components/forms/Graficos.vue';
import MVCnovedades from '@/components/forms/MVCnovedades.vue';
import ListaCVs from '@/components/forms/ListaCVs.vue';
export default {
  components: {
    MVCAltaBaja,
    MVCCooplus,
    Correos,
    ListaReclamos,
    ListaDonantes,
    MVCnecrologicos,
    Graficos,
    MVCnovedades,
    ListaCVs,
  },
  data() {
    return {
      mostrarFormulario: false,
      mostrarCooplus: false,
      mostrarCorreos: false,
      mostrarReclamos: false,
      mostrarDonantes: false,
      mostrarNecrologicos: false,
      mostrarNovedades: false,
      mostrarGraficos: true,
      mostrarCVs: false,
    };
  },
  methods: {
    toggleForm(form) {
      if (this[form]) {
        this[form] = false;
        this.mostrarGraficos = true;
      } else {
        this.mostrarFormulario = false;
        this.mostrarCooplus = false;
        this.mostrarCorreos = false;
        this.mostrarReclamos = false;
        this.mostrarDonantes = false;
        this.mostrarNecrologicos = false;
        this.mostrarNovedades = false;
        this.mostrarGraficos = false;
        this.mostrarCVs = false;
        this[form] = true;
      }
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  padding: 0 120px;
}

button {
  width: 100%;
  padding: 20px;
  background-color: #053e74;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  font-family: "Montserrat", sans-serif;
}

button:hover {
  background-color: #1d70be;
  transform: scale(1.05);
}

.btn-novedades {
  background-color: #407af8;
  grid-column: 1; 
}

.btn-novedades:hover {
  background-color: #0647d1;
}
.btn-cvs {
  background-color: #407af8;
  grid-column: 3;
}

.btn-cvs:hover {
  background-color: #0647d1;
}
</style>
