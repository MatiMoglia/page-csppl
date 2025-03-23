import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csppl-fd7e.restdb.io/rest/",
  headers: { "x-apikey": "67d4e0a7dc399be3a048db8f", "Content-Type": "application/json" },
});

export default {
    async enviarFormulario(formData) {
      try {
        const response = await apiClient.post("forminternet", formData);
        return { success: true, data: response.data };
      } catch (error) {
        return manejarError(error, "Error al enviar el formulario");
      }
  },
  async obtenerFormularios() {
      try {
        const response = await apiClient.get("forms");
        return { success: true, data: response.data };
      } catch (error) {
        return manejarError(error, "Error al obtener el formulario");
      }
  },
  async actualizarFormulario(id, formData) {
      try {
        const response = await apiClient.patch(`/forms/${id}`, formData);
        return { success: true, data: response.data }; 
      } catch (error) {
        return manejarError(error, "Error al actualizar el formulario");
      }
  },
  async eliminarFormulario(id) {
      try {
        await apiClient.delete(`forms/${id}`);
        return { success: true, message: "Formulario eliminado correctamente" };
      } catch (error) {
        return manejarError(error, "Error al eliminar el formulario");
      }
  },
  async buscarForms(email) {
    try {
        const response = await apiClient.get(`forms?q={"email": "${email}"}`);
        
        return response.data.length > 0 ? response.data : []; 
    } catch (error) {
        console.error("Error al obtener reclamos:", error);
        return []; 
    }
  }
};

function manejarError(error, mensaje) {
  console.error(mensaje, error.response?.data || error.message);
  return { success: false, error: error.response?.data?.message || mensaje };
}
