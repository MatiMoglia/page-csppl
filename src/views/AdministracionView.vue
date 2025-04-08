<template>
  <h1 class="title">Panel de Administración</h1>
  <div class="button-container">
    <button @click="toggleForm('mostrarFormulario')" class="btn-formulario">
      {{ mostrarFormulario ? 'Ocultar' : 'Mostrar' }} Formularios de ALTA/BAJA
    </button>
    <button @click="toggleForm('mostrarCooplus')" class="btn-cooplus">
      {{ mostrarCooplus ? 'Ocultar' : 'Mostrar' }} Formularios de Cooplus
    </button>
    <button @click="toggleForm('mostrarReclamos')" class="btn-reclamos">
      {{ mostrarReclamos ? 'Ocultar' : 'Mostrar' }} Formularios de Reclamos
    </button>
    <button @click="toggleForm('mostrarAdherentes')" class="btn-2da">
      {{ mostrarCVs ? 'Ocultar' : 'Mostrar' }} Adherentes de SS
    </button>
    <button @click="toggleForm('mostrarDonantes')" class="btn-2da">
      {{ mostrarDonantes ? 'Ocultar' : 'Mostrar' }} Donantes
    </button>
    <button @click="toggleForm('mostrarNecrologicos')" class="btn-2da">
      {{ mostrarNecrologicos ? 'Ocultar' : 'Mostrar' }} Datos de necrología
    </button>
    <button @click="toggleForm('mostrarNovedades')" class="btn-3era">
      {{ mostrarNovedades ? 'Ocultar' : 'Mostrar' }} Novedades
    </button>
    <button @click="toggleForm('mostrarCVs')" class="btn-3era">
      {{ mostrarCVs ? 'Ocultar' : 'Mostrar' }} curriculums enviados
    </button>
    <button @click="toggleForm('mostrarCorreos')" class="btn-3era">
      {{ mostrarCorreos ? 'Ocultar' : 'Mostrar' }} Datos de usuarios
    </button>
    
  </div>
  <Graficos v-if="mostrarGraficos"/>
  <CRUDAltaBaja v-if="mostrarFormulario" />
  <CRUDCooplus v-if="mostrarCooplus" />
  <Correos v-if="mostrarCorreos" />
  <ListaReclamos v-if="mostrarReclamos" />
  <ListaDonantes v-if="mostrarDonantes" />
  <CRUDnecrologicos v-if="mostrarNecrologicos" />
  <CRUDnovedades v-if="mostrarNovedades"/>
  <ListaCVs v-if="mostrarCVs"/>
  <CRUDAdherentes v-if="mostrarAdherentes"/>
</template>

<script>
import CRUDAltaBaja from '@/components/forms/CRUDAlta-Baja.vue';
import CRUDCooplus from '@/components/forms/CRUDCooplus.vue';
import Correos from '@/components/forms/CRUDCorreos.vue';
import ListaReclamos from '@/components/forms/CRUDListaReclamos.vue';
import ListaDonantes from '@/components/forms/CRUDListaDonantes.vue';
import CRUDnecrologicos from '@/components/forms/CRUDnecrologicos.vue';
import Graficos from '@/components/forms/Graficos.vue';
import CRUDnovedades from '@/components/forms/CRUDnovedades.vue';
import ListaCVs from '@/components/forms/CRUDListaCVs.vue';
import CRUDAdherentes from '@/components/forms/CRUDAdherentes.vue';
export default {
  components: {
    CRUDAltaBaja,
    CRUDCooplus,
    Correos,
    ListaReclamos,
    ListaDonantes,
    CRUDnecrologicos,
    Graficos,
    CRUDnovedades,
    ListaCVs,
    CRUDAdherentes
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
      mostrarAdherentes: false
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
        this.mostrarAdherentes = false;
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

.btn-3era {
  background-color: #407af8;
}

.btn-3era:hover {
  background-color: #0647d1;
}
.btn-2da {
  background-color: #2150b6;
}

.btn-2da:hover {
  background-color: #0051ff;
}
</style>
