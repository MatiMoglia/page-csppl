<template>
    <div class="correos-container">
      <h2>Avisos Necrologicos</h2>
      <div class="search-container">
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por nombre, fallecimiento, edad ..." 
            @input="filtrarFormularios" />
        <i class="ri-search-line"></i>
      </div>
      <div v-if="loading || loadingUsuarios" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <button v-if="!loadingUsuarios" @click="abrirFormulario()" class="btn-links"><i class="ri-file-list-3-line"></i> Agregar Aviso</button>
      <div class="table-container" v-if="!loadingUsuarios">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Sepelio</th>
              <th>Iglesia</th>
              <th>Cementerio</th>
              <th>Fallecimiento</th>
              <th style="width: 100px;">Edad</th>
              <th style="width: 120px;">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in formulariosFiltrados" :key="form._id">
              <td>{{ form.nombre }}</td>
              <td>{{ form.sepelio }}</td>
              <td>{{ form.iglesia }}</td>
              <td>{{ form.cementerio }}</td>
              <td>{{ form.fallecimiento }}</td>
              <td>{{ form.edad }}</td>
              <td class="icon-buttons">
                <button @click="editarFormulario(form)" title="Editar">
                  <i class="ri-edit-line"></i>
                </button>
                <button @click="confirmarEliminacion(form._id)" title="Eliminar">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <div>
    <p v-if="formulariosFiltrados.length < 1"></p>
  </div>
    <div v-if="modalAbierto" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Datos</h3>
        <label>Nombre:</label>
        <input type="text" v-model="formEdicion.nombre" required />
        <label>Fecha de Sepelio:</label>
        <input type="datetime-local" v-model="formEdicion.sepelio" required />
        <label>Cementerio:</label>
        <input type="text" v-model="formEdicion.cementerio" required />
        <label>Fecha de fallecimiento:</label>
        <input type="datetime-local" v-model="formEdicion.fallecimiento" required />
        <label>Edad:</label>
        <input type="text" v-model="formEdicion.edad" required />
        <div class="modal-actions">
          <button @click="guardarEdicion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModal"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
    <div v-if="modalEliminar" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3 style="margin-bottom: 10px;">¿Estás seguro de eliminar este Usuario?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="modal-actions eliminar">
            <button @click="eliminarAvisoConfirmado"><i class="ri-delete-bin-line"></i> Eliminar</button>
          <button @click="cerrarModalEliminar"><i class="ri-close-line"></i> Cancelar</button>
        </div>
      </div>
    </div>
    <div v-if="modalNuevo" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Datos</h3>
        <label>Nombre:</label>
        <input type="text" v-model="formEdicion.nombre" required />
        <label>Fecha de Sepelio:</label>
        <input type="datetime-local" v-model="formEdicion.sepelio" required />
        <label>Cementerio:</label>
        <input type="text" v-model="formEdicion.cementerio" required />
        <label>Fecha de fallecimiento:</label>
        <input type="datetime-local" v-model="formEdicion.fallecimiento" required />
        <label>Oficio religioso:</label>
        <input type="text" v-model="formEdicion.iglesia" required />
        <label>Edad:</label>
        <input type="text" v-model="formEdicion.edad" required />
        <div class="modal-actions">
          <button @click="nuevoAviso"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModalNuevo"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
</template>
  
