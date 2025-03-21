<template>
    <div class="ss-container">
        <div class="banco">
            <div class="header">
                <h1>Banco de Sangre</h1>
                <router-link to="/servicios-sociales" class="btn-volver">
                    <i class="ri-arrow-left-line"></i> Volver a Servicios Sociales
                </router-link>
            </div>
            <p>
                Desde 2010 nos encontramos asociados al Banco de Sangre de la Cooperativa de Provisión y Servicios Públicos de Freyre, 
                lo cual nos permite prestar cobertura de este servicio a 
                <strong>1652 grupos familiares adheridos voluntariamente</strong>.
            </p>
            <p>
                El objetivo del Banco Solidario de Dadores Voluntarios de Sangre es racionalizar la utilización terapéutica de la sangre humana,
                evitar la intermediación lucrativa y promover la donación solidaria y voluntaria de sangre entre sus adherentes; así como también, 
                garantizar la calidad exigida para el mantenimiento de la salud y asegurar un efectivo servicio de urgencias.
            </p>
            <h2 class="subtitle">¿Quienes pueden ser beneficiarios de este servicio?</h2>
            <p>
                Pueden ser beneficiarios los socios de la Cooperativa de Servicios Públicos de Porteña Ltda y su grupo familiar. 
                Por tal motivo es fundamental que se mantengan los datos familiares actualizados.
            </p>
            <p>
                Para adherir al servicio cada familia deberá aportar un dador de entre 18 y 65 años, varón o mujer, que será sometido a pruebas serológicas e inmunohematológicas exigidas por la OMS,
                con el asesoramiento del Instituto de Hematología y Hemoterapia de la UNC, 
                para la detección de infecciones tales como hepatitis B y C, chagas, sífilis, sida y brucelosis.
            </p>
            <router-link to="/servicios-sociales" class="cta-button">
                Si todavía no te adheriste, ¡Hacelo ahora mismo!
            </router-link>
            
            <h2 class="subtitle">Nuestro banco de sangre</h2>
            <p>
                El Banco de Sangre al que adherimos cuenta con el aval del Instituto Nacional de Acción Cooperativa y Mutuales
                (INAC y M) y pone a disposición de los asociados una excelente infraestructura
                y moderno equipamiento técnico adecuado a las exigencias de la Organización Mundial de la Salud (OMS) y la Ley Nacional y Provincial de Sangre.
            </p>
            <p>
                Además, se encuentra adherido al Sistema Provincial de Seguro de Sangre Cooperativo que garantiza a los beneficiarios el acceso a la provisión de sangre y derivados, en cualquier lugar donde exista un banco de sangre cooperativo adherido.
            </p>
            <p>Números telefónicos para comunicarse:
                <br><i class="ri-phone-line"></i> Guardia: <strong>3564-562394 </strong>
                <br><i class="ri-phone-line"></i> Administración: <strong>3564-331499 </strong>
            </p>
            <div class="dropdown-container">
                <div class="dropdown-wrapper">
                    <button class="dropdown-btn" @click.stop="mostrarFormulario = !mostrarFormulario">
                        Quiero ser Voluntario
                        <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarFormulario}"></i>
                    </button>
                    <div class="dropdown-content" v-show="mostrarFormulario">
                        <div class="form-container" @click.stop>
                            <form @submit.prevent="guardarDatos">
                                <h2>Formulario de Registro</h2>
                                <label>Nombre Completo:</label>
                                <input v-model="nombre" type="text">

                                <label>DNI:</label>
                                <input v-model="dni" type="number">

                                <label>Edad:</label>
                                <input v-model="edad" type="number">

                                <label>Telefono:</label>
                                <input v-model="telefono" type="number">

                                <label>Grupo Sanguíneo:</label>
                                <select v-model="grupoSanguineo">
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>

                                <label>¿Presenta alguna enfermedad?</label>
                                <select v-model="tieneEnfermedad">
                                    <option value="no">No</option>
                                    <option value="si">Sí</option>
                                </select>

                                <div v-if="tieneEnfermedad === 'si'">
                                    <label>Ingrese la enfermedad:</label>
                                    <input v-model="nombreEnfermedad" type="text" required>
                                </div>

                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="dropdown-wrapper">
                    <button class="dropdown-btn" @click.stop="mostrarRequisitos = !mostrarRequisitos">
                        Requisitos para ser Voluntario
                        <i class="ri-arrow-down-s-line dropdown-arrow" :class="{'rotate-arrow': mostrarRequisitos}"></i>
                    </button>
                    <div class="dropdown-content" v-show="mostrarRequisitos">
                        <div class="requisitos-container" @click.stop>
                            <p>Para ser voluntario necesitas cumplir con los siguientes requisitos minimos:</p>
                            <ul>
                                <li><i class="ri-drop-line"></i> Ser mayor de 18 años.</li>
                                <li><i class="ri-drop-line"></i> Gozar de buena salud.</li>
                                <li><i class="ri-drop-line"></i> No tener antecedentes de enfermedades infecciosas.</li>
                            </ul>
                            <p style="margin-top: 10px;">Ante cualquier duda, comunicarse al <strong>3564-562394</strong>.</p>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" class="link-reglamento">Leer Reglamento del Banco de Sangre</a>
        </div>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiDonantes from '@/services/apiDonantes';

