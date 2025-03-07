<template>
    <h1 class="title">Telecomunicaciones</h1>
    <SliderTelecom/>
    <div class="telecomunicaciones">
        <br>
        <div class="telecom-container">
            <h2 class="subtitle">Servicio de Internet</h2>
            <p class="description">
                Brindamos los servicios de telefonía e Internet a las zonas urbanas y rurales de Porteña, Seeber y Colonia Vignaud, así como también a sectores rurales de otras comunidades.
            </p>
            <p class="stats">
                <strong>1759 usuarios de Internet</strong> y <strong>1778 usuarios de Telefonía Rural y Urbana</strong>.
            </p>
            <p class="description">
                A nivel mundial se han producido avances en las comunicaciones, lo que ha provocado un aumento exponencial en la demanda de servicio de Internet. Esta situación también se ha dado en nuestra región, por lo que desde hace años ponemos a disposición de nuestros asociados planes de conexión adecuados a sus necesidades y requerimientos.
            </p>
            <h3 class="section-title">Ventajas de contratar Fibra Óptica</h3>
            <div class="advantages-container">
                <div class="advantage-card">
                    <i class="ri-speed-line" style="font-size: 40px; color: #1f2c79;"></i>
                    <h4>Alta Velocidad</h4>
                    <p>Fibra óptica proporciona velocidades mucho más altas que las conexiones antiguas de cobre.</p>
                </div>
                <div class="advantage-card">
                    <i class="ri-bar-chart-line" style="font-size: 40px; color: #1f2c79;"></i>
                    <h4>Mayor Estabilidad</h4>
                    <p>Una conexión de fibra óptica es más estable, con menos interferencias y caídas de señal.</p>
                </div>
                <div class="advantage-card">
                    <i class="ri-tools-line" style="font-size: 40px; color: #1f2c79;"></i>
                    <h4>Instalación sin cargo</h4>
                    <p>La instalación es sin costo para el usuario que desee conectarse al servicio. </p>
                </div>
            </div>

            <h3 class="section-title">Conoce nuestros planes de Internet:</h3>
            <div class="plans-container">
                <div class="plan-card highlighted">
                    <span class="most-popular">El más pedido</span>
                    <h4>Plan 100MB</h4>
                    <p class="price">$19.999</p>
                    <button class="btn-lo-quiero">Lo quiero</button>
                </div>
                <div class="plan-card highlighted">
                    <h4>Plan 200MB</h4>
                    <p class="price">$29.999</p>
                    <button class="btn-lo-quiero">Lo quiero</button>
                </div>
                <div class="plan-card highlighted">
                    <h4>Plan 300MB</h4>
                    <p class="price">$49.999</p>
                    <button class="btn-lo-quiero">Lo quiero</button>
                </div>
            </div>
            <div class="plans-container-secondary">
                <div class="plan-card secondary">
                    <h4>Plan ADSL</h4>
                    <p class="price">$12.499</p>
                </div>
                <div class="plan-card secondary">
                    <h4>Plan Rural 5MB</h4>
                    <p class="price">$23.599</p>
                </div>
            </div>
            <h3 class="section-title">Requisitos para la instalación de Fibra Óptica</h3>
            <p class="description">La fibra óptica es la última tecnología de banda ancha que ofrece multitud de ventajas sobre las conexiones tradicionales de cobre. Sin embargo, su despliegue demanda una serie de requerimientos con los que debe contar el edificio donde se vaya a instalar.</p>
            <ul class="requirements-list">
                <li>Registro con el servicio de alimentación eléctrica de 220 Vca.</li>
                <li>Opción de registro con entrada de pipeta en techo para cable de fibra óptica.</li>
                <li>Opción de registro con entrada de pipeta en muro lateral para cable de fibra óptica.</li>
            </ul>
            <h4 class="section-subtitle">Condiciones:</h4>
            <ul class="conditions-list">
                <li>En todas las opciones el caño corrugado debe tener como mínimo 1 pulgada.</li>
                <li>Evitar curvas en el caño.</li>
                <li>No se puede compartir el caño con el servicio de electricidad.</li>
            </ul>
            <p class="description">Todo el equipamiento que instalamos en tu hogar se entrega en comodato. Esto significa que en caso de solicitar la baja del servicio, deberás devolverlo a la Cooperativa.</p>

            <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
                <i class="ri-wifi-line"></i>
            </button>
            <div v-if="mostrarGuardia" class="guardia-popup">
                <p>Número de Guardia: <strong>3564-630995</strong></p>
            </div>
        </div>
        <formSolicitud servicio="Internet o Telefonía" sugerencia="No"/>
    </div>
</template>

<script>
import formSolicitud from "@/components/FormAltaBaja.vue";
import SliderTelecom from "@/components/SliderTelecom.vue";
export default {
    data() {
        return {
            mostrarGuardia: false
        };
    },
    components: {
        formSolicitud,
        SliderTelecom
    }
};
</script>

<style scoped>
.fibra-optica-banner {
    background-image: url('https://www.programadesconecta.com/wp-content/uploads/2021/07/Post-Family-Watch.jpg');
    background-size: cover;
    background-position: center;
    padding: 60px 20px;
    color: white;
    font-weight: bold;
}

.banner-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.banner-subtitle {
    font-size: 1.8rem;
}

.banner-text {
    font-size: 1.2rem;
}
.telecomunicaciones {
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding-right: 120px;
    padding-left: 120px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
.telecom-container {
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
}
.telecom-container button {
    font-family: "Montserrat", sans-serif;
}
.title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.5rem;
    padding: 15px;
}
h1, h2 {
    text-align: center;
    
}
p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    font-size: 18px;
    color: #333;
    line-height: 1.6;
    gap: 10px;
    margin: 12px;
}
.subtitle {
    color: #333;
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
}
.section-title {
    color: #2848ff;
    font-size: 1.5rem;
    margin-top: 20px;
    text-align: center;
}
.service-list, .requirements-list, .conditions-list {
    list-style: none;
    padding: 0;
}
.plans-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px 0;
}
.plans-container-secondary {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px 0;
}
.plan-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 300px;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid transparent;
    position: relative;
}

.plan-card.highlighted {
    border-color: #2848ff;
    font-size: 22px;
    font-weight: bold;
    color: #2848ff;
    box-shadow: 0 8px 20px rgba(40, 72, 255, 0.2);
    background-color: #f0f5ff;
}

.plan-card.secondary {
    border-color: #ddd;
    color: #333;
    font-size: 18px;
}
.most-popular {
    background-color: #ff9800;
    color: white;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
}
.plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.guardia-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #2848ff;
    color: white;
    padding: 12px 18px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    z-index: 1000;
}
.guardia-btn:hover {
    background-color: #0e1850;
}

.guardia-popup {
    position: fixed;
    bottom: 70px;
    right: 20px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    color: #0e1850;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
}
.btn-lo-quiero {
    background-color: #2848ff;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
}
.btn-lo-quiero:hover {
    background-color: #1a36d1;
}
.advantages-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px;
}

.advantage-card {
    background-color: #fff;
    border: 2px solid #0e1850;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 400px;
}

.advantage-card h4 {
    color: #1a36d1;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.advantage-card p {
    color: #333;
}

.section-title {
    text-align: center;
    color: #2848ff;
    font-size: 1.8rem;
    margin-bottom: 30px;
}
</style>
