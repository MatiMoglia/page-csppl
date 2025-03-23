<template>
    <h2 class="title">COOPLUS + Evolución para vos</h2>
    <div class="cooplus-container" @click="irCooplus">
      <div class="cooplus-image">
      </div>
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
.title {
  color: #be53a7;
  background-color: #ececec;
  font-size: 2rem;
  border-left: 5px solid #0e1850;
  border-right: 5px solid #0e1850;
  margin-left: 100px;
  margin-right: 100px;
  text-align: center;
  padding: 20px;
  margin-bottom: -30px;
}  
.cooplus-container {
    width: 100%;
    max-width: 1150px;
    height: 250px;
    margin: 40px auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
}
  
.cooplus-image {
    width: 100%;
    height: 100%;
    background-image: url("https://www.coopspportena.com.ar/sites/default/files/styles/banner_principal_2_hd/public/BANNER%20PACKS_BANNER%20PACKS.jpg?itok=QIYhYAU5");
    background-size: cover;
    background-position: center;
    transition: transform 0.3s, box-shadow 0.3s;
}
  
.cooplus-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(226, 110, 255, 0.849);
}
  
@media (max-width: 768px) {
  .cooplus-title {
      font-size: 1.4rem;
      top: 10px;
      left: 15px;
    }
}
</style>
  