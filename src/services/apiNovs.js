import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csppl-53a2.restdb.io/rest/",
  headers: { "x-apikey": "67d9f0a7eafa733b477f54ef" },
});

export default {
  async getNovedades() {
    try {
      const response = await apiClient.get("news");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error al obtener las novedades:", error);
      return [];
    }
  },
  async eliminarNovedades(id) {
    try {
      await apiClient.delete(`news/${id}`);
      return { success: true, message: "Publicacion eliminada correctamente" };
    } catch (error) {
      return manejarError(error, "Error al eliminar la Publicacion");
    }
  },
  async actualizarNovedades(id, formData) {
    try {
      const response = await apiClient.patch(`news/${id}`, formData);
      return { success: true, data: response.data }; 
    } catch (error) {
      return manejarError(error, "Error al actualizar la Publiacion");
    }
  },
  async cargarNovedad(publicacion) {
    try {
        const response = await apiClient.post("news", publicacion);
        return response.data;
    } catch (error) {
        return manejarError(error, "Error al enviar el Publicacion");
    }
  },
};
