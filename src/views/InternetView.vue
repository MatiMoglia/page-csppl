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

            <h2 class="section-title">¡Conoce nuestros planes!</h2>
            <div class="plans-container" data-aos="flip-right">
                <div class="plan-card highlighted">
                    <span class="most-popular">El más pedido</span>
                    <div class="img-container">
                        <img src="@/assets/css/img/logo-transp.png" alt="imagen 100MB">
                    </div>
                    <h4>Plan 100MB</h4>
                    <p class="price">$19.999</p>
                    <button class="btn-lo-quiero" @click="scrollToFormulario">Lo quiero</button>
                </div>
                <div class="plan-card highlighted">
                    <div class="img-container">
                        <img src="@/assets/css/img/logo-transp.png" alt="imagen 100MB">
                    </div>
                    <h4>Plan 200MB</h4>
                    <p class="price">$29.999</p>
                    <button class="btn-lo-quiero" @click="scrollToFormulario">Lo quiero</button>
                </div>
                <div class="plan-card highlighted">
                    <div class="img-container">
                        <img src="@/assets/css/img/logo-transp.png" alt="imagen 100MB">
                    </div>
                    <h4>Plan 300MB</h4>
                    <p class="price">$49.999</p>
                    <button class="btn-lo-quiero" @click="scrollToFormulario">Lo quiero</button>
                </div>
            </div>
            
            <h3 class="section-title">Ventajas de contratar Fibra Óptica</h3>
            <CardCarousel data-aos="fade-up"/>
            <h3 class="section-title" style="text-align: left; margin-bottom: 10px; border: none;">Requisitos y Condiciones:</h3>
            <p class="description">La fibra óptica es la última tecnología de banda ancha que ofrece multitud de ventajas sobre las conexiones tradicionales de cobre.
                 Sin embargo, su despliegue demanda una serie de requerimientos con los que debe contar el edificio donde se vaya a instalar.</p>
                 <div class="dropdown-containers">
                <div class="dropdown" @mouseenter="mostrarRequisitos = true" @mouseleave="mostrarRequisitos = false">
                    <button class="dropdown-btn">
                        Requisitos para la instalación de Fibra Óptica
                        <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarRequisitos}"></i>
                    </button>
                    <div class="dropdown-content" v-show="mostrarRequisitos">
                        <ul class="requirements-list">
                            <li>
                                <i class="ri-checkbox-circle-line"></i>
                                <strong>1. </strong>Registro con el servicio de alimentación eléctrica de 220 Vca.
                            </li>
                            <li>
                                <i class="ri-checkbox-circle-line"></i>
                                <strong>2. </strong>Opción de registro con entrada de pipeta en techo para cable de fibra óptica.
                            </li>
                            <li>
                                <i class="ri-checkbox-circle-line"></i>
                                <strong>3. </strong>Opción de registro con entrada de pipeta en muro lateral para cable de fibra óptica.
                            </li>
                        </ul>
                        <div class="image-container">
                            <img src="https://www.coopspportena.com.ar/sites/default/files/Imagen%20nota%20Requisitos%20para%20instalacion%20de%20fibra%20optica.png" 
                                alt="Requisitos para instalación de fibra óptica"
                                class="installation-image">
                        </div>
                    </div>
                </div>
                <div class="dropdown" @mouseenter="mostrarCondiciones = true" @mouseleave="mostrarCondiciones = false">
                    <button class="dropdown-btn">
                        Condiciones del caño
                        <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarCondiciones}"></i>
                    </button>
                    <div class="dropdown-content" v-show="mostrarCondiciones">
                        <ul class="conditions-list">
                            <li>
                                <i class="ri-arrow-right-s-line"></i>
                                En todas las opciones el caño corrugado debe tener como mínimo 1 pulgada.
                            </li>
                            <li>
                                <i class="ri-arrow-right-s-line"></i>
                                Evitar curvas en el caño.
                            </li>
                            <li>
                                <i class="ri-arrow-right-s-line"></i>
                                No se puede compartir el caño con el servicio de electricidad.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p class="description"><strong style="color:red">Importante: </strong>Todo el equipamiento que instalamos en tu hogar se entrega en <strong>comodato</strong>. Esto significa que en caso de solicitar la baja del servicio, deberás devolverlo a la Cooperativa.</p>
            <h3 class="section-title">Servicio de Cobre y Rural</h3>
            <p class="description">Las conexiones de Cobre y Rurales siguen estando vigentes, prestando el servicio a cientos de ususarios.
                Ademas, todavia seguimos realizando conexiones de Internet en las localidades de Seeber y Vignaud, ademas en la zona rural unicamente de Porteña. <br> 
                Si deseas que tu hogar sea conectado a Internet, puedes contactarte con nosotros para que te pasemos los requisitos de la instalación y en caso de ser en zona rural, la disponibilidad para realizar la nueva conexión.
                <br>
                <a href="mailto:admcsppl@gmail.com" class="contact-link">Contáctanos ahora</a>
            </p>
            <p class="description">Tambien puede contactarse con Administración al siguiente número: <strong>3564331499</strong></p>
            <div class="plans-container-secondary" data-aos="fade-up">
                <div class="plan-card secondary">
                   <div class="plan-banner">Solo Seeber y Vignaud</div>
                    <h4>Plan ADSL</h4>
                    <h3>4 MB de Internet</h3>
                    <p class="price">$12.499</p>
                    <button class="btn-solicitar" @click="scrollToFormulario">Solicitar</button>
                    <button class="btn-consultar" @click="redirigirWhatsApp()">
                        <i class="ri-phone-line"></i> Consultar
                    </button>
                </div>
                <div class="plan-card secondary">
                    <div class="plan-banner">Solo Zona Rural Porteña</div>
                    <h4>Plan Rural</h4>
                    <h3>5 MB de Internet</h3>
                    <p class="price">$23.599</p>
                    <button class="btn-solicitar" @click="scrollToFormulario">Solicitar</button>
                    <button class="btn-consultar" @click="redirigirWhatsApp()">
                        <i class="ri-phone-line"></i> Consultar
                    </button>
                </div>
            </div>
            <button class="guardia-btn" @click="mostrarGuardia = !mostrarGuardia">
                <i class="ri-wifi-line"></i>
            </button>
            <div v-if="mostrarGuardia" class="guardia-popup">
                <p>Número de Guardia: <strong>3564-630995</strong></p>
            </div>
        </div>
        <formSolicitud data-aos="fade-up" servicio="Internet" sugerencia="No" mostrarOpcionesInternet="si"  id="formulario" adjuntar="no"></formSolicitud>
    </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import formSolicitud from "@/components/FormAltaBaja.vue";
