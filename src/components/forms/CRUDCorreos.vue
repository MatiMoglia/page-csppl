<template>
  <div class="correos-container">
    <h2>Manejo de Datos de Usuarios Registrados</h2>
    <div v-if="loading || loadingUsuarios" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre, teléfono, correo"
      />
      <i class="ri-search-line"></i>
    </div>

    <div class="table-container" v-if="!loadingUsuarios">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th style="width: 120px;">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario._id">
            <td>{{ usuario.name }}</td>
            <td>{{ usuario.phone || "No disponible" }}</td>
            <td>{{ usuario.email }}</td>
            <td class="icon-buttons">
              <button @click="editarFormulario(usuario)" title="Editar">
                <i class="ri-edit-line"></i>
              </button>
              <button @click="confirmarEliminacion(usuario._id)" title="Eliminar">
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
      <h3>Editar Datos</h3>
      <label>Nombre:</label>
      <input type="text" v-model="formEdicion.name" required />
      <label>Teléfono:</label>
      <input type="tel" v-model="formEdicion.phone" required />
      <label>Email:</label>
      <input type="text" v-model="formEdicion.email" required />
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
        <button @click="eliminarUserConfirmado"><i class="ri-delete-bin-line"></i> Eliminar</button>
        <button @click="cerrarModalEliminar"><i class="ri-close-line"></i> Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import apiClient from "@/services/apiUsers";
import { toast } from 'vue3-toastify';
export default {
  data() {
    return {
      searchQuery: "",
      modalAbierto: false,
      modalEliminar: false,
      idEliminar: null,
      formEdicion: {
        _id: "",
        name: "",
        phone: "",
        email: "",
      },
      loading: false,
      loadingUsuarios: false,
    };
  },
  computed: {
    ...mapGetters("users", ["getUsuarios"]),
    usuariosFiltrados() {
      return this.getUsuarios.filter((usuario) =>
        `${usuario.name} ${usuario.phone || ""} ${usuario.email}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions("users", ["fetchUsuarios"]),

    editarFormulario(usuario) {
      this.formEdicion = { ...usuario };
      this.modalAbierto = true;
    },
    confirmarEliminacion(id) {
      this.idEliminar = id;
      this.modalEliminar = true;
    },
    async eliminarUserConfirmado() {
      this.loading = true;
      try {
        const response = await apiClient.deleteUser(this.idEliminar);
        if (response.success ) {
          toast.success("Usuario eliminado con éxito.");
          this.fetchUsuarios();
        } else {
          toast.error("Error al eliminar el usuario.");
        }
      } catch (error) {
        toast.error("Error al eliminar el usuario.");
      } finally {
          this.cerrarModalEliminar();
          this.loading = false;
      }
    },
    async guardarEdicion() {
      this.modalAbierto = false; 
      this.loading = true;
      try {
        const response = await apiClient.updateUser(this.formEdicion._id, this.formEdicion);
        if (response.success ) {
          toast.success("Usuario actualizado con éxito.");
          this.fetchUsuarios();
          this.cerrarModal();
        } else {
          toast.error("Error al actualizar el usuario.");
        }
      } catch (error) {
        toast.error("Error al guardar la edición.");
      } finally {
        this.loading = false; 
      }
    },
    cerrarModal() {
      this.modalAbierto = false;
      this.formEdicion = { _id: "", name: "", phone: "", email: "" };
    },
    cerrarModalEliminar() {
      this.modalEliminar = false;
      this.idEliminar = null;
    },
  },
  async mounted() {
    this.loadingUsuarios = true;
    await this.fetchUsuarios();
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
  