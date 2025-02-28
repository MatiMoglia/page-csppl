<template>
    <div class="container">
      <div class="section-title">
        <h2>Trabajo Interinstitucional</h2>
      </div>
      <div class="intro">
        <p>
          La Cooperativa trabaja junto con las Cooperativas Escolares de Porteña. El Colibrí, del Centro Educativo 9 de Julio, La Porteñita, del Centro Educativo Nuestra Señora de Lourdes y La Juvenil, del Instituto de Enseñanza Media Bernardino Rivadavia. 
        </p>
        <p>
          El trabajo con estos jóvenes enriquece a nuestra Institución y nos permite cultivar los valores del Cooperativismo, realizar acciones en conjunto que nos potencian y adquirir nuevos conocimientos.
        </p>
      </div>
      <div class="cooperativas">
        <div class="cooperativa-card">
          <img src="path/to/logo-elcolibri.jpg" alt="El Colibrí" class="cooperativa-logo" />
          <h3>El Colibrí</h3>
          <p>Cooperativa Escolar del Centro Educativo 9 de Julio. Juntos cultivamos los valores del cooperativismo.</p>
        </div>
        <div class="cooperativa-card">
          <img src="path/to/logo-laporteniita.jpg" alt="La Porteñita" class="cooperativa-logo" />
          <h3>La Porteñita</h3>
          <p>Cooperativa Escolar del Centro Educativo Nuestra Señora de Lourdes. Trabajamos en conjunto para fortalecer nuestra comunidad.</p>
        </div>
        <div class="cooperativa-card">
          <img src="path/to/logo-lajuvenil.jpg" alt="La Juvenil" class="cooperativa-logo" />
          <h3>La Juvenil</h3>
          <p>Cooperativa Escolar del Instituto de Enseñanza Media Bernardino Rivadavia. Contribuimos al desarrollo de nuevas ideas y aprendizajes.</p>
        </div>
      </div>
    </div>
    <NovedadesGrid />
</template>
<script>
import NovedadesGrid from '../NovedadesGrid.vue';

export default { 
    name: 'TrabajoInterinstitucional',
    components: {
      NovedadesGrid
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
    margin-bottom: 20px;
  }
  
  .section-title h2 {
    font-size: 2rem;
    color: #0e1850;
    margin: 0;
  }
  
  .intro {
    margin-bottom: 40px;
    font-size: 1.1rem;
    color: #34495e;
    line-height: 1.6;
    text-align: justify;
  }
  
  .intro p {
    margin-bottom: 20px;
  }
  
  .cooperativas {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .cooperativa-card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(33, 4, 163, 0.1);
    width: 30%;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .cooperativa-card h3 {
    color: #0e1850;
    font-size: 1.4rem;
    margin-top: 10px;
  }
  
  .cooperativa-card p {
    font-size: 1rem;
    color: #34495e;
  }
  
  .cooperativa-logo {
    width: 80px;
    height: auto;
    margin-bottom: 15px;
  }
</style>
  