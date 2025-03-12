<template>
    <div class="ss-container">
        <div class="traslado">
            <div class="header">
                <h1>Traslado Social</h1>
                <router-link to="/servicios-sociales" class="btn-volver">
                    <i class="ri-arrow-left-line"></i> Volver a Servicios Sociales
                </router-link>
            </div>
            <p>
                Este Servicio implica el traslado programado de pacientes que,
                por su situación de salud, no pueden movilizarse de otro modo. 
                <strong>Posee un radio de cobertura de 350 kilómetros</strong> 
                y <strong>no incluye acompañamiento profesional</strong>. 
                Contamos con tres unidades de baja complejidad y equipamiento establecido por normativa. 
            </p>
            <p><i class="ri-check-line"></i><strong> Existen 1664 grupos familiares adheridos.</strong></p>
            <p>
                Pueden hacer uso de este servicio tanto el asociado como su grupo familiar y aquellas personas que se encuentren a cargo del asociado y convivan en la misma vivienda.
            </p>
            <p>
                Este servicio también está disponible para aquellas personas no asociadas a la Cooperativa de Servicios Públicos de Porteña Ltda. Para estos casos el costo será calculado en base al precio del combustible y de los kilómetros recorridos.
            </p>
            <router-link to="/servicios-sociales" class="cta-button">
                Si todavía no te adheriste, ¡Hacelo ahora mismo!
            </router-link>
            <h2>¿Cómo actuar en caso de requerir el servicio?</h2>
            <p>
                Para solicitar el servicio, el asociado deberá comunicarse con un profesional médico, 
                quien determinará si la situación requiere el traslado en una unidad del mencionado servicio.
                Para solicitar el mismo, se deberá contar con la solicitud médica del traslado que establece el motivo y el destino (requisito excluyente) 
                para luego comunicarse con la guardia del servicio y coordinar el traslado.
            </p>
            <p>Números de guardia:
                <br><i class="ri-phone-line"></i><strong> 3564-593559</strong> 
                <br><i class="ri-phone-line"></i><strong> 3564-593560</strong> 
            </p>
            <p>
                Frente a una emergencia deberán recurrir al Centro de Salud Municipal, al Servicio de Atención domiciliaria, si fuese afiliado, o al profesional médico de confianza. En tanto, ante accidentes, comunicarse con Bomberos o Policía.
            </p>
            <p>
                <strong>ACLARACIÓN:</strong> el Traslado Social no es servicio de urgencia. En caso de tener una emergencia el asociado debe dirigirse al Dispensario Municipal, donde el profesional que se encuentre a cargo indicará los pasos a seguir.
            </p>
            <a href="#" class="link-reglamento">Leer Reglamento del Traslado Social</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "TrasladoSocial"
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
.btn-volver i{
    margin-right: 10px;
}
.btn-volver:hover {
    background-color: #0056b3;
}
.traslado {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
}

.traslado h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1f2c79;
    border-left: 5px solid #0e1850;
    padding: 15px;
}

.traslado p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #333;
    gap: 10px;
}

.traslado h2 {
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
