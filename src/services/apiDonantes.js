import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cspplss-9f23.restdb.io/rest/",
  headers: { 'x-apikey': "67dc5b4c1b71d92fc596efe6" },
});

export default {
    async obtenerDonantes() {
        try {
          const response = await apiClient.get("donantes");
          return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al obtener los donantes");
        }
    },
    async agregarDonante(donante) {
        try {
            const response = await apiClient.post("donantes", donante);
            return response.data;
        } catch (error) {
            return manejarError(error, "Error al inscribir el donante");
        }
    },
    async eliminarFormulario(id) {
        try {
          await apiClient.delete(`donantes/${id}`);
          return { success: true, message: "Donante eliminado correctamente" };
        } catch (error) {
          return manejarError(error, "Error al eliminar el formulario");
        }
      },
}

function manejarError(error, mensaje) {
    console.error(mensaje, error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || mensaje };
  }