export default {
    name: "BancoDeSangre",
    data() {
        return {
            nombre: "",
            dni: "",
            edad: "",
            telefono: "",
            grupoSanguineo: "",
            tieneEnfermedad: "no",
            nombreEnfermedad: "",
            mostrarFormulario: false,
            mostrarRequisitos: false,
            registros: [],
        };
    },
    methods: {
        async guardarDatos() {
            if (!this.nombre || !this.dni || !this.edad || !this.telefono || !this.grupoSanguineo) {
                toast.error("Todos los campos son obligatorios.");
                return;
            }

            if (this.tieneEnfermedad === "si" && !this.nombreEnfermedad) {
                toast.error("Debe ingresar el nombre de la enfermedad.");
                return;
            }

            const nuevoDonante = {
                nombre: this.nombre,
                dni: this.dni,
                edad: this.edad,
                telefono: this.telefono,
                grupoSanguineo: this.grupoSanguineo,
                tieneEnfermedad: this.tieneEnfermedad === "si",
                nombreEnfermedad: this.tieneEnfermedad === "si" ? this.nombreEnfermedad : null
            };

            try {

                await apiDonantes.agregarDonante(nuevoDonante); 
                toast.success("Datos enviados correctamente.");
            } catch (error) {
                toast.error("Hubo un error al enviar los datos.");
            }

            this.nombre = "";
            this.dni = "";
            this.edad = "";
            this.telefono = "";
            this.grupoSanguineo = "";
            this.tieneEnfermedad = "no";
            this.nombreEnfermedad = "";
        }
    }
};
</script>

<style scoped>
.form-container {
  margin: 10px;
  padding: 30px;
}
.requisitos-container {
  margin: 10px;
  padding: 10px;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #1f2c79;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}
button:hover {
  background-color: #3148c5;
}
input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}
ul {
  padding: 0;
  list-style: none;
  margin-top: 10px;
}
li {
  font-size: 15px;
  margin-top: 5px;
  margin-left: 10px;
}
.requisitos-container i {
    margin-right: 5px;
    color: #213ac9;
}
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
.banco {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
}

.banco h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1f2c79;
    border-left: 5px solid #0e1850;
    padding: 15px;
}

.banco p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #333;
    gap: 10px;
}

.subtitle {
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
.dropdown-container {
    display: flex;
    justify-content: space-between;
    gap:10px; 
}

.dropdown-wrapper {
    flex: 1;
}

.dropdown-btn {
    background-color: #0e1850;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1.2rem;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s;
}

.dropdown-btn:hover {
    background-color: #196dbd;
}

.dropdown-content {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    margin-top: 5px;
    padding: 0px;
    font-size: 0.9rem;
}

.dropdown-arrow {
    transition: transform 0.3s;
}

.rotate-arrow {
    transform: rotate(180deg);
}
</style>
