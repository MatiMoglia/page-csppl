<template>
    <h1>Misión, Visión y Valores</h1>
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
      <div class="objectives">
        <h2>Objetivos:</h2>
        <ul>
          <li>Cumplir con los requerimientos y necesidades de los asociados.</li>
          <li>Mejorar la calidad de vida de los asociados y la comunidad.</li>
          <li>Desarrollar y crecer la localidad con servicios de energía de calidad.</li>
          <li>Prestar otros servicios acorde a la viabilidad de implementación.</li>
          <li>Seguir los principios de solidaridad, competitividad, sustentabilidad y accesibilidad.</li>
          <li>Fundamentar la cooperativa en la confianza, transparencia y responsabilidad.</li>
          <li>Promover la pertenencia y los valores cooperativos dentro de la comunidad.</li>
        </ul>
      </div>
    </div>
</template>
  
<style scoped>
h1 {
    color: #0e1850;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
    margin-top: 20px;
}
  .container {
    display: flex;
    justify-content: space-between;
    margin: 30px;
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
  }
  
  .card h2 {
    color: #0e1850;
    font-size: 1.5rem;
    margin-top: 10px;
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
    margin-top: 30px;
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
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
    font-size: 1rem;
    color: #34495e;
    margin-bottom: 10px;
  }
</style>