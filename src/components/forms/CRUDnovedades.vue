<template>
    <div class="novs-container">
      <h2>Panel de Noticias</h2>
      <div class="search-container">
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por titulo, subtitulo, fecha ..." 
            @input="filtrarFormularios" />
        <i class="ri-search-line"></i>
      </div>
      <div v-if="loading || loadingUsuarios" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <button v-if="!loadingUsuarios" @click="abrirFormulario()" class="btn-links"><i class="ri-file-list-3-line"></i>Nueva Publicacion</button>
      <div v-if="!loadingUsuarios">
      <div v-for="form in formulariosFiltrados" :key="form._id" class="card">
        <img :src="form.imagen" alt="Imagen de noticia" class="card-img">
        <div class="card-content">
          <h3>{{ form.titulo }}</h3>
          <h4>{{ form.subtitulo }}</h4>
          <p class="fecha">{{ form.fecha }}</p>
          <p>{{ form.contenido }}</p>
          <div class="icon-buttons">
            <button @click="editarFormulario(form)" title="Editar">
              <i class="ri-edit-line"></i>
            </button>
            <button @click="confirmarEliminacion(form._id)" title="Eliminar">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  <div>
    <p v-if="formulariosFiltrados.length < 1"></p>
  </div>
    <div v-if="modalAbierto" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Datos</h3>
        <label>Titulo:</label>
        <input type="text" v-model="formEdicion.titulo" required />
        <label>Fecha de la publicacion:</label>
        <input type="datetime-local" v-model="formEdicion.fecha" required />
        <label>Subtitulo:</label>
        <input type="text" v-model="formEdicion.subtitulo" required />
        <label>Contenido:</label>
        <textarea placeholder="Ingrese el contenido de la publicacion" v-model="formEdicion.contenido" class="textarea-modal"></textarea>
        <label>Imagen (link):</label>
        <input type="text" v-model="formEdicion.imagen" required />
        <div class="modal-actions">
          <button @click="guardarEdicion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModal"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
    <div v-if="modalEliminar" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3 style="margin-bottom: 10px;">¿Estás seguro de eliminar esta Publicacion?</h3>
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
        <label>Titulo:</label>
        <input type="text" v-model="formEdicion.titulo" required />
        <label>Fecha:</label>
        <input type="datetime-local" v-model="formEdicion.fecha" required />
        <label>Subtitulo:</label>
        <input type="text" v-model="formEdicion.subtitulo" required />
        <label>Contenido:</label>
        <textarea placeholder="Ingrese el contenido de la publicacion" v-model="formEdicion.contenido"  class="textarea-modal"></textarea>
        <label>Imagen (link):</label>
        <input type="text" v-model="formEdicion.imagen" required />
        <div class="modal-actions">
          <button @click="nuevaPublicacion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModalNuevo"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
</template>
  
<script>
  import apiClient from "@/services/apiNovs";
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
          titulo: "",
          subtitulo: "",
          contenido: "",
          fecha: "",
          imagen: "",
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
                form.titulo.toLowerCase().includes(query) ||
                (form.edad && form.edad.toString().includes(query)) || 
                form.fecha.toLowerCase().includes(query) ||
                form.subtitulo.toLowerCase().includes(query)
            );
            });
        },
        async cargarDatos() {
            try {
            const response = await apiClient.getNovedades();
            if (response.success && Array.isArray(response.data)) {
                this.formularios = response.data;
                this.formulariosFiltrados = this.formularios;
            } else {
                toast.error("Error al cargar las publicacion", response.error || "Datos inválidos");
            }
            } catch (error) {
            toast.error("Error cargando las publicacion", error);
            }
        },
        abrirFormulario() {
            this.modalNuevo = true;
            this.formEdicion = { titulo: "", subtitulo: "", fecha: "", contenido: "", imagen: "" };
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
            const response = await apiClient.eliminarNovedades(this.idEliminar);
            if (response.success) {
                this.formularios = this.formularios.filter((form) => form._id !== this.idEliminar);
                this.formulariosFiltrados = this.formularios;
                toast.success("Publicacion eliminada correctamente.");
                this.cargarDatos();
            } else {
                toast.error("Error al eliminar la publicacion", response.error);
            }
            } catch (error) {
            toast.error("Error eliminando la publicacion", error);
            } finally {
            this.cerrarModalEliminar();
            this.loading = false;
            }
        },
        async guardarEdicion() {
            this.modalAbierto = false; 
            this.loading = true;
            if (!this.formEdicion.titulo  || !this.formEdicion.contenido || !this.formEdicion.imagen) {
                toast.error("Todos los campos son obligatorios.");
                return;
            }
            const formattedFecha = this.formatDate(this.formEdicion.fecha);
            const datosActualizados = {
                ...this.formEdicion,
                fecha: formattedFecha
            };
            try {
                const response = await apiClient.actualizarNovedades(this.formEdicion._id, datosActualizados);
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
        async nuevaPublicacion() {
            if (this.formEdicion.titulo === "") {
                toast.error("Ingrese el titulo completo.");
                return;
            } else if (this.formEdicion.contenido === "") {
                toast.error("Ingrese un contenido.");
                return;
            } else if (this.formEdicion.imagen === "") {
                toast.error("Ingrese la imagen.");
                return;
            } else if (this.formEdicion.fecha === "") {
                toast.error("Ingrese la fecha.");
                return;
            }
            const formattedFecha = this.formatDate(this.formEdicion.fecha);
            const datosActualizados = {
                ...this.formEdicion,
                fecha: formattedFecha
            };
            try {
                const response = await apiClient.cargarNovedad(datosActualizados);
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
                titulo: "",
                subtitulo: "",
                contenido: "",
                fecha: "",
                imagen: "",
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
.textarea-modal {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  box-sizing: border-box;
}

.textarea-modal:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.novs-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin-bottom: 20px;
}

.card-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 35px;
}

.card-content {
  flex-grow: 1;
}

.card-content h3 {
  margin: 0;
  font-size: 30px;
  color: #0056b3;
}

.card-content h4 {
  margin: 5px 0;
  font-size: 20px;
  color: gray;
}

.card-content .fecha {
  font-size: 15px;
  color: #888;
}

.icon-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.icon-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: #0e1850;
  transition: color 0.3s, transform 0.3s;
}

.icon-buttons button:hover {
    opacity: 0.7;
    color: #007bff;
}

.btn-img,
.btn-links {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #0e1850;
    font-family: "Montserrat", sans-serif;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 270px;
    text-align: center;
    text-decoration: none;
    margin-bottom: 30px;
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
h2 {
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: "Montserrat", sans-serif;
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
    