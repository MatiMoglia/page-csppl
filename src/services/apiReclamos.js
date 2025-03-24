import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cspplrc-83f2.restdb.io/rest/",
  headers: { 'x-apikey': "67ddd8fce43b4f93befb7c40" },
});

export default {
    async enviarReclamo(reclamo) {
        try {
            const response = await apiClient.post("reclamos", reclamo);
            return response.data;
        } catch (error) {
            return manejarError(error, "Error al enviar el reclamo");
        }
    },
    async obtenerReclamos() {
        try {
            const response = await apiClient.get("reclamos");
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al obtener los reclamos");
        }
    },
    async actualizarFormulario(id, formData) {
        try {
          const response = await apiClient.patch(`reclamos/${id}`, formData);
          return { success: true, data: response.data }; 
        } catch (error) {
          return manejarError(error, "Error al actualizar el formulario");
        }
    },
    async eliminarFormulario(id) {
        try {
          await apiClient.delete(`reclamos/${id}`);
          return { success: true, message: "Formulario eliminado correctamente" };
        } catch (error) {
          return manejarError(error, "Error al eliminar el formulario");
        }
    },
    async buscarReclamos(email) {
        try {
            const response = await apiClient.get(`reclamos?q={"email": "${email}"}`);
            
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