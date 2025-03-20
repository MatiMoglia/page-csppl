<template>
  <h1 class="title">Misión, Visión y Valores</h1>
  <div class="container">
    <div class="card">
      <img src="https://cdn-icons-png.flaticon.com/128/4406/4406394.png" alt="Logo Cooperativa" class="logo" />
      <h2>Misión</h2>
      <p class="description">
        Nuestro principal objetivo es cumplir con los requerimientos y necesidades de los asociados y el bienestar general de toda la comunidad, trabajando para mejorar la calidad de vida de los mismos y para el desarrollo y crecimiento de la localidad, distribuyendo energía de calidad que lo posibilite...
      </p>
    </div>
    <div class="card">
      <img src="https://cdn-icons-png.flaticon.com/128/5165/5165942.png" alt="Logo Cooperativa" class="logo" />
      <h2>Visión</h2>
      <p class="description">
        Ser capaces de aumentar y elevar la calidad de nuestros servicios convirtiéndonos en una empresa cooperativa que se destaque por el compromiso en la prestación de servicios eficientes y de alta calidad siempre sobre la base de los principios y valores cooperativos...
      </p>
    </div>
    <div class="card">
      <img src="https://cdn-icons-png.flaticon.com/128/8131/8131434.png" alt="Logo Cooperativa" class="logo" />
      <h2>Valores</h2>
      <p class="description">
        Los cooperativistas estamos basados en los valores de la autoayuda, la autorresponsabilidad, la democracia, la igualdad, la equidad y la solidaridad. Es tradición de los fundadores que los asociados hagan suyos los valores éticos de la honestidad, la transparencia, la responsabilidad y la vocación social...
      </p>
    </div>
  </div>
  <h1 class="title">Nuestros Objetivos:</h1>
  <div class="objectives">
    <div class="objectives-list">
      <ul>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Cumplir con los requerimientos y necesidades de los asociados.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Mejorar la calidad de vida de los asociados y la comunidad.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Desarrollar y crecer la localidad con servicios de energía de calidad.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Prestar otros servicios acorde a la viabilidad de implementación.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Seguir los principios de solidaridad, competitividad, sustentabilidad y accesibilidad.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Fundamentar la cooperativa en la confianza, transparencia y responsabilidad.</li>
        <li><i class="ri-checkbox-circle-line icono-li"></i>Promover la pertenencia y los valores cooperativos dentro de la comunidad.</li>
      </ul>
    </div>
    <div class="objectives-image">
      <img src="https://www.coopspportena.com.ar/sites/default/files/styles/noticia_interna/public/field/image/WhatsApp%20Image%202024-06-13%20at%202.24.48%20PM%20%284%29.jpeg?itok=NafRS6aU" alt="objetivos" class="imagen">
      <p>Parque Solar Comunitario: la Ministra Victoria Flores dio su compromiso para la concreción de nuestro proyecto</p>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #ffffff;
  background-color: #1f2c79;
  font-size: 2.5rem;
  padding: 15px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 50px;
  flex-wrap: wrap;
}

.card {
  background-color: #f4f4f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 30%;
  margin-bottom: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover{
  transform: translateY(-15px);
  box-shadow: 0 4px 15px rgba(65, 89, 226, 0.849);
}

.card h2 {
  color: #0e1850;
  font-size: 1.8rem;
  margin-top: 10px;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

h2 {
  color: #0e1850;
  font-size: 2rem;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.card .description {
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
}

.card .logo {
  width: 80px;
  height: auto;
  margin-bottom: 15px;
}

.objectives {
  background-color: #f8f9fa;
  padding: 10px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
}

.objectives-list {
  width: 70%;
}
.objectives-list i {
  padding-right: 20px;
  color: blue;
  font-weight: bold;
}

.objectives h3 {
  color: #0e1850;
  font-size: 1.3rem;
}

.objectives ul {
  list-style-type: none;
  padding-left: 0;
}

.objectives li {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
  gap: 10px;
  margin: 12px;
  padding-left: 30px;
}

.objectives-image {
  width: 30%;
  text-align: center;
  padding-right: 40px;
  margin-top: 20px;
}


.objectives .imagen {
  width: 100%;
  height: auto;
  margin: 0 auto;
  padding: 6px;
  background-color: #0e1850 ;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px ;
  transition: transform 0.5s, box-shadow 0.3s;
}
.objectives .imagen:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(65, 89, 226, 0.849);
}

.objectives .imagen + p {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  font-style: italic;
}
</style>
