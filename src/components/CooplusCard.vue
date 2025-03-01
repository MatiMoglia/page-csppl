<template>
    <div class="cooplus-container" @click="irCooplus">
      <div class="cooplus-image"></div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        irCooplus() {
        this.$router.push({ name: "CooplusView" });
      },
    },
  };
  </script>
  
  <style scoped>
  .cooplus-container {
    width: 100%;
    max-width: 1200px;
    height: 200px;
    margin: 40px auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .cooplus-image {
    width: 100%;
    height: 100%;
    background-image: url("https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/BANNER%20PACKS_BANNER%20PACKS.jpg?itok=QIYhYAU5");
    background-size: cover;
    background-position: center;
    transition: transform 0.4s ease-in-out;
  }
  
  .cooplus-container:hover .cooplus-image {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .cooplus-title {
      font-size: 1.4rem;
      top: 10px;
      left: 15px;
    }
  }
  </style>
  