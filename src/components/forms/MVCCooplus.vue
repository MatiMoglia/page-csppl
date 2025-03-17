<template>
    <div class="admin-container">
      <h2>Administrar Formularios de COOPLUS</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>DNI</th>
              <th>Domicilio</th>
              <th :style="{ width: '200px' }">Email</th>
              <th :style="{ width: '70px' }">Pack</th>
              <th :style="{ width: '70px' }">Decos</th>
              <th :style="{ width: '70px' }">Cuentas</th>
              <th>Fecha Pedido</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="form in formularios" :key="form._id">
              <td>{{ form.nombre }}</td>
              <td>{{ form.telefono }}</td>
              <td>{{ form.dni }}</td>
              <td>{{ form.domicilio }}</td>
              <td style="font-size: 0.8rem; color: #1f2c79; font-weight: bold;">{{ form.email }}</td>
              <td>{{ form.pack }}</td>
              <td>{{ form.decos }}</td>
              <td>{{ form.cuentas }}</td>
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
        <label>Packs:</label>
        <select v-model="formEdicion.pack" required>
          <option value="">Selecciona un pack</option>
          <option value="Pack Hogar">Pack Hogar</option>
          <option value="Pack CooPlus">Pack CooPlus</option>
        </select>
        <label>Decos:</label>
        <select v-model="formEdicion.decos" required>
          <option value="">Selecciona un pack</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="Más de 3">Más de 3</option>
        </select>
        <div v-if="formEdicion.decos === 'Más de 3'">
            <label for="cuentaAdicional">Decos adicionales *</label>
            <input type="number" id="cuentaAdicional" v-model="formEdicion.cuentas" :class="{'input-error': !formEdicion.cuentas && formSubmittedAdhesion}" required />
        </div>
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
  import apiClient from "@/services/apiCooplus";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    data() {
      return {
        formularios: [],
        modalAbierto: false,
        modalEliminar: false,
        idEliminar: null,
        formEdicion: { 
            nombre: '',
            direccion: '',
            dni: '',
            fechaNacimiento: '',
            telefono: '',
            email: '',
            pack: '',
            decos: '',
            cuentas: '',
            fechapedido: "",
        },
        loading: false,
      };
    },
    methods: {
      async cargarFormularios() {
        try {
          const response = await apiClient.obtenerFormularios();
          if (response.success && Array.isArray(response.data)) {
            this.formularios = response.data;
          } else {
            console.log(response);
            toast.error("Error al cargar formularios", response.error || "Datos inválidos");
          }
        } catch (error) {
          toast.error("Error cargando los formularios", error);
        }
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
        }
      },
      imprimirFormulario(form) {
        const contenido = `
          <h2>Formulario de COOPLUS </h2>
          <p><strong>Nombre:</strong> ${form.nombre}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Teléfono:</strong> ${form.telefono}</p>
          <p><strong>DNI:</strong> ${form.dni}</p>
          <p><strong>Email:</strong> ${form.email}</p>
          <p><strong>Fecha pedido:</strong> ${form.fechapedido}</p>
          <p><strong>Pack seleccionado:</strong> ${form.pack}</p>
          <p><strong>Decos:</strong> ${form.decos}</p>
        `;
        const ventana = window.open("", "", "width=600,height=400");
        ventana.document.write(contenido);
        ventana.document.close();
        ventana.print();
      },
      async guardarEdicion() {
        if (!this.formEdicion.nombre || !this.formEdicion.telefono || !this.formEdicion.dni) {
          toast.error("Todos los campos son obligatorios.");
          return;
        }
        this.loading = true;
  
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
    mounted() {
      this.cargarFormularios();
    },
  };
  </script>
  <style scoped>
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
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
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
    width: 350px;
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
    font-size: 24px;
    cursor: pointer;
  }
  
  .modal-actions button:hover {
    color: #007bff;
  }
  .eliminar {
    margin-top: 20px; 
  }
  .eliminar button:hover {
    font-size: 20px; 
  } 
  </style>