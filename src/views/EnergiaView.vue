<template>
    <h1 class="title">Energía Eléctrica</h1>
    <br>
    <div class="energia">
        <div class="energia-container">
            <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
                <i class="ri-flashlight-line"></i>
            </button>

            <div v-if="mostrarGuardia" class="guardia-popup">
                <p>Número de Guardia: <strong>3564-593558</strong></p>
            </div>
            <p>
                Desde <strong>1935</strong> ofrecemos el servicio de <strong>energía eléctrica</strong> tanto en la zona
                urbana como rural de Porteña, en sus modalidades <strong>monofásica y trifásica</strong>, con líneas
                de media y baja tensión.
            </p>
            <p>
                En la actualidad, proveemos servicio a <strong>casi 3000 usuarios</strong> entre ambos sectores.
            </p>
            <p>
                Nuestro objetivo es brindar un servicio <strong>eficiente</strong>, por lo que trabajamos en el
                mantenimiento preventivo de las líneas a través de estudios de <strong>termografía</strong> y
                tareas de relevamiento, con la mirada puesta en la <strong>mejora continua del servicio</strong>.
            </p>
            <br>
            <h3>Recomendaciones del servicio:</h3>
            <ul>
                <li><i class="ri-checkbox-circle-line icono-li"></i> Mantener los dispositivos eléctricos en buen estado.</li>
                <li><i class="ri-checkbox-circle-line icono-li"></i> No sobrecargar enchufes con múltiples conexiones.</li>
                <li><i class="ri-checkbox-circle-line icono-li"></i> Realizar mantenimiento periódico en instalaciones eléctricas.</li>
                <li><i class="ri-checkbox-circle-line icono-li"></i> Evitar el contacto con cables de alta tensión.</li>
            </ul>
            <button @click="openFileConexion" class="pilar-btn">
                Ver Pilar de Conexión de Energía
            </button>
        </div>
        <div class="dropdown-containers">
            <div class="dropdown" @mouseenter="mostrarMonofasica = true" @mouseleave="mostrarMonofasica = false">
            <button class="dropdown-btn">
            ¿Qué es una conexión monofásica?
            <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarMonofasica}"></i>
            </button>
            <div class="dropdown-content" v-show="mostrarMonofasica">
            <p>ejemplo</p>
            </div>
        </div>
        <div class="dropdown" @mouseenter="mostrarTrifasica = true" @mouseleave="mostrarTrifasica = false">
            <button class="dropdown-btn">
            ¿Qué es una conexión trifásica?
            <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarTrifasica}"></i>
            </button>
            <div class="dropdown-content" v-show="mostrarTrifasica">
            <p>ejemplo</p>
            </div>
        </div>
        <div class="dropdown" @mouseenter="mostrarConvencional = true" @mouseleave="mostrarConvencional = false">
            <button class="dropdown-btn">
            ¿Cómo funciona un medidor convencional?
            <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarConvencional}"></i>
            </button>
            <div class="dropdown-content" v-show="mostrarConvencional">
            <p>ejemplo</p>
            </div>
        </div>
        <div class="dropdown" @mouseenter="mostrarPrepago = true" @mouseleave="mostrarPrepago = false">
            <button class="dropdown-btn">
                ¿Cómo funciona un medidor PrePago?
                <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarPrepago}"></i>
            </button>
            <div class="dropdown-content" v-show="mostrarPrepago">
                <p>ejemplo</p>
            </div>
        </div>
        </div>
        <div class="alumbrado-container">
            <h2>Alumbrado Público:</h2>
            <p>
                Como concesionarios del servicio, nuestra tarea consiste en realizar el mantenimiento de las luminarias y de las líneas en general. 
                A través de los sucesivos convenios de obras, firmados con la Municipalidad de Porteña y del titular del servicio, se fue extendiendo la red de Alumbrado Público en la localidad.
            </p> 
            <p>
                Las últimas de mayor envergadura fueron las obras realizadas en los accesos a Porteña, al <strong>norte y sur de la localidad</strong>.
            </p>
            <button @click="openFile" class="open-btn">
                Plano de alumbrado público de Porteña
            </button>
        </div>
        <br>
        <formSolicitud servicio="Energía Eléctrica" sugerencia="si" adjuntar="si"/>
    </div>
</template>

<script>
import formSolicitud from '@/components/FormAltaBaja.vue';
export default {
  data() {
    return {
        mostrarMonofasica: false,
        mostrarTrifasica: false,
        mostrarConvencional: false,
        mostrarPrepago: false, 
        mostrarRecomendaciones: false,
        mostrarGuardia: false,
    }
    },
    components: {
        formSolicitud
    },
    methods: {
    openFile() {
        window.open('https://drive.google.com/file/d/1Z_CNblHOwevuUTgvbDg5x_uEqPU5kcXs/view?usp=sharing','_blank')
    },
    openFileConexion() {
        window.open("https://drive.google.com/file/d/1bIjgvIGfppayBMaIj2m5VDutKkJGqcqE/view?usp=sharing", "_blank");
    }
  }
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.energia {
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding-right: 120px;
    padding-left: 120px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
.energia button {
    font-family:"Montserrat", sans-serif;
}
.title {
    color: #ffffff;
    background-color: #1f2c79;
    font-size: 2.5rem;
    padding: 15px;
}
.energia-container {
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    border-left: 5px solid #0e1850;
}

h1, h2 {
    text-align: center;
    color: #2c3e50;
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
.dropdown-containers {
    display: flex;
    gap: 15px;
}
.dropdown {
    margin: 20px auto;
    width: 50%;
    text-align: center;
}

.dropdown-btn {
    background-color: #0e1850;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
    transition: 0.3s;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dropdown-btn:hover {
    background-color: #3974ac;
}

.dropdown-content {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 5px;
}

.dropdown-arrow {
    transition: transform 0.3s;
}

.rotate-arrow {
    transform: rotate(180deg);
}
.alumbrado-container {
    margin-top: 20px;
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    border-left: 5px solid #0e1850;
}

.alumbrado-container h2 {
    color: #2c3e50;
}

.alumbrado-container p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
}
.open-btn {
    margin-top: 15px;
    padding: 10px 15px;
    background-color: #0e1850;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 5px;
}

.open-btn:hover {
    background-color: #3974ac;
}
.pilar-btn {
    margin-top: 15px;
    background-color: #0e1850;
    color: white;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
}

.pilar-btn:hover {
    background-color: #3974ac;
}
.recomendaciones-container {
    margin-top: 20px;
    padding: 15px;
    background-color: rgba(244, 244, 244, 0.9); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
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

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
