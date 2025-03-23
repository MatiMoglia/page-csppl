<template>
  <div class="form-container">
      <div class="header" data-aos="fade-up">
          <h1 class="title">Factura Digital</h1>
          <p>La factura digital es el <strong>NUEVO</strong> método de envío de las facturas. Las mismas se envían a un correo electrónico
              para luego descargarlas o pagarlas mediante los diferentes medios de pago digitales.
          </p>
      </div>
      <div class="img-container" data-aos="flip-right" >
        <img :src="require('@/assets/css/img/factura.jpg')" alt="Factura Digital">
      </div>
      <div class="form-section" data-aos="fade-up" data-aos-delay="200">
          <h3>Ingresa tus datos para recibir las facturas de los servicios:</h3>
          <form @submit.prevent="enviarFormulario">

              <label for="nombre">Nombre y Apellido: *</label>
              <input type="text" id="nombre" v-model="formFactura.nombre" required />

              <label for="direccion">Dirección: *</label>
              <input type="text" id="direccion" v-model="formFactura.direccion" required />

              <label for="email">Email: *</label>
              <input type="email" id="email" v-model="formFactura.email" required />

              <label for="nroTitular">Titular NRO: *</label>
              <input type="text" id="nroTitular" v-model="formFactura.nroTitular" required />

              <label>Selecciona el Servicio *</label>
              <div class="checkbox-group">
                  <label>
                      <input type="checkbox" value="Servicios Sociales" v-model="formFactura.servicios" class="checkbox-item">
                      Servicios Sociales
                  </label>
                  <label>
                      <input type="checkbox" value="Telecomunicaciones" v-model="formFactura.servicios" class="checkbox-item">
                      Telecomunicaciones
                  </label>
                  <label>
                      <input type="checkbox" value="Energía Eléctrica" v-model="formFactura.servicios" class="checkbox-item">
                      Energía Eléctrica
                  </label>
                  <label>
                      <input type="checkbox" value="Agua Potable" v-model="formFactura.servicios" class="checkbox-item">
                      Agua Potable
                  </label>
              </div>

              <button type="submit">Enviar</button>
          </form>
      </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiFacturas from '@/services/apiFacturas';
import { mapGetters } from 'vuex';
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
      return {
          formFactura: {
              nombre: '',
              direccion: '',
              email: '',
              servicios: [],
              nroTitular: '', 
          },
      };
  },
  computed: {
      ...mapGetters("auth", ["isAuthenticated", "getUser"]),
  },
  methods: {
      emailAutocompletado() {
        return this.isAuthenticated && this.getUser ? this.getUser.email : '';
      },
      async enviarFormulario() {

        if (this.formFactura.nombre === "") {
            toast.error("Ingrese el nombre completo.");
            return;
        } else if (this.formFactura.servicios.length === 0) {
            toast.error("Seleccione al menos un servicio.");
            return;
        } else if (!this.isValidEmail(this.formFactura.email)) {
            toast.error("El correo electrónico no es válido.");
            return;
        } else if (this.formFactura.direccion === "") {
            toast.error("Ingrese su dirección.");
            return;
        }

        try {
            const response = await apiFacturas.enviarFormulario(this.formFactura);
            console.log("Respuesta de la API:", response);

            if (response.success && response.data && response.data._id) {
                toast.success("Solicitud enviada con éxito");
                this.resetForm();
            } else {
                toast.error("Error al enviar la Solicitud. Respuesta inesperada.");
                console.log("Respuesta de la API:", response);
            }
        } catch (error) {
            console.error("Error al enviar la Solicitud:", error);
            toast.error("Error al conectar con el servidor.");
        }
      },

      isValidEmail(email) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailRegex.test(email);
      },

      resetForm() {
          this.formFactura = {
              nombre: '',
              direccion: '',
              email: '',
              servicios: [], 
          };
      }
  },
  mounted() {
    if (this.isAuthenticated) {
        this.formFactura.email = this.getUser.email;
    }
    AOS.init();
  },
};
</script>
<style scoped>
.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #dfdfdf;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.form-container {
  display: grid;
  padding-left: 160px;
  padding-right: 160px;
  margin-bottom: 20px;
}
.header { 
  color: #ffffff !important;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #1f2c79;
}

.header p { 
  color: #ffffff !important;
  margin: 15px ;
  text-align: center;
}

.form-section {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(235, 235, 235, 0.9);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.title {
  color: #ffffff;
  font-size: 2.5rem;
  padding: 10px;
  text-align: center;
}

h3 {
  text-align: left;
  color: #0e1850;
  font-size: 25px;
}

label {
  font-weight: bold;
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Montserrat", sans-serif;
}

input:focus, select:focus, textarea:focus {
  border-color: #0e1850;
}

.input-error {
  border-color: red;
}

button {
  width: 100%;
  padding: 20px;
  background-color: #0e1850;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

button:hover {
  background-color: #053e74;
}

.checkbox-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-container {
      grid-template-columns: 1fr; 
  }
}
</style>
