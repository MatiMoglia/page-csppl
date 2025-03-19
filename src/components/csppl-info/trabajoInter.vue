<template>
  <div class="container">
    <div class="dropdown-containers">
      <div class="dropdown">
        <button class="dropdown-btn" @click="mostrar = !mostrar">
          <div class="section-title">
            <h2>Trabajo Interinstitucional</h2>
          </div>
          <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrar}"></i>
        </button>
        <div class="dropdown-content" :class="{ 'open': mostrar }">
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
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5DX7AacrciB_tdD4lZ2S-U7PqqauyPv442g&s" alt="El Colibrí" class="cooperativa-logo" />
              <h3>El Colibrí</h3>
              <p>Cooperativa Escolar del Centro Educativo 9 de Julio. Juntos cultivamos los valores del cooperativismo.</p>
            </div>
            <div class="cooperativa-card">
              <img src="https://scontent.fcor3-1.fna.fbcdn.net/v/t1.6435-9/79543308_2818218714889436_5070824907202363392_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtw7osvZsqix9IxWebEkQBXEs8Jd4EZpZcSzwl3gRmlkgZ4q2oeyaM9FP_Vbp1cCdd1rH2yrnKK8FQS1x8JoWZ&_nc_ohc=uRA_zGcUKp0Q7kNvgHpKjl1&_nc_oc=AdlriPjg6rrN5RK_QOjYA2ormf1VT4cScgAk8ECKqiLDLt18huyIv7LMV6d8u--B07M&_nc_zt=23&_nc_ht=scontent.fcor3-1.fna&_nc_gid=dt66FHeggWm_R5Zt060InQ&oh=00_AYF-jIhMbvE7tTrRr5n_A_KFR9OnnK7FoPq0ZWdCmTMXfw&oe=680291D6" alt="La Porteñita" class="cooperativa-logo" />
              <h3>La Porteñita</h3>
              <p>Cooperativa Escolar del Centro Educativo Nuestra Señora de Lourdes. Trabajamos en conjunto para fortalecer nuestra comunidad.</p>
            </div>
            <div class="cooperativa-card">
              <img src="https://scontent.fcor3-1.fna.fbcdn.net/v/t39.30808-6/374461020_1418022518764564_1541523727927590556_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHLzEXpD_TC-9lv3gKmIP6zP_K_hvAxCSs_8r-G8DEJKzPLz2sgPYMI4gHX39eftCw14QpcJkpJyIKvoR2lTKHh&_nc_ohc=05fIS3wni7oQ7kNvgHnz3s9&_nc_oc=AdmJdyimY_rjSWzrr234S3bygC8qG4_h9b5nTnhR5zly8YwQprYIauRjB9ZL324HtgQ&_nc_zt=23&_nc_ht=scontent.fcor3-1.fna&_nc_gid=IsGbHxwwtLBtcc1Er4HDeg&oh=00_AYF2VbCeG9TePGfxlXjsbwqPw16lIvcxWyt4rsrtrpdK1w&oe=67E0D907" alt="La Juvenil" class="cooperativa-logo" />
              <h3>La Juvenil</h3>
              <p>Cooperativa Escolar del Instituto de Enseñanza Media Bernardino Rivadavia. Contribuimos al desarrollo de nuevas ideas y aprendizajes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrabajoInterinstitucional',
  data() {
    return {
      mostrar: false
    };
  }
};
</script>

<style scoped>
.dropdown-containers {
  display: flex;
  gap: 15px;
}
.dropdown {
  margin: 20px auto;
  width: 80%;
  text-align: center;
}

.dropdown-btn {
  width: 100%;
  cursor: pointer;
  text-align: left;
  display: flex;
  border: none;
  justify-content: space-between;
  align-items: center;
  background: none;
  background-color: rgba(244, 244, 244, 0.9); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
  font-family:"Montserrat", sans-serif;
}

.section-title {
  flex-grow: 1;
}

.section-title h2 {
  font-size: 2rem;
  color: #0e1850;
  margin: 0;
  border-left: 5px solid #0e1850;
  padding: 15px; 
}
.dropdown-btn i {
  padding: 20px;
  font-size: 1.5rem;
}

.dropdown-arrow {
  transition: transform 0.3s;
}

.rotate-arrow {
  transform: rotate(180deg);
}

.dropdown-content {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 0px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  margin-bottom: 10px;
}
.dropdown-content.open {
  max-height: 550px; 
}

.container {
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
}

.intro {
  padding: 20px;
  margin-bottom: 40px;
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
  text-align: justify;
}

.intro p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

.cooperativas {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  margin-bottom: 20px;
}

.cooperativa-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(33, 4, 163, 0.1);
  width: 30%;
  text-align: center;
  margin-bottom: 10px;
}

.cooperativa-card h3 {
  color: #0e1850;
  font-size: 1.4rem;
}

.cooperativa-card p {
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 10px;
  padding: 20px;
}

.cooperativa-logo {
  width: 80px;
  height: auto;
  margin-bottom: 15px;
}
</style>
