<template>
    <div class="detalle-container">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <router-link to="/novedades" class="btn-volver">
             <i class="ri-arrow-left-line"></i> Volver a Novedades
        </router-link>
      <img
        v-if="novedad?.imagen"
        :src="novedad.imagen"
        alt="Imagen de la novedad"
        class="detalle-imagen"
      />
      <h2 class="detalle-titulo">{{ novedad?.titulo }}</h2>
      <h3 class="detalle-subtitulo">{{ novedad?.subtitulo }}</h3>
      <p class="detalle-fecha">{{ novedad?.fecha }}</p>
      <p class="detalle-contenido">{{ novedad?.contenido }}</p>
    </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiNovs from "@/services/apiNovs";
  
  export default {
  setup() {
    const route = useRoute();
    const novedad = ref(null);
    const loading = ref(true);

      const obtenerNovedadPorId = async (id) => {
    try {
      loading.value = true; 
      const response = await apiNovs.getNovedades();
      
      if (response.success) {
        return response.data.find((n) => n._id == id) || null; 
      } else {
        console.error("Error: la API no devolvió datos correctos.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la novedad:", error);
      return null;
    } finally {
      loading.value = false; 
    }
  };

    onMounted(async () => {
      novedad.value = await obtenerNovedadPorId(route.params.id);
    });

    return { novedad, loading }; 
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
}

.spinner {
    border: 6px solid #0e144b;
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
.detalle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
  
.detalle-imagen {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
}
  
.detalle-titulo {
    font-size: 2rem;
    font-weight: bold;
    color: #3974ac;
}
  
.detalle-subtitulo {
    font-size: 1.2rem;
    color: #666;
}
  
.detalle-fecha {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
}
  
.detalle-contenido {
    font-size: 16px;
    color: #444;
    margin-top: 15px;
    line-height: 1.6;
}
 .btn-volver {
    padding: 10px 20px;
    background-color: #1f2c79;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-bottom: 20px;
    align-self: flex-start; 
    position: relative;
    left: 20px;
    top: 10px;
}
.btn-volver i{
    margin-right: 10px;
}
.btn-volver:hover {
    background-color: #0056b3;
}
</style>
  