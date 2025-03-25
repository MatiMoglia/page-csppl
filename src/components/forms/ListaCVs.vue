<template>
    <div class="admin-container">
      <h2>Administrar curriculums</h2>
      <div class="search-container">
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por nombre, teléfono, area ..." 
            @input="filtrarCVs" />
        <i class="ri-search-line"></i>
      </div>
      <div v-if="loading || loadingCV" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="table-container" v-if="!loadingCV">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th style="width: 250px;">Email</th>
              <th style="width: 150px;">Teléfono</th>
              <th>Area</th>
              <th>Link CV</th>
              <th style="width: 150px;">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in formulariosFiltrados" :key="form._id">
                <td>{{ form.name }}</td>
                <td style="color: blue;">{{ form.email }}</td>
                <td>{{ form.telefono }}</td>
                <td>{{ form.area }}</td>
                <td>{{ form.files }}</td>
                <td class="icon-buttons">
                    <button @click="contactarCV(form._id)" title="Contactar">
                        <i class="ri-whatsapp-line"></i>
                    </button>
                    <button @click="abrirCV(form.files)" title="Ver CV">
                        <i class="ri-external-link-line"></i>
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
    <div v-if="modalEliminar" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3 style="margin-bottom: 10px;">¿Estás seguro de eliminar este formulario?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="modal-actions eliminar">
          <button @click="eliminarFormularioConfirmado"><i class="ri-delete-bin-line"></i> Eliminar</button>
          <button @click="cerrarModalEliminar"><i class="ri-close-line"></i> Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from "@/services/apiCVs";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    data() {
      return {
        cvs: [],
        formulariosFiltrados: [], 
        searchQuery: '', 
        modalAbierto: false,
        modalEliminar: false,
        idEliminar: null,
        loading: false,
        loadingCV: false,
      };
    },
    methods: {
        async cargarcvs() {
        try {
            const response = await apiClient.obtenerCVS();

            if (response.success) {
            this.cvs = Array.isArray(response.data) ? response.data : [response.data];
            this.formulariosFiltrados = this.cvs;
            } else {
            toast.error("Error al cargar los cvs", response.error || "Datos inválidos");
            }
        } catch (error) {
            console.error("Error cargando cvs:", error);
            toast.error("Error cargando los cvs");
        }
      },
      filtrarCVs() {
            const query = this.searchQuery.toLowerCase();
            this.formulariosFiltrados = this.cvs.filter((form) => {
                return (
                    form.name.toLowerCase().includes(query) ||
                    (form.telefono && form.telefono.toString().includes(query)) || 
                    form.email.toString().includes(query) || 
                    form.area.toLowerCase().includes(query) 
                );
            });
      },
      confirmarEliminacion(id) {
        this.idEliminar = id;
        this.modalEliminar = true;
      },
      async eliminarFormularioConfirmado() {
        this.loading = true;
        try {
          const response = await apiClient.eliminarCV(this.idEliminar);
          if (response.success) {
            this.donantes = this.donantes.filter((f) => f._id !== this.idEliminar);
            toast.success("CV eliminado correctamente.");
          } else {
            toast.error("Error al eliminar el CV", response.error);
          }
        } catch (error) {
          toast.error("Error eliminando el CV", error);
        } finally {
          this.cerrarModalEliminar();
          this.loading = false;
        }
      },
      cerrarModal() {
        this.modalAbierto = false;
      },
      cerrarModalEliminar() {
        this.modalEliminar = false;
        this.idEliminar = null;
      },
      contactarCV(id) {
        const cv = this.cvs.find(d => d._id === id);
        if (!cv || !cv.telefono) {
            toast.error("No se encontró el número de teléfono del postulante.");
            return;
        }
        const mensaje = encodeURIComponent(`Hola ${cv.name}, nos gustaría contactarte por tu CV`);
        const whatsappURL = `https://wa.me/${cv.telefono}?text=${mensaje}`;
        window.open(whatsappURL, "_blank");
      },
      abrirCV(link) {
        if (!link) {
          toast.error("No se encontró un link válido para el CV");
          return;
        }
        window.open(link, "_blank");
      }
    },
    async mounted() {
      this.loadingCV = true;
      await this.cargarcvs();
      this.filtrarCVs(); 
      this.loadingCV = false;
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
.admin-container {
  padding: 20px;
  max-width: 1600px;
  margin: auto;
}
  
.table-container {
  padding-left: 50px;
  padding-right: 50px;
  max-width: 100%;
  overflow-x: auto;
}
  
h2 {
  text-align: center;
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

.wrap-text {
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 200px;
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
  
input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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