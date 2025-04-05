<template>
    <div class="admin-container">
      <h2>Administrar Formularios de Alta/Baja de Servicios</h2>
      <div class="search-container">
        <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por nombre, teléfono, DNI..." 
            @input="filtrarFormularios" />
        <i class="ri-search-line"></i>
      </div>
      <div v-if="loading || loadingUsuarios" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="table-container" v-if="!loadingUsuarios">
        <table>
          <thead>
            <tr>
              <th :style="{ width: '100px' }">Servicio</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>DNI</th>
              <th>Domicilio</th>
              <th :style="{ width: '200px' }">Email</th>
              <th :style="{ width: '70px' }">Acción</th>
              <th>Descripción</th>
              <th>Fecha Pedido</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in formulariosFiltrados" :key="form._id">
              <td>{{ form.servicio }}</td>
              <td>{{ form.nombre }}</td>
              <td>{{ form.telefono }}</td>
              <td>{{ form.dni }}</td>
              <td>{{ form.domicilio }}</td>
              <td style="font-size: 0.8rem; color: #1f2c79; font-weight: bold;">{{ form.email }}</td>
              <td>{{ form.accion }}</td>
              <td class="wrap-text">{{ form.descripcion }}</td>
              <td>{{ form.fechapedido }}</td>
              <td class="icon-buttons">
                <button @click="editarFormulario(form)" title="Editar">
                  <i class="ri-edit-line"></i>
                </button>
                <button @click="confirmarEliminacion(form._id)" title="Eliminar">
                  <i class="ri-delete-bin-line"></i>
                </button>
                <button @click="imprimirFormulario(form)" title="Imprimir">
                  <i class="ri-printer-line"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <div v-if="modalAbierto" class="modal animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>Editar Formulario</h3>
        <label>Nombre:</label>
        <input type="text" v-model="formEdicion.nombre" required />
        <label>Teléfono:</label>
        <input type="tel" v-model="formEdicion.telefono" required />
        <label>Domicilio:</label>
        <input type="text" v-model="formEdicion.domicilio" required />
        <label>DNI:</label>
        <input type="number" v-model="formEdicion.dni" required />
        <label>Email:</label>
        <input type="text" v-model="formEdicion.email" required />
        <label>Acción:</label>
        <select v-model="formEdicion.accion">
          <option value="Alta">Alta</option>
          <option value="Baja">Baja</option>
        </select>
        <div class="modal-actions">
          <button @click="guardarEdicion"><i class="ri-save-3-line"></i></button>
          <button @click="cerrarModal"><i class="ri-close-line"></i></button>
        </div>
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
  import apiClient from "@/services/apiForms";
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
          nombre: "",
          telefono: "",
          dni: "",
          accion: "",
          email: "",
          domicilio: "",
          descripcion: "",
          fechapedido: "",
          servicio: "",
        },
        loading: false,
        loadingUsuarios: false,
      };
    },
    methods: {
      async cargarFormularios() {
        try {
          const response = await apiClient.obtenerFormularios();
          if (response.success && Array.isArray(response.data)) {
            this.formularios = response.data;
            this.formulariosFiltrados = this.formularios;
          } else {
            toast.error("Error al cargar formularios", response.error || "Datos inválidos");
          }
        } catch (error) {
          toast.error("Error cargando los formularios", error);
        }
      },
      filtrarFormularios() {
            const query = this.searchQuery.toLowerCase();
            this.formulariosFiltrados = this.formularios.filter((form) => {
                return (
                    form.nombre.toLowerCase().includes(query) ||
                    (form.telefono && form.telefono.toString().includes(query)) || 
                    (form.dni && form.dni.toString().includes(query)) || 
                    form.domicilio.toLowerCase().includes(query) ||
                    form.email.toLowerCase().includes(query) ||
                    form.servicio.toLowerCase().includes(query)
                );
            });
      },
      editarFormulario(form) {
        this.formEdicion = { ...form };
        this.modalAbierto = true;
      },
      confirmarEliminacion(id) {
        this.idEliminar = id;
        this.modalEliminar = true;
      },
      async eliminarFormularioConfirmado() {
        this.loading = true;
        try {
          const response = await apiClient.eliminarFormulario(this.idEliminar);
          if (response.success) {
            this.formularios = this.formularios.filter((f) => f._id !== this.idEliminar);
            toast.success("Formulario eliminado correctamente.");
          } else {
            toast.error("Error al eliminar el formulario", response.error);
          }
        } catch (error) {
          toast.error("Error eliminando el formulario", error);
        } finally {
          this.cerrarModalEliminar();
          this.loading = false;
        }
      },
      imprimirFormulario(form) {
        const contenido = `
          <h2>Formulario de ${form.accion}</h2>
          <p><strong>Nombre:</strong> ${form.nombre}</p>
          <p><strong>Teléfono:</strong> ${form.telefono}</p>
          <p><strong>DNI:</strong> ${form.dni}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Acción:</strong> ${form.accion}</p>
        `;
        const ventana = window.open("", "", "width=600,height=400");
        ventana.document.write(contenido);
        ventana.document.close();
        ventana.print();
      },
      async guardarEdicion() {
        this.modalAbierto = false; 
        this.loading = true;
        if (!this.formEdicion.nombre || !this.formEdicion.telefono || !this.formEdicion.dni) {
          toast.error("Todos los campos son obligatorios.");
          return;
        }
  
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
  
        this.formEdicion.fechapedido = `${day}/${month} ${hours}:${minutes}`;
  
        try {
          const response = await apiClient.actualizarFormulario(this.formEdicion._id, this.formEdicion);
          if (response.success) {
            toast.success("Formulario actualizado correctamente.");
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
      }
    },
    async mounted() {
      this.loadingUsuarios = true;
      await this.cargarFormularios();
      this.loadingUsuarios = false;
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