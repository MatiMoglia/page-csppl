<template>
    <div class="novedades-container">
      <h2>Últimas Novedades</h2>
      <div class="novedades-grid">
        <div
          v-for="(novedad, index) in visibleNovedades"
          :key="index"
          class="novedad-card"
        >
          <img
            :src="novedad.imagen"
            :alt="novedad.titulo"
            class="novedad-img"
            @click="verNovedad(novedad.id)"
          />
          <div class="novedad-text">
            <h4>{{ novedad.titulo }}</h4>
            <p>{{ novedad.descripcion }}</p>
            <button @click="verNovedad(novedad.id)">Leer más</button>
          </div>
        </div>
      </div>
  
      <div class="dots">
        <span
          v-for="(dot, index) in totalGroups"
          :key="index"
          class="dot"
          :class="{ active: index === currentGroup }"
          @click="goToGroup(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startIndex: 0,
        novedades: [
          { id: 1, titulo: "Atención 24/7", descripcion: "Ampliamos nuestros horarios.", imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/noticia/public/field/image/CONSUMO%20WEB-02.jpg?itok=hOuw7lJ0" },
          { id: 2, titulo: "Nueva plataforma", descripcion: "Mejoramos la experiencia.", imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/noticia/public/field/image/CONSUMO%20WEB-02.jpg?itok=hOuw7lJ0" },
          { id: 3, titulo: "Promociones 2025", descripcion: "Descuentos exclusivos.", imagen: "https://www.coopspportena.com.ar/sites/default/files/styles/noticia/public/field/image/CONSUMO%20WEB-02.jpg?itok=hOuw7lJ0" },
        ],
      };
    },
    computed: {
      visibleNovedades() {
        return this.novedades.slice(this.startIndex, this.startIndex + 3);
      },
      totalGroups() {
        return Math.ceil(this.novedades.length / 3);
      },
      currentGroup() {
        return this.startIndex / 3;
      },
    },
    methods: {
      goToGroup(index) {
        this.startIndex = index * 3;
      },
      verNovedad(id) {
        this.$router.push({ name: "Novedades", params: { id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .novedades-container {
    text-align: center;
    padding: 20px;
  }
  h2 {
    margin-bottom: 10px;
  }
  .novedades-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: nowrap;
  }
  
  .novedad-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 300px;
    text-align: center;
  }
  
  .novedad-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 8px;
  }
  
  .novedad-text h4 {
    margin: 10px 0;
  }
  
  .novedad-text p {
    font-size: 14px;
    color: gray;
  }
  
  .novedad-text button {
    background: #0e1850;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  .novedad-text button:hover {
    background: #0e4179;
  }
  
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background: gray;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .dot.active {
    background: #18599e;
  }
  </style>
  