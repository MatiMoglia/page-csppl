<template>
  <div v-if="loading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
    <div class="form-container">
      <div class="form-section">
        <h3>Dejanos tu Reclamo o Consulta:</h3>
        <form @submit.prevent="enviarFormulario">
          
          <label for="nombre">Nombre y Apellido: *</label>
          <input type="text" id="nombre" v-model="formReclamo.nombre" required />
          
          <label for="direccion">Dirección: *</label>
          <input type="text" id="direccion" v-model="formReclamo.direccion" required />
  
          <label for="telefono">Teléfono: *</label>
          <input type="text" id="telefono" v-model="formReclamo.telefono" required />
  
          <label for="email">Email: *</label>
          <input type="email" id="email" v-model="formReclamo.email" required/>
  
          <label>Selecciona el Servicio *</label>
          <select v-model="formReclamo.servicio" required>
            <option value="">Selecciona el servicio</option>
            <option value="Servicios Sociales">Servicio: Servicios Sociales</option>
            <option value="Telecomunicaciones">Servicio: Telecomunicaciones</option>
            <option value="Energía Eléctrica">Servicio: Energía Elécctrica</option>
            <option value="Alumbrado Público">Servicio: Alumbrado Público</option>
            <option value="Agua Potable">Servicio: Agua Potable</option>
            <option value="Administracion">Administración</option>
            <option value="Compras/Ventas">Compras-Ventas</option>
            <option value="Facturación">Facturación</option>
            <option value="Pagina Web/CoopOnline">Pagina Web-CoopOnline</option>
          </select>
  
          <label for="descripcion">Descripcion del Reclamo: *</label>
          <textarea placeholder="Deja tu mensaje aquí..." v-model="formReclamo.descripcion"></textarea>
  
          <button type="submit">Enviar</button>
        </form>
      </div>
      <NrosGuardia/>
    </div>
</template>
  
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import apiReclamos from '@/services/apiReclamos';
import NrosGuardia from './csppl-info/NrosGuardia.vue';
import { mapGetters } from 'vuex';

export default {
    data() {
      return {
        formReclamo: {
          nombre: '',
          direccion: '',
          telefono: '',
          email: '',
          servicio: '',
          descripcion: '',
          estado:'',
          fechaReclamo: new Date().toISOString().split('T')[0],
          loading: false,
        },
      };
    },
    components: {
        NrosGuardia
    },
    computed: {
      ...mapGetters("auth", ["isAuthenticated", "getUser"]),
    },
    methods: {
      emailAutocompletado() {
        return this.isAuthenticated && this.getUser ? this.getUser.email : '';
      },
      async enviarFormulario() {
        this.formReclamo.fechaReclamo = new Date().toISOString().split('T')[0];
        this.formReclamo.estado = "Pendiente";
        this.loading = true;

        if (this.formReclamo.nombre === "") {
          toast.error("Ingrese el nombre completo.");
          return;
        } else if (this.formReclamo.direccion === "") {
          toast.error("Ingrese una dirección válida.");
          return;
        } else if (this.formReclamo.descripcion === "") {
          toast.error("Ingrese una descripción válida.");
          return;
        } else if (this.formReclamo.servicio === "") {
          toast.error("Seleccione un servicio.");
          return;
        } else if (!this.isValidEmail(this.formReclamo.email)) {
          toast.error("El correo electrónico no es válido.");
          return;
        } else if (this.formReclamo.telefono === "") {
          toast.error("Ingrese el número de teléfono.");
          return;
        }
        try {
            const response = await apiReclamos.enviarReclamo(this.formReclamo);
            console.log("Respuesta de la API:", response);

            if (response && response._id) {
            toast.success("Reclamo enviado con éxito");
            this.loading = false;
            this.resetFormReclamos();
            } else {
            toast.error("Error al enviar el reclamo. Respuesta inesperada.");
            }
        } catch (error) {
            console.error("Error al enviar el reclamo:", error);
            toast.error("Error al conectar con el servidor.");
            this.loading = false;
        }
      },
  
      isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
      },
  
      resetFormReclamos() {
        this.formReclamo = {
          nombre: '',
          direccion: '',
          telefono: '',
          email: '',
          servicio: '',
          descripcion: '',
          estado: ''
        };
      }
    },
    mounted() {
      if (this.isAuthenticated) {
        this.formReclamo.email = this.getUser.email;
      }
    },
  };
</script>  
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.377);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.form-container {
  display: grid;
  padding: 20px;
  margin-top: 30px;
  padding-left: 140px;
  padding-right: 140px;
  margin-bottom: 30px;
}
    
.form-section {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(235, 235, 235, 0.9);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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
    
.video-consulta-container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-left: 120px;
  padding-right: 120px;
  padding-top: 10px;
  padding-bottom: 20px;
}
.video-consulta-container h3 {
  font-size: 1.1em;
  margin-bottom: 25px;
}
  
.consulta-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
}
  
.consulta-section textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
  
.btn-enviar {
  background-color: #0e1850;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
  
.btn-enviar:hover {
  background-color: #053e74;
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr; 
  }
}
</style>
    