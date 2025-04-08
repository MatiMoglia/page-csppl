<template>
    <div class="admin-container">
      <h2>Administrar Reclamos/Consultas:</h2>
      <div class="search-container">
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por nroTitular, nombre, grupo sanguineo o servicio..." 
            @input="filtrarFormularios" />
        <i class="ri-search-line"></i>
      </div>
      <div v-if="loading || loadingAdherentes" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="table-container" v-if="!loadingAdherentes">
        <table>
          <thead>
            <tr>
              <th>Nro Titular</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Fecha Nacimiento</th>
              <th>Grupo Sanguineo</th>
              <th>Servicio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in formulariosFiltrados" :key="form._id">
              <td>{{ form.nroTitular }}</td>
              <td>{{ form.nombre }}</td>
              <td>{{ form.dni }}</td>
              <td>{{ form.fechaNacimiento }}</td>
              <td>{{ form.grupoSanguineo }}</td>
              <td> {{ form.servicios }}</td>
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
  
    <div v-if="modalAbierto" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Adherente</h3>
        <label>Nro Titular:</label>
        <input type="text" v-model="formEdicion.nroTitular" disabled />
        <label>DNI:</label>
        <input type="number" v-model="formEdicion.dni" required />
        <label>Fecha de Nacimiento:</label>
        <input type="date" class="date" v-model="formEdicion.fechaNacimiento" required/>
        <label>Grupo Sanguineo:</label>
        <select v-model="formEdicion.grupoSanguineo" required>
            <option value="">Seleccione...</option>
            <option v-for="grupo in gruposSanguineos" :key="grupo" :value="grupo">{{ grupo }}</option>
        </select>
        <label>Servicio Social:</label>
        <div style="display: flex; padding: 15px; gap: 10px; text-align: center;" >
            <label><input type="checkbox" value="Traslado Social" v-model="formEdicion.servicios"> Traslado Social</label><br>
            <label><input type="checkbox" value="Banco de Sangre" v-model="formEdicion.servicios"> Banco de Sangre</label><br>
            <label><input type="checkbox" value="Sepelio" v-model="formEdicion.servicios"> Sepelio</label>
        </div>
        <div class="modal-actions">
          <button @click="guardarEdicion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModal"><i class="ri-close-line"></i></button>
        </div>
      </div>
    </div>
  
    <div v-if="modalEliminar" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3 style="margin-bottom: 10px;">¿Estás seguro de eliminar este Adherente?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div class="modal-actions eliminar">
          <button @click="eliminarFormularioConfirmado"><i class="ri-delete-bin-line"></i> Eliminar</button>
          <button @click="cerrarModalEliminar"><i class="ri-close-line"></i> Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from "@/services/apiSS";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    data() {
      return {
        formularios: [],
        formulariosFiltrados: [], 
        searchQuery: '', 
        modalAbierto: false,
        modalEliminar: false,
        idEliminar: null,
        formEdicion: { 
            titular: '',
            dniTitular: '',
            nombre: '',
            fechaNacimiento: '',
            grupoSanguineo: '',
            dni: '',
            servicios: [],
            nroTitular: '',
        },
        gruposSanguineos: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        loading: false,
        loadingAdherentes: false,
      };
    },
    methods: {
      async cargarFormularios() {
        try {
          const response = await apiClient.obtenerDatos();
          if (response.success && Array.isArray(response.data)) {
            this.formularios = response.data;
            this.formulariosFiltrados = this.formularios;
          } else {
            toast.error("Error al cargar formularios", response.error || "Datos inválidos");
          }
        } catch (error) {
          toast.error("Error cargando los Adherentes", error);
        }
      },
      filtrarFormularios() {
        const query = this.searchQuery?.toLowerCase() ?? "";

        this.formulariosFiltrados = this.formularios.filter(({ 
          nombre, nroTitular, grupoSanguineo, servicio
        }) => {
          return (
            nombre?.toLowerCase().includes(query) ||
            nroTitular?.toString().includes(query) ||
            grupoSanguineo?.toLowerCase().includes(query) ||
            servicio?.toLowerCase().includes(query) 
          );
        });
      },
      editarFormulario(form) {
        const fechaParts = form.fechaNacimiento?.split("/") || [];
        const fechaFormateada = fechaParts.length === 3
            ? `${fechaParts[2]}-${fechaParts[1].padStart(2, '0')}-${fechaParts[0].padStart(2, '0')}`
            : form.fechaNacimiento;
            const serviciosArray = Array.isArray(form.servicios)
            ? form.servicios
            : (form.servicios || '').split(',').map(s => s.trim());
        
        this.formEdicion = { ...form, fechaNacimiento: fechaFormateada, servicios: serviciosArray };
        this.modalAbierto = true;
      },
      confirmarEliminacion(id) {
        this.idEliminar = id;
        this.modalEliminar = true;
      },
      async eliminarFormularioConfirmado() {
        this.loading = true;
        try {
          const response = await apiClient.eliminarAdherente(this.idEliminar);
          if (response.success) {
            this.formularios = this.formularios.filter((f) => f._id !== this.idEliminar);
            toast.success("Adherente eliminado correctamente.");
            this.cargarFormularios();
          } else {
            toast.error("Error al eliminar el Adherente", response.error);
          }
        } catch (error) {
          toast.error("Error eliminando el Adherente", error);
        } finally {
          this.cerrarModalEliminar();
          this.loading = false;
        }
      },
      async guardarEdicion() {
        this.modalAbierto = false; 
        this.loading = true;
        if (!this.formEdicion.nombre || !this.formEdicion.dni || !this.formEdicion.fechaNacimiento || !this.formEdicion.servicios || !this.formEdicion.grupoSanguineo) {
          toast.error("Todos los campos son obligatorios.");
          return;
        }
        try {
          const response = await apiClient.actualizarAdherente(this.formEdicion._id, this.formEdicion);
          if (response.success) {
            toast.success("Reclamo actualizado correctamente.");
            this.modalAbierto = false;
            this.cargarFormularios();
          } else {
            toast.error(response.error || "Error al guardar la edición.");
          }
        } catch (error) {
          toast.error("Error al guardar la edición.");
          console.error("Error:", error);
        } finally {
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
    },
    async mounted() {
      this.loadingAdherentes = true;
      await this.cargarFormularios();
      this.loadingAdherentes = false;
    },
  };
</script>
<style scoped>
.estado-pendiente {
  color: orange;
  font-weight: bold;
}
.estado-registrado {
  color: blue;
  font-weight: bold;
}
.estado-realizado {
  color: green;
  font-weight: bold;
}
.estado-cancelado {
  color: red;
  font-weight: bold;
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