import SliderTelecom from "@/components/SliderTelecom.vue";
import CardCarousel from "@/components/VentajasFibra.vue";
export default {
    data() {
        return {
            mostrarGuardia: false,
            mostrarRequisitos: false,
            mostrarCondiciones: false
        };
    },
    components: {
        formSolicitud,
        SliderTelecom,
        CardCarousel
    },
    methods: {
        scrollToFormulario() {
            const formulario = document.querySelector(".form-section");
            if (formulario) {
                formulario.scrollIntoView({ behavior: "smooth" });
            }
        },
        redirigirWhatsApp() {
        const numero = "5493564331499";
        const mensaje = "Quiero consultar sobre el servicio de Internet Cobre/Rural";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
      }
    },
    mounted() {
        AOS.init();
    },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.img-container img {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
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
h4 {
    color: #2848ff;
    font-size: 1.8rem;
    margin-bottom: 10px;
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
    background: #0e1850; 
    color: rgb(255, 255, 255);
    padding: 20px;
    margin: -20px -20px 20px -20px; 
    border-top-left-radius: 10px;
     border-top-right-radius: 10px;
     font-size: 2rem;
}
.section-title {
    text-align: center;
    color: #0e1850;
    font-size: 1.8rem;
    margin-bottom: 30px;
    margin-top: 20px;
    border-left: 3px solid #0e1850;
    border-right: 3px solid #0e1850;
}
.service-list, .requirements-list, .conditions-list {
    list-style: none;
    padding: 0;
    text-align: left;
    margin-bottom: 10px;
}
.requirements-list i, .conditions-list i {
    margin-right: 5px;
    color: #4CAF50; 

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
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
}
.plan-card.secondary {
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 20px;
    width: 100%;
    max-width: 320px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
}

.plan-card.secondary:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.plan-card h4{
    margin-top: 30px;
}

.plan-banner {
    background-color: #224ab9;
    color: white;
    padding: 8px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    text-align: center;
}
.price {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
    margin-bottom: 20px;
}

.btn-solicitar {
    background-color: #0e1850;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    font-weight: bold;
}

.btn-solicitar:hover {
    background-color: #2848ff;
}
.btn-consultar {
    background-color: #3eac34;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    margin-top: 20px;
    gap: 10px;
}

.btn-consultar:hover {
    background-color: #2a8a21;
}
.btn-consultar i {
    font-size: 15px; 
}
.plan-card {
    background: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid transparent;
    position: relative;
}

.plan-card.highlighted {
    border-color: #0e1850;
    font-size: 22px;
    font-weight: bold;
    color: #2848ff;
    box-shadow: 0 8px 20px rgba(40, 72, 255, 0.2);
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
.btn-lo-quiero {
    background-color: #0e1850;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}
.btn-lo-quiero:hover {
    background-color: #2848ff;
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
    border-radius: 5px;
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
.image-container {
    text-align: center;
    margin: 20px 0;
}

.installation-image {
    max-width: 80%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.plan-card img {
    width: 100px;
    height: auto;
}

@media screen and (max-width: 1024px) {
    .telecomunicaciones {
        padding: 20px;
    }
    .telecom-container {
        flex-direction: column;
        align-items: center;
    }
    .dropdown {
        width: 90%;
    }
    .dropdown-containers {
        flex-direction: column;
        align-items: center;
    }
    .plan-card {
        width: 250px;
        padding: 12px;
    }
    .plan-card img {
         width: 80px;
    }
    .most-popular {
        font-size: 12px;
    }
    .plan-banner{
        height: 45px;
        font-size: 12px;
    }
}
@media screen and (max-width: 480px)  {
    .title {
        font-size: 1.8rem;
        padding: 10px;
    }
    .telecomunicaciones {
        padding: 10px;
    }
    .telecom-container p {
        font-size: 16px;
    }
    .dropdown-btn {
        font-size: 16px;
        padding: 8px 12px;
    }
    .plan-card {
        width: 150px;
        padding: 10px;
    }
    .plan-card img {
        width: 70px;
    }
    .most-popular {
        font-size: 12px;
    }
    .plan-banner{
        height: 45px;
        font-size: 12px;
    }
}
</style>
