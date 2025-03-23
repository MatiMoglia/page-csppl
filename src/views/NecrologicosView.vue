<template>
  <h1 class="title">Necrológicos</h1>
  <div class="container">
    <div v-if="fallecidos.length > 0">
      <div v-for="fallecido in paginatedFallecidos" :key="fallecido._id" class="card">
        <h2>{{ fallecido.nombre }}</h2>
        <p class="qepd">Que en paz descanse (Q.E.P.D.)</p>
        <p><strong>Fallecido el dia:</strong> {{ fallecido.fechadisfuncion }}</p>
        <p><strong>Edad:</strong> {{ fallecido.edad }}</p>
        <p><strong>Sepelio:</strong> {{ fallecido.sepelio }}</p>
        <p><strong>Iglesia:</strong> {{ fallecido.iglesia }}</p>
        <p><strong>Sus restros seran traslados al cementerio:</strong> {{ fallecido.cementerio }}</p>
      </div>

      <div v-if="totalGroups > 1" class="dots">
        <span
          v-for="(dot, index) in totalGroups"
          :key="index"
          class="dot"
          :class="{ active: index === currentGroup }"
          @click="goToGroup(index)"
        ></span>
      </div>
    </div>

    <p v-else class="loading">Cargando datos...</p>
  </div>
</template>

<script>
import apiAvisos from "@/services/apiAvisos";

export default {
  data() {
    return {
      fallecidos: [],
      currentGroup: 0,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalGroups() {
      return Math.ceil(this.fallecidos.length / this.itemsPerPage);
    },
    paginatedFallecidos() {
      const start = this.currentGroup * this.itemsPerPage;
      return this.fallecidos.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    goToGroup(index) {
      this.currentGroup = index;
    },
    parseDate(dateString) {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day); 
    }
  },
  async created() {
    const response = await apiAvisos.obtenerDatos();
    if (response.success) {
      this.fallecidos = response.data
        .map(fallecido => ({
          ...fallecido,
          fechaOrdenada: this.parseDate(fallecido.fechadisfuncion)
        }))
        .sort((a, b) => b.fechaOrdenada - a.fechaOrdenada); 
    } else {
      console.error(response.message);
    }
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
}
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.card {
  background: #f8f9fa;
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.card h2 {
  font-size: 1.7rem;
  color: #2c3e50;
}

.card p {
  font-size: 1rem;
  color: #555;
  margin-top: 10px;
}

.qepd {
  font-style: italic;
  font-weight: bold;
  color: #4f86d9 !important;
  margin-bottom: 10px;
}

.dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.dot {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: #007bff;
  transform: scale(1.2);
}

.loading {
  font-size: 1.2rem;
  color: #777;
}
</style>
