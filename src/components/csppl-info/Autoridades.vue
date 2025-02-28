<template>
  <div class="container">
    <div class="section-title">
      <h2>¿Quiénes conforman el consejo de Administración?</h2>
    </div>
    <div class="consejo">
      <h3>Consejo de Administración</h3>
      <div class="consejo-cards">
        <div v-for="(autoridad, index) in autoridades" :key="index" class="card">
          <img v-if="autoridad.profile" 
               :src="autoridad.profile" 
               alt="Imagen de autoridad" 
               class="profile-img" />
          <h4>{{ autoridad.name }}</h4>
          <p>{{ autoridad.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiAuthorities from "@/services/apiAuthorities";  

export default {
  data() {
    return {
      autoridades: []  
    };
  },
  mounted() {
    this.fetchAutoridades();
  },
  methods: {
    async fetchAutoridades() {
      try {
        const response = await apiAuthorities.getAuthorities();
        this.autoridades = response.data;  
      } catch (error) {
        console.error("Error al obtener las autoridades:", error);
      }
    },
  }
};
</script>
  
<style scoped>
  .container {
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .section-title h2 {
    font-size: 2rem;
    color: #2980b9;
  }
  
  .consejo h3 {
    text-align: center;
    font-size: 1.6rem;
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .consejo-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
  
  .card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .card h4 {
    color: #2980b9;
    font-size: 1.3rem;
    margin-top: 10px;
  }
  
  .card p {
    color: #7f8c8d;
    font-size: 1rem;
    margin: 10px 0;
  }

  .profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
  