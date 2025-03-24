import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cspplss-9f23.restdb.io/rest/",
  headers: { 'x-apikey': "67dc5b4c1b71d92fc596efe6" },
});

export default {
    async obtenerDatos() {
        try {
          const response = await apiClient.get("avisos");
          return { success: true, data: response.data };
        } catch (error) {
          console.error(error);
          return { success: false, message: "Error al obtener los datos." };
        }
    },
    async enviarAviso(aviso) {
        try {
            const response = await apiClient.post("avisos", aviso);
            return response.data; 
        } catch (error) {
            return manejarError(error, "Error al enviar los datos");
        }
    },
    async eliminarAviso(id) {
        try {
          await apiClient.delete(`avisos/${id}`);
          return { success: true, message: "Aviso eliminado correctamente" };
        } catch (error) {
          return manejarError(error, "Error al eliminar el aviso");
        }
    },
    async actualizarDatos(id, formData) {
      try {
        const response = await apiClient.patch(`avisos/${id}`, formData);
        return { success: true, data: response.data }; 
      } catch (error) {
        return manejarError(error, "Error al actualizar el formulario");
      }
    },
}; 
function manejarError(error, mensaje) {
  console.error(mensaje, error.response?.data || error.message);
  return { success: false, error: error.response?.data?.message || mensaje };
}
