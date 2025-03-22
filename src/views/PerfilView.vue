<template>
    <div class="perfil-container">
        <div class="perfil">
            <div class="header">
                <div>
                    <h1 class="title">PERFIL DEL USUARIO</h1>
                <p>Este es el panel donde el el usuario registrado podra ver sus datos, reclamos o consultas, bajas y altas, 
                    entre otras funcionalidades.</p>
                </div>
                <button class="btn-logout" @click="logoutUser">Cerrar Sesión</button>
            </div>

            <div class="user-profile">
                <div class="profile-image" data-aos="fade-right">
                <img src="../assets/css/img/imagen-profile.png" alt="Foto de perfil">
                </div>

                <div class="user-info" data-aos="fade-left">
                <h2>Hola {{ getUser?.name }}</h2>
                <p><strong>Email:</strong> {{ getUser?.email }}</p>
                <p><strong>Teléfono:</strong> {{ getUser?.phone || 'No registrado' }}</p>
                <p><strong>Fecha de Nacimiento:</strong> {{ getUser?.age }}</p>
                <p><strong>Número de Titular:</strong> {{ getUser?.nroTitular }}</p>
                </div>

                <div class="btn-acciones" data-aos="fade-left">
                    <button class="btn-editar" @click="editarPerfil">Editar Perfil</button>
                    <button class="btn-consultar" @click="mostrarModal = true">Consultar/Asociar Número de Titular</button>
                    <div class="btn-cooponline">
                        <button class="btn-image" @click="redirigirCoopOnline">
                        <img src="https://www.cooponlineweb.com.ar/images/logoCoop.png" alt="CoopOnline Logo" class="btn-img"/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="reclamos-container">
                <h1 class="subtitle">Reclamos y Consultas:</h1>
                
                <div class="formularios" v-if="reclamos.length > 0">
                    <table class="reclamos-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Domicilio</th>
                                <th>Servicio</th>
                                <th>Descripción</th>
                                <th>Fecha Reclamo</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="reclamo in reclamos" :key="reclamo.id">
                                <td>{{ reclamo.nombre }}</td>
                                <td>{{ reclamo.telefono }}</td>
                                <td>{{ reclamo.direccion }}</td>
                                <td>{{ reclamo.servicio }}</td>
                                <td>{{ reclamo.descripcion }}</td>
                                <td>{{ reclamo.fechaReclamo }}</td>
                                <td>{{ reclamo.estado }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p class="no-reclamos-msg">No tienes reclamos registrados.</p>
                </div>
            </div>
            <div class="formularios-container">
                <h1 class="subtitle">Formularios de Alta/Baja:</h1>
                
                <div class="formularios" v-if="formularios.length > 0">
                    <table class="formularios-table">
                        <thead>
                            <tr>
                                <th>Tipo de Servicio</th>
                                <th>Acción</th>
                                <th>Fecha Solicitud</th>
                                <th>Domicilio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="formulario in formularios" :key="formulario.id">
                                <td>{{ formulario.servicio }}</td>
                                <td>{{ formulario.accion }}</td>
                                <td>{{ formulario.fechapedido }}</td>
                                <td>{{ formulario.domicilio }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div v-else>
                    <p class="no-formulario-msg">No tienes formularios registrados.</p>
                </div>
            </div>
      </div>
      <div v-if="mostrarModal" class="modal-overlay">
        <div class="modal">
            <h2>Consultar / Asociar Número de Titular</h2>
            <label for="nroTitular">Número de Titular</label>
            <input type="text" id="nroTitular" v-model="nroTitular" />

            <div v-if="titularEncontrado">
                <h3>Datos del Titular:</h3>
                <p><strong>Nombre Completo:</strong> {{ datosTitular.titular }}</p>
                <p><strong>DNI:</strong> {{ datosTitular.dniTitular }}</p>

            </div>
            <div class="titulares-btn">
                <button v-if="nroTitularValidado" class="btn-asociar" @click="asociarNroTitular">Asociar</button>
                <button class="btn-consulta" @click="consultarTitular">Consultar</button>
                <button class="btn-cerrar-titular" @click="mostrarModal = false">Cerrar</button>
            </div>
        </div>
    </div>
    <div v-if="mostrarModalContrasena" class="modal-overlay">
            <div class="modal">
                <h2>Edición del Perfil</h2>
                <label for="password">Contraseña Actual:</label>
                <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                />
                <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" v-model="updatedUser.name" placeholder="Nuevo Nombre"/>

                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="updatedUser.email" placeholder="Nuevo Email"/>

                        <label for="phone">Teléfono:</label>
                        <input type="text" id="phone" v-model="updatedUser.phone" placeholder="Nuevo Teléfono"/>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-confirmar" @click="confirmarEdicionPerfil"><i class="ri-save-3-line"></i></button>
                        <button class="btn-cerrar" @click="mostrarModalContrasena = false"><i class="ri-close-line"></i></button>
                    </div>
            </div>
        </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { mapGetters, mapActions } from "vuex";
import apiReclamos from "@/services/apiReclamos"; 
import apiForms from "@/services/apiForms";
import apiSS from "@/services/apiSS";
import apiUsers from '@/services/apiUsers';
export default {
    data() {
        return {
            reclamos: [],
            formularios: [],
            nroTitular: "",
            nroTitularValidado: false,
            mostrarModal: false,
            mostrarModalContrasena: false, 
            titularEncontrado: false,
            password: "",
            mensaje: "",
            datosTitular: {},
            updatedUser: {
                name: "",
                email: "",
                phone: "",
                nroTitular: "",
            },
        };
    },
    computed: {
        ...mapGetters("auth", ["isAuthenticated", "getUser"]),
    },
    methods: {
        ...mapActions("auth", ["logout"]),
        redirigirCoopOnline() {
            window.location.href = "https://www.cooponlineweb.com.ar/PORTENIA/Login";
        },
        async logoutUser() {
            await this.logout();
            this.$router.push("/login");
        },
        editarPerfil() {
            this.mostrarModal = false; 
            this.updatedUser = { 
                name: this.getUser.name,
                email: this.getUser.email,
                phone: this.getUser.phone,
            };
            this.mostrarModalContrasena = true;
        },
        async confirmarEdicionPerfil() {
            if (!this.password) {
                toast.error("Por favor ingresa tu contraseña.");
                return;
            }

            try {
                const response = await apiUsers.validarContrasena(this.getUser._id, this.password);
                if (response.success) {
                    const updatedData = { ...this.updatedUser };

                    const updateResponse = await apiUsers.updateUser(this.getUser._id, updatedData);
                    if (updateResponse.success) {
                        toast.success("Perfil actualizado correctamente.");
                        this.mostrarModalContraseña = false; 
                    } else {
                        toast.error(updateResponse.error || "Error al actualizar el perfil.");
                    }
                } else {
                    toast.error("Contraseña incorrecta.");
                }
            } catch (error) {
                toast.error("Hubo un error al verificar la contraseña.");
                console.error(error);
            }
        },
        async consultarTitular() {
            if (!this.nroTitular) {
                this.mensaje = "Debe ingresar un número de titular para la consulta.";
                toast.error(this.mensaje);
                return;
            }

            try {
                const resultado = await apiSS.obtenerAdherentes(this.nroTitular);

                console.log("Resultado API:", resultado);

                if (resultado.success && resultado.data.length > 0) {
                    this.nroTitular = `${this.nroTitular}`;
                    this.titularEncontrado = true;
                    this.mensaje = "";
                    this.datosTitular = resultado.data[0];
                    this.nroTitularValidado = true;
                } else {
                    this.mensaje = "Titular no encontrado. ¿Desea agregarlo?";
                    toast.info(this.mensaje);
                    this.titularEncontrado = false;
                    this.habilitarNuevo = true;
                }
            } catch (error) {
                console.error("Error al obtener los adherentes", error);
                this.mensaje = "Error al consultar el titular.";
                toast.error(this.mensaje);
            }
        },
        async asociarNroTitular() {
            try {
                const response = await apiUsers.asociarTitular(this.getUser._id, this.nroTitular);
                if (response.success) {
                    this.getUser.nroTitular = this.nroTitular; 
                    toast.success("Número de titular asociado correctamente.");
                } else {
                    toast.error("Error al asociar el número de titular.");
                }
            } catch (error) {
                toast.error("Error al asociar el número de titular.");
                console.log(error);
            }
        },
        async buscarReclamos() {
            if (this.getUser?.email) {
                try {
                    const response = await apiReclamos.buscarReclamos(this.getUser.email);
                    if (response && Array.isArray(response)) {
                        this.reclamos = response;
                    } else {
                        this.reclamos = [];
                    }
                } catch (error) {
                    console.error("Error al obtener reclamos:", error);
                    this.reclamos = [];
                }
            }
        },
        async buscarFormularios() {
            if (this.getUser?.email) {
                try {
                    const response = await apiForms.buscarForms(this.getUser.email);
                    if (response && Array.isArray(response)) {
                        this.formularios = response;
                    } else {
                        this.formularios = [];
                    }
                } catch (error) {
                    console.error("Error al obtener formularios:", error);
                    this.formularios = [];
                }
            }
        },
    },
    mounted() {
        this.buscarReclamos();
        this.buscarFormularios();
    }
};
</script>


<style scoped>
.modal-actions {
  display: flex;
  justify-content: space-between;
}
  
.modal-actions button {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #18385a;
  transition: ease 0.3s;
  padding: 10px;
}
  
.modal-actions button:hover {
  color: #3d8bdd;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal h2 { 
  background: #1a266b; 
  color: rgb(255, 255, 255);
  padding: 20px;
  margin: -20px -20px 20px -20px; 
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}

.modal input {
  text-align: left;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  margin-left: 5px;
}

.modal p {
  text-align: left;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  margin-left: 5px;
  margin-bottom: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.title {
    font-size: 2.5rem;
    padding: 30px;
    color: #ffffff;
    margin: 5px 10px 10px -10px; 
}
.header p { 
    color: #ffffff !important;
    margin: 20px ;
    width: 750px;
    margin-top: -40px;
}

.subtitle {
    font-size: 2.2rem;
    margin-bottom: 10px;
    color: #0e1850;
    padding: 15px;
    border-left: 5px solid #256da8;
    border-top: 5px solid #256da8;
    margin-top: 20px;
}

.btn-cooponline {
    display: flex;
    justify-content: center;
    margin-top: 10px; 
}

.btn-image {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
}

.btn-image img {
    width: 200px;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.btn-image img:hover {
    transform: scale(1.05); 
}
.user-profile {
  display: flex;
  align-items: center;
  background: rgb(231, 232, 233);
  padding:30px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-image {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #243385;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-right: 40px;
  margin-left: 20px;
}
.user-info {
  margin: 20px;
  width: 600px;
  height: 230px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-size: 30px;
  color: #1f2c79;
  margin: 5px;
  padding-left: 10px;
  text-align: left;
}

.user-info p {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
  gap: 10px;
  padding-left: 20px;
}

.btn-acciones {
  display: flex;
  flex-direction: column;
  gap: 20px;  
  margin-right: 50px; 
}
.btn-editar,
.btn-consultar {
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #10355c;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%; 
}

.btn-editar:hover {
  background-color: #007bff;
  transform: scale(1.05);
}

.btn-consultar:hover {
    background-color: #007bff;
    transform: scale(1.05);
}

.perfil-container {
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  line-height: 1.6;
  background: rgb(236, 231, 231);
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0e1850;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.btn-logout {
    padding: 15px;
    background-color: #c43f3f;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    border: none;
    font-size: 1.1rem;
    transition: background-color 0.3s;
    margin: 10px 25px 10px -10px; 
    cursor: pointer;
}
.btn-logout:hover {
    background-color: #ff2b2b;
}
.perfil {
    max-width: 1000px;
    margin: 0 auto;
    text-align: left;
}
.perfil p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: #333;
    gap: 10px;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.titulares-btn {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-top: 20px;
}
.btn-consulta, .btn-asociar, .btn-cerrar-titular {
    width:40%;
    padding: 12px;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-consulta {
    background-color: #0e1850;
    color: white;
}

.btn-consulta:hover {
    background-color: #053e74;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-asociar {
    background-color: #28a745;
    color: white;
}

.btn-asociar:hover {
    background-color: #218838;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-cerrar-titular {
    background-color: #dc3545;
    color: white;
}

.btn-cerrar-titularr:hover {
    background-color: #c82333;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.reclamos-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px;
    font-family: "Montserrat", sans-serif;
}

.reclamos-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reclamos-table th,
.reclamos-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.reclamos-table th {
    background-color: #256da8;
    color: #fff;
    font-weight: bold;
}
.reclamos-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.reclamos-table tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

.no-reclamos-msg {
    text-align: center;
    color: #ad2424;
    font-size: 1.2rem;
    margin-top: 20px;
    font-style: italic;
}
.formularios-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px;
    font-family: "Montserrat", sans-serif;
}

.formularios-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.formularios-table th,
.formularios-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.formularios-table th {
    background-color: #256da8;
    color: #fff;
    font-weight: bold;
}

.formularios-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.formularios-table tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

.no-formulario-msg {
    text-align: center;
    color: #7f8c8d;
    font-size: 1.2rem;
    margin-top: 20px;
    font-style: italic;
}
</style>
