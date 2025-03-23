<template>
    <div class="necro-container" @click="irnecro">
      <div class="necro-image">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        irnecro() {
            this.$router.push({ name: "NecrologicosView" });
        },
    },
  };
  </script>
  
<style scoped>
.necro-container {
    width: 100%;
    max-width: 1150px;
    height: 220px;
    margin: 40px auto;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.5s, box-shadow 0.5s;
}
  
.necro-image {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/css/img/necrologicos.jpg');
    background-size: cover;
    background-position: center;
}
  
.necro-container:hover {
    transform: translateY(-5px);
}
  
@media (max-width: 768px) {
  .necro-title {
      font-size: 1.4rem;
      top: 10px;
      left: 15px;
    }
}
</style>
  