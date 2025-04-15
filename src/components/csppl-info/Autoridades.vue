<template>
  <h1>¿Quiénes conforman el consejo de Administración?</h1>
  <div class="container">
    <div class="section-title"></div>
    
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div v-else class="consejo" data-aos="fade-up">
      <h3>Nuestro Consejo de Administración 2025</h3>
      <div class="consejo-cards">
        <div v-for="(autoridad, index) in autoridades" :key="index" class="card">
          <img :src="autoridad.image_url" alt="Foto de autoridad" class="profile-img" />
          <h4>{{ autoridad.title }}</h4>
          <p>{{ autoridad.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/apiAuthorities";  
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      autoridades: [],
      isLoading: true  
    };
  },
  mounted() {
    AOS.init();
    this.fetchAutoridades();
  },
  methods: {
    async fetchAutoridades() {
      try {
        const { data } = await api.get("/autoridades");
        this.autoridades = data;
      } catch (error) {
        console.error("Error:", error);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #f9f9f9;
  max-width: 1000px;
  margin-bottom: 20px;
}
  
.section-title {
  text-align: center;
}

h1 {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
}

.consejo h3 {
  color: #1f2c79;
  background-color: #ececec38;
  font-size: 2rem;
  border-left: 5px solid #0e1850;
  border-right: 5px solid #0e1850;
  text-align: center;
  padding: 20px;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  text-align: center;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card h4 {
  color: #2a53ac;
  font-size: 1.3rem;
  margin-top: 10px;
}

.card p {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 10px 0;
  font-weight: bold;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

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
</style>
