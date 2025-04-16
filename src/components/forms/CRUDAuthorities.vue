<template>
  <div class="correos-container">
    <h2>Manejo de Autoridades</h2>
    <div v-if="loading || loadingAutoridades" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div class="acciones-container">
      <button @click="abrirFormularioNuevo" class="add-button">
        Añadir Autoridad
      </button>
      <button @click="imprimirTabla" class="print-button">
        🖨️ Imprimir Listado
      </button>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar por título o cargo"
        />
        <i class="ri-search-line"></i>
      </div>
    </div>
    <div class="table-container" v-if="!loadingAutoridades">
      <table ref="tablaAutoridades">
        <thead>
          <tr>
            <th>Título</th>
            <th>Cargo</th>
            <th>Imagen</th>
            <th style="width: 120px;" class="no-print">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="autoridad in autoridadesFiltradas" :key="autoridad.id">
            <td>{{ autoridad.title }}</td>
            <td>{{ autoridad.position }}</td>
            <td>
              <img
                v-if="autoridad.image_url"
                :src="baseUrl + autoridad.image_url"
                alt="Foto"
                style="width: 60px; height: 60px; object-fit: cover;"
              />
              <span v-else>No disponible</span>
            </td>
            <td class="icon-buttons no-print">
              <button @click="editarFormulario(autoridad)" title="Editar">
                <i class="ri-edit-line"></i>
              </button>
              <button @click="confirmarEliminacion(autoridad.id)" title="Eliminar">
                <i class="ri-delete-bin-line"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="modalAbierto" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Autoridad</h3>
        <label>Título:</label>
        <input type="text" v-model="formEdicion.title" required />
        <label>Cargo:</label>
        <input type="text" v-model="formEdicion.position" required />
        <label>Imagen:</label>
        <input type="file" @change="onFileChange" accept="image/*" />

        <div class="modal-actions">
          <button @click="guardarEdicion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModal"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
    <div v-if="modalEliminar" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3 style="margin-bottom: 10px;">¿Estás seguro de eliminar esta Autoridad?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="modal-actions eliminar">
          <button @click="eliminarAutoridadConfirmado"><i class="ri-delete-bin-line"></i> Eliminar</button>
          <button @click="cerrarModalEliminar"><i class="ri-close-line"></i> Cancelar</button>
        </div>
      </div>
    </div>
    <div v-if="modalNuevo" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Agregar Autoridad</h3>
        <label>Título:</label>
        <input type="text" v-model="formNuevo.title" required />
        <label>Cargo:</label>
        <input type="text" v-model="formNuevo.position" required />
        <label>Imagen:</label>
        <input type="file" @change="onFileChangeNuevo" accept="image/*" />

        <div class="modal-actions">
          <button @click="guardarNuevo"><i class="ri-save-3-line"></i> Guardar</button>
          <button @click="cerrarModalNuevo"><i class="ri-close-line"></i> Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/apiAuthorities";
