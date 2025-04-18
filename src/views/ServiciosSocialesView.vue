<template>
<h1 class="title">Servicios Sociales</h1>
    <cardSS/>
    <h2 class="subtitle-left">Recomendaciones Generales:</h2>
    <br>
    <div class="servicios-sociales">
        <div class="ss-container">
            <p>
                Brindamos la posibilidad de que puedas proteger a tu familia mediante tres servicios esenciales: 
                <strong>Traslado Social</strong>, <strong>Banco de Sangre</strong> y <strong>Sepelio</strong>.
                Estos servicios están diseñados para ofrecerte tranquilidad y apoyo en situaciones críticas. 
                Con nuestra cobertura, tendrás acceso a un traslado programado cuando sea necesario, sangre segura 
                para tratamientos y emergencias, y una cobertura completa para servicios funerarios con atención personalizada.
            </p>
            <h3>¿Por qué son importantes estos servicios?</h3>
            <p>
                Estos servicios no solo aseguran la atención médica y asistencial que tu familia necesita, sino que también 
                proporcionan la paz mental de saber que estarás protegido en cualquier momento. Además, es crucial tenerlos 
                actualizados para que en el momento que más los necesites, puedas acceder a ellos rápidamente.
            </p>
            <h3>¿Cuándo actualizar los datos familiares?</h3>
            <p>Es muy importante mantener los datos de los miembros de tu familia siempre actualizados. Aquí te dejamos 
                algunas situaciones en las que debes realizar la actualización:</p>
            <ul>
                <li><i class="ri-check-line"></i> Ante un nacimiento.</li>
                <li><i class="ri-check-line"></i> Por defunción.</li>
                <li><i class="ri-check-line"></i> Cuando haya un cambio de domicilio de algún miembro.</li>
                <li><i class="ri-check-line"></i> En caso de estudiantes graduados.</li>
            </ul>
            <h2 class="subtitle">Actualización de Datos Familiares</h2>
            <p>
                Es fundamental que todos los miembros de tu familia estén protegidos, por lo que mantener actualizados sus datos 
                es un paso crucial. Asegúrate de que esta información esté al día para evitar inconvenientes en el futuro.
            </p>
        </div>
        <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
                <i class="ri-first-aid-kit-line"></i>
            </button>
            <div v-if="mostrarGuardia" class="guardia-popup">
                <p>Guardia Traslado Social: <strong>3564-593560</strong></p>
                <p>Guardia Sepelio: <strong>3564-330362</strong></p>
                <p>Banco de Sangre: <strong>3564-562394</strong></p>
            </div>
        <formServSociales/>
    </div>
</template>

<script>
import formServSociales from '@/components/FormServSociales.vue';
import cardSS from '@/components/csppl-info/SilderSS.vue';
export default {
    data() {
        return {
            mostrarGuardia: false
        }
    },
    components: {
        formServSociales,
        cardSS,
    }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
.servicios-sociales {
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding-right: 120px;
    padding-left: 120px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
.ss-container {
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0;
}
.title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.5rem;
    padding: 15px;
}
.subtitle-left{
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.4rem;
    padding: 15px;
    padding-right: 120px;
    padding-left: 120px;
}
.subtitle {
    color: #333;
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: 5px;
    margin-top: 20px;
}
h1{
    text-align: center;
}
h3 {
    font-size: 1.2rem;
    color: #333;
    margin-top: 10px;
}
.ss-container p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 20px;
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
i {
    color: #28a745;
}
.guardia-btn i {
    color: white;
}
.guardia-btn {
    position: fixed;
    bottom: 110px;
    right: 30px;
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
    bottom: 160px;
    right: 30px;
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    color: #0e1850;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
}
</style>