<script>
  import apiClient from "@/services/apiAvisos";
  import { toast } from 'vue3-toastify';
  export default {
    data() {
      return {
        formularios: [],
        formulariosFiltrados: [], 
        searchQuery: '', 
        modalAbierto: false,
        modalEliminar: false,
        modalNuevo: false,
        idEliminar: null,
        formEdicion: {
          _id: "",
          nombre: "",
          sepelio: "",
          cementerio: "",
          fallecimiento: "",
          edad: "",
        },
        loading: false,
        loadingUsuarios: false,
      };
    },
    methods: {
        filtrarFormularios() {
            const query = this.searchQuery.toLowerCase();
            this.formulariosFiltrados = this.formularios.filter((form) => {
            return (
                form.nombre.toLowerCase().includes(query) ||
                (form.edad && form.edad.toString().includes(query)) || 
                form.fallecimiento.toLowerCase().includes(query) ||
                form.cementerio.toLowerCase().includes(query)
            );
            });
        },
        async cargarDatos() {
            try {
            const response = await apiClient.obtenerDatos();
            if (response.success && Array.isArray(response.data)) {
                this.formularios = response.data;
                this.formulariosFiltrados = this.formularios;
            } else {
                toast.error("Error al cargar los datos", response.error || "Datos inválidos");
            }
            } catch (error) {
            toast.error("Error cargando los datos", error);
            }
        },
        abrirFormulario() {
            this.modalNuevo = true;
            this.formEdicion = { nombre: "", cementerio: "", sepelio: "", fallecimiento: "", edad: "" };
        },
        editarFormulario(form) {
            this.formEdicion = { ...form };
            this.modalAbierto = true;
        },
        confirmarEliminacion(id) {
            this.idEliminar = id;
            this.modalEliminar = true;
        },
        async eliminarAvisoConfirmado() {
            this.loading = true;
            try {
            const response = await apiClient.eliminarAviso(this.idEliminar);
            if (response.success) {
                this.formularios = this.formularios.filter((form) => form._id !== this.idEliminar);
                this.formulariosFiltrados = this.formularios;
                toast.success("Aviso eliminado correctamente.");
            } else {
                toast.error("Error al eliminar el aviso", response.error);
            }
            } catch (error) {
            toast.error("Error eliminando el aviso", error);
            } finally {
            this.cerrarModalEliminar();
            this.loading = false;
            }
        },
        async guardarEdicion() {
            this.modalAbierto = false; 
            this.loading = true;
            if (!this.formEdicion.nombre || !this.formEdicion.fallecimiento || !this.formEdicion.cementerio || !this.formEdicion.edad) {
                toast.error("Todos los campos son obligatorios.");
                return;
            }

            const formattedSepelio = this.formatDate(this.formEdicion.sepelio);
            const formattedFallecimiento = this.formatDate(this.formEdicion.fallecimiento);
            const datosActualizados = {
                ...this.formEdicion,
                sepelio: formattedSepelio,
                fallecimiento: formattedFallecimiento
            };
            try {
                const response = await apiClient.actualizarDatos(this.formEdicion._id, datosActualizados);
                if (response.success) {
                    toast.success("Aviso actualizado con éxito.");
                    await this.cargarDatos();
                    this.modalNuevo = false;
                } else {
                    toast.error("Error al actualizar el aviso.");
                }
            } catch (error) {
            toast.error("Error al guardar la edición.");
            console.error(error);
            } finally {
            this.loading = false; 
            }
        },
        async nuevoAviso() {
            if (this.formEdicion.nombre === "") {
                toast.error("Ingrese el nombre completo.");
                return;
            } else if (this.formEdicion.cementerio === "") {
                toast.error("Ingrese el nombre del cementerio.");
                return;
            } else if (this.formEdicion.edad === "") {
                toast.error("Ingrese la edad.");
                return;
            } else if (this.formEdicion.fallecimiento === "") {
                toast.error("Ingrese la fecha de fallecimiento.");
                return;
            } else if (this.formEdicion.sepelio === "") {
                toast.error("Ingrese la fecha de sepelio.");
                return;
            }
            const formattedSepelio = this.formatDate(this.formEdicion.sepelio);
            const formattedFallecimiento = this.formatDate(this.formEdicion.fallecimiento);
            const datosActualizados = {
                ...this.formEdicion,
                sepelio: formattedSepelio,
                fallecimiento: formattedFallecimiento
            };
            try {
                const response = await apiClient.enviarAviso(datosActualizados);
                console.log("Respuesta de la API:", response);

                if (response && response._id) {
                    toast.success("Aviso agregado con éxito.");
                    this.resetForm();
                    this.cerrarModalNuevo();
                    await this.cargarDatos();
                } else {
                    toast.error("Error al agregar el aviso. Respuesta inesperada.");
                }
            } catch (error) {
                console.error("Error al enviar el aviso:", error);
                toast.error("Error al conectar con el servidor.");
            }
        },
        resetForm() {
            this.formEdicion = {
                nombre: "",
                sepelio: "",
                cementerio: "",
                fallecimiento: "",
                edad: "",
            };
        },
        formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toISOString().replace("T", " ").substring(0, 16); 
        },
        cerrarModal() {
            this.modalAbierto = false;
        },
        cerrarModalNuevo() {
            this.modalNuevo = false;
        },
        cerrarModalEliminar() {
            this.modalEliminar = false;
            this.idEliminar = null;
        },
    },
    async mounted() {
      this.loadingUsuarios = true;
      await this.cargarDatos();
      this.loadingUsuarios = false;
    }
  };
</script>
  
<style scoped>
  .btn-img,
  .btn-links {
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #0e1850;
    font-family: "Montserrat", sans-serif;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 250px;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .btn-img:hover,
  .btn-links:hover {
    background-color: #2980dd;
    transform: scale(1.05);
  }
  
  .btn-img i,
  .btn-links i {
    margin-right: 20px;
    font-size: 24px;
  }
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
  .search-container {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .search-container input {
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    max-width: 400px; 
    border-right: 0;
    border-left: 5px solid #007bff; 
    padding-left: 12px;
    border: 1px solid #052241;
  }
  
  .search-container i {
    background-color: #007bff;
    color: white;
    padding: 11px;
    cursor: pointer;
    margin-left: -10px;
    margin-top: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #052241;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .search-container input:focus {
    outline: none;
    border-color: #0056b3;
  }
  
  .search-container input::placeholder {
    color: #aaa;
  }
  
  .search-container i:hover {
    background-color: #0056b3;
  }
  .correos-container {
    padding-left: 50px;
    padding-right: 50px;
    max-width: 100%;
    overflow-x: auto;
  }
  h2 {
    text-align: center;
  }
  h3 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .table-container {
    padding: 20px;
    max-width: 1600px;
    margin: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    table-layout: fixed; 
  }
    
  th, td {
    border: 1px solid #ddd;
    padding: 5px;
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
  }
    
  tbody tr {
    height: auto;
  }
  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .icon-buttons {
    justify-content: center;
    gap: 15px;
  }
    
  .icon-buttons button {
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    padding: 5px;
    transition: ease 0.3s;
  }
    
  .icon-buttons button:hover {
    opacity: 0.7;
    color: #007bff;
  }
  .modal {
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
    
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
  }
    
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
    
  .modal-actions button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #18385a;
    transition: ease 0.3s;
  }
    
  .modal-actions button:hover {
    color: #007bff;
  }
  .eliminar {
    margin-top: 20px; 
  }
</style>
    