import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cspplss-9f23.restdb.io/rest/",
  headers: { "x-apikey": "67dc5b4c1b71d92fc596efe6"},
});

export default {
    async enviarFormulario(formData) {
      try {
        const response = await apiClient.post("factdigital", formData);
        return { success: true, data: response.data };
      } catch (error) {
        return manejarError(error, "Error al enviar el formulario");
      }
    },
    async obtenerFormularios() {
      try {
        const response = await apiClient.get("factdigital");
        return { success: true, data: response.data };
      } catch (error) {
        return manejarError(error, "Error al obtener el formulario");
      }
    },
};