import { toast } from 'vue3-toastify';
export default {
  data() {
    return {
      searchQuery: "",
      modalAbierto: false,
      modalEliminar: false,
      idEliminar: null,
      formEdicion: {
        id: "",
        title: "",
        position: "",
        image_url: "",
      },
      selectedFile: null,
      loading: false,
      loadingAutoridades: false,
      autoridades: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      modalNuevo: false,
      formNuevo: {
        title: "",
        position: "",
        image_url: null,
      },
    };
  },
  computed: {
    autoridadesFiltradas() {
      return this.autoridades.filter((a) =>
        `${a.title} ${a.position}`.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchAutoridades() {
        try {
        const { data } = await api.get("/autoridades");
        this.autoridades = data;
        } catch (error) {
        console.error("Error al cargar las autoridades:", error);
        toast.error("Error al cargar las autoridades.");
        }
        this.loading = false;
    },
    editarFormulario(autoridad) {
      this.formEdicion = { ...autoridad };
      this.selectedFile = null; 
      this.modalAbierto = true;
    },
    confirmarEliminacion(id) { 
      this.idEliminar = id;
      this.modalEliminar = true;
    },
    async eliminarAutoridadConfirmado() {
      this.loading = true;
      try {
        await api.delete(`/autoridades/${this.idEliminar}`);
        toast.success("Autoridad eliminada correctamente.");
        await this.fetchAutoridades();
      } catch (error) {
        console.error("Error al eliminar la autoridad:", error);
        toast.error("Error al eliminar la autoridad.");
      } finally {
        this.cerrarModalEliminar();
        this.loading = false;
      }
    },
    async guardarEdicion() {
      this.modalAbierto = false;
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("title", this.formEdicion.title);
        formData.append("position", this.formEdicion.position);
      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }

        await api.put(`/autoridades/${this.formEdicion.id}`, formData);
        toast.success("Autoridad actualizada con éxito.");
        await this.fetchAutoridades();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        toast.error("Error al guardar los cambios.");
      } finally {
        this.loading = false;
      }
    },
    abrirFormularioNuevo() {
      this.formNuevo = { title: "", position: "", image_url: null }; 
      this.modalNuevo = true;
    },
    
    onFileChangeNuevo(e) {
      this.formNuevo.image_url = e.target.files[0];
    },
    async guardarNuevo() {
      this.modalNuevo = false;
      this.loading = true;
      
      try {
        const formData = new FormData();
        formData.append("title", this.formNuevo.title);
        formData.append("position", this.formNuevo.position);
        if (this.formNuevo.image_url) {
          formData.append("image", this.formNuevo.image_url);
        }

        await api.post("/autoridades", formData);
        toast.success("Autoridad agregada con éxito.");
        await this.fetchAutoridades();
      } catch (error) {
        console.error("Error al agregar la autoridad:", error);
        toast.error("Error al agregar la autoridad.");
      } finally {
        this.loading = false;
      }
    },

    cerrarModalNuevo() {
      this.modalNuevo = false;
      this.formNuevo = { title: "", position: "", image_url: null };
    },
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    cerrarModal() {
      this.modalAbierto = false;
      this.formEdicion = { id: "", title: "", position: "", image_url: "" };
      this.selectedFile = null;
    },
    cerrarModalEliminar() {
      this.modalEliminar = false;
      this.idEliminar = null;
    },
    imprimirTabla() {
      const tabla = this.$refs.tablaAutoridades;
      const ventanaImpresion = window.open('', '_blank');

      ventanaImpresion.document.write(`
        <html>
          <head>
            <title>Listado de Autoridades:</title>
            <style>
              body {
                font-family: "Montserrat", sans-serif;
                margin: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              img {
                max-height: 60px;
                max-width: 60px;
                object-fit: cover;
              }
              .no-print {
                display: none !important;
              }
            </style>
          </head>
          <body>
            <h2>Listado de Autoridades</h2>
            ${tabla.outerHTML}
          </body>
        </html>
      `);

      ventanaImpresion.document.close();
      ventanaImpresion.focus();
      ventanaImpresion.print();
      ventanaImpresion.close();
    },
  },
  async mounted() {
    this.loadingAutoridades = true;
    await this.fetchAutoridades();
    this.loadingAutoridades = false;
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
.acciones-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
  padding-top: 20px;
}

.add-button {
  background-color: #191a80;
  color: white;
  font-weight: bold;
  padding: 20px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 600px;
  width: 100%;
}
.search-container input {
  font-size: 1rem;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  padding: 0px 15px;
}

.search-container i {
  background-color: #191a80;
  color: white;
  font-weight: bold;
  padding: 20px;
  border-radius: 0 4px 4px 0;
}
.print-button {
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  padding: 20px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s ease;
}

.print-button:hover {
  background-color: #1b5e20;
}
.correos-container {
  padding-left: 120px;
  padding-right: 120px;
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
  padding-bottom: 20px;
  max-width: 1600px;
  margin: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
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
@media print {
  .add-button,
  .print-button,
  .search-container,
  .icon-buttons,
  .modal,
  .acciones-container,
  .loading-overlay {
    display: none !important;
  }

  body {
    background: white !important;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  img {
    max-height: 60px;
    max-width: 60px;
    object-fit: cover;
  }
}
</style>
  