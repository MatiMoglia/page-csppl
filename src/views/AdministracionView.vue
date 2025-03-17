<template>
  <div>
    <button @click="mostrarFormulario = !mostrarFormulario">
      {{ mostrarFormulario ? 'Ocultar' : 'Mostrar' }} Formularios
    </button>
    <MVCAltaBaja v-if="mostrarFormulario" />
    <button @click="mostrarCooplus = !mostrarCooplus">
      {{ mostrarCooplus ? 'Ocultar' : 'Mostrar' }} Formularios de Cooplus
    </button>
    <MVCCooplus v-if="mostrarCooplus" />
  </div>
</template>

<script>
import MVCAltaBaja from '@/components/forms/MVCAlta-Baja.vue';
import MVCCooplus from '@/components/forms/MVCCooplus.vue';

export default {
  components: {
    MVCAltaBaja,
    MVCCooplus
  },
  data() {
    return {
      mostrarFormulario: false,
      mostrarCooplus: false,
    };
  }
};
</script>