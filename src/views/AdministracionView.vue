<template>
    <div class="admin-container">
      <h2>Administrar Formularios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>DNI</th>
            <th>Domicilio</th>
            <th>Email</th>
            <th>Acción</th>
            <th>descripcion</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="form in formularios" :key="form._id">
            <td>{{ form.nombre }}</td>
            <td>{{ form.telefono }}</td>
            <td>{{ form.dni }}</td>
            <td>{{ form.domicilio }}</td>
            <td>{{ form.email }}</td>
            <td>{{ form.accion }}</td>
            <td>{{ form.descripcion }}</td>
            <td>{{ form.fechapedido }}</td>
            <td>
              <button @click="editarFormulario(form)">✏️ Editar</button>
              <button @click="eliminarFormulario(form._id)">🗑️ Eliminar</button>
              <button @click="imprimirFormulario(form)">🖨️ Imprimir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="modalAbierto" class="modal">
        <div class="modal-content">
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
  
          <button @click="guardarEdicion" :disabled="loading">
            💾 {{ loading ? "Guardando..." : "Guardar" }}
          </button>
          <button @click="cerrarModal">❌ Cerrar</button>
        </div>
      </div>
    </div>
</template>
  
<script>
import apiClient from "../services/apiForms";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
      return {
        formularios: [],
        modalAbierto: false,
        formEdicion: { 
            nombre: "",
            telefono: "",
            dni: "",
            accion: "",
            email:"",
            domicilio: "",
            descripcion: "",
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
      async eliminarFormulario(id) {
        if (!confirm("¿Seguro que deseas eliminar este formulario?")) return;
        
        try {
          const response = await apiClient.eliminarFormulario(id);
          if (response.success) {
            this.formularios = this.formularios.filter((f) => f._id !== id);
          } else {
            toast.error("Error al eliminar el formulario", response.error);
          }
        } catch (error) {
          toast.error("Error eliminando el formulario", error);
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
        if (!this.formEdicion.nombre || !this.formEdicion.telefono || !this.formEdicion.dni) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }
        this.loading = true;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Agrega ceros si es necesario
        const day = String(now.getDate()).padStart(2, "0");

        this.formEdicion.fechapedido = `${year}/${month}/${day}`;

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
            alert("Error al guardar la edición.");
            console.error("Error:", error);
        } finally {
            this.loading = false;
        }
        },
      cerrarModal() {
        this.modalAbierto = false;
      },
    },
    mounted() {
      this.cargarFormularios();
    },
  };
</script>
  
<style scoped>
.admin-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}
  
h2 {
    text-align: center;
}
  
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
  
th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}
  
th {
    background: #f4f4f4;
}
button {
    margin: 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
}
  
button:hover {
    opacity: 0.8;
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
    border-radius: 5px;
    width: 300px;
}
  
input, select {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
  