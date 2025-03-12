<template>
    <div class="ss-container">
        <div class="sepelio">
            <div class="header">
                <h1>Servicio de Sepelio</h1>
                <router-link to="/servicios-sociales" class="btn-volver">
                    <i class="ri-arrow-left-line"></i> Volver a Servicios Sociales
                </router-link>
            </div>
            <p>Desde 1984 ofrecemos el servicio de sepelio con una cobertura completa basada en la seriedad, el respeto y acompañamiento de los familiares.</p>
            <p>Sentimos y comprendemos las emociones ajenas como propias y atendemos cada uno de los detalles brindando a la familia la contención necesaria que el momento requiere.</p>
            <h2>Servicios Incluidos:</h2>
            <ul>
                <li><i class="ri-check-line"></i>Ataúd</li>
                <li><i class="ri-check-line"></i>Sala velatoria</li>
                <li><i class="ri-check-line"></i>Gastos en la parroquia</li>
                <li><i class="ri-check-line"></i>Cremación</li>
                <li><i class="ri-check-line"></i>Coche fúnebre y coche de duelo para familiares, en el momento de traslado al cementerio.</li>
                <li><i class="ri-check-line"></i>Comunicado a las radios locales y LV27, así como al diario La Voz de San Justo.</li>
                <li><i class="ri-check-line"></i>Asistencia a familiares para los trámites requeridos.</li>
            </ul>
            <p>Con nuestro servicio, la familia no deberá abonar costos extras salvo casos de mejora de ataúdes y/o traslado a otro Cementerio. El servicio cubre cremación de restos únicamente si es informado al momento de solicitar la prestación.</p>
            <p>A la fecha se atiende un promedio de 50 servicios de sepelio anuales con un total de 1692 grupos familiares adheridos.</p>
            <p>Número de guardia:
                <br><i class="ri-phone-line"></i><strong> 3564-330362</strong>
            </p>
            <router-link to="/servicios-sociales" class="cta-button">
                Si todavía no te adheriste, ¡Hacelo ahora mismo!
            </router-link>
            <br>
            <a href="#" class="link-reglamento">Leer Reglamento Sepelio</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sepelio"
};
</script>

<style scoped>
.ss-container {
    padding: 20px;
    font-family: "Montserrat", sans-serif;
    line-height: 1.6;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-volver {
    padding: 10px 20px;
    background-color: #1f2c79;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-bottom: 20px;
}
.btn-volver i {
    margin-right: 10px; 
}
.btn-volver:hover {
    background-color: #0056b3;
}
.sepelio {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
}
.sepelio i{
    margin-right: 10px;
}
.sepelio h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1f2c79;
    border-left: 5px solid #0e1850;
    padding: 15px;
}

.sepelio p, .sepelio ul {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #333;
}

.sepelio h2 {
    font-size: 1.6rem;
    margin-top: 20px;
    color: #1f2c79;
}

.link-reglamento {
    display: inline-block;
    margin-top: 20px;
    color: #1f2c79;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
    font-size: 1.3rem;
}

.link-reglamento:hover {
    color: #0056b3;
}
ul {
    list-style-type: none;
    padding: 0;
    margin-left: 20px;
}

li {
    font-size: 18px;
    color: #333;
    line-height: 1.6;
    gap: 10px;
    margin: 12px 0;
}
.cta-button {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #ff9c00;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
    background-color: #e68900;
    transform: scale(1.05);
}

.cta-button:active {
    transform: scale(0.95);
}
</style>
