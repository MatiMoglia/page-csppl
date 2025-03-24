<template>
    <div class="advantages-container">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="advantage-row">
        <div v-for="(card, idx) in row" :key="idx" class="advantage-card">
          <i :class="card.icon" style="font-size: 40px; color: #1f2c79;"></i>
          <h4>{{ card.title }}</h4>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        cards: [
          { title: "Alta Velocidad", description: "Fibra óptica proporciona velocidades mucho más altas que las conexiones antiguas de cobre.", icon: "ri-speed-line" },
          { title: "Mayor Estabilidad", description: "Una conexión de fibra óptica es más estable, con menos interferencias y caídas de señal.", icon: "ri-bar-chart-line" },
          { title: "Instalación sin cargo", description: "La instalación es sin costo para el usuario que desee conectarse al servicio.", icon: "ri-tools-line" },
          { title: "Conexión Ininterrumpida", description: "Con fibra óptica, la conexión no se ve afectada por condiciones climáticas adversas.", icon: "ri-refresh-line" },
          { title: "Mayor Seguridad", description: "Las señales de fibra óptica son más difíciles de hackear, ofreciendo una conexión más segura.", icon: "ri-shield-check-line" },
          { title: "Mejor Experiencia de Streaming", description: "Disfruta de videos 4K sin interrupciones gracias a la alta velocidad de la fibra óptica.", icon: "ri-volume-up-line" }
        ]
      };
    },
    computed: {
      rows() {
        const rows = [];
        for (let i = 0; i < this.cards.length; i += 3) {
          rows.push(this.cards.slice(i, i + 3));
        }
        return rows; 
      }
    }
  };
</script>
  
<style scoped>.advantages-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
}
  
.advantage-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px;
}
  
.advantage-card {
    background-color: #fff;
    border: 2px solid #0e1850;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 280px;
    height: 220px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
  
.advantage-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
  
.advantage-card h4 {
    color: #1a36d1;
    font-size: 1.5rem;
    margin-bottom: 10px;
}
</style>
  