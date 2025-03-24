<template>
    <div class="coopOnline-container" @click="irCoopOnline">
      <div class="coopOnline-image">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        irCoopOnline() {
            window.open("https://www.cooponlineweb.com.ar/PORTENIA/Login", "_blank");
        },
    },
  };
  </script>
  
<style scoped>
.coopOnline-container {
    width: 100%;
    max-width: 800px;
    height: 180px;
    margin: 40px auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
}
  
.coopOnline-image {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/css/img/coopOnline-page.png');
    background-size: cover;
    background-position: center;
    transition: transform 0.3s, box-shadow 0.3s;
}
  
.coopOnline-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(17, 131, 177, 0.849);
}
  
@media (max-width: 768px) {
  .coopOnline-title {
      font-size: 1.4rem;
      top: 10px;
      left: 15px;
    }
}
</style>
  