import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csppl-53a2.restdb.io/rest/",
  headers: { "x-apikey": "67d9f0a7eafa733b477f54ef" },
});

export default {
  async getNovedades() {
    try {
      const response = await apiClient.get("news");
      return response.data.map(novedad => ({
        id: novedad._id,
        titulo: novedad.titulo,
        subtitulo: novedad.subtitulo,
        contenido: novedad.contenido,
        fecha: novedad.fecha,
        imagen: novedad.imagen 
      }));
    } catch (error) {
      console.error("Error al obtener las novedades:", error);
      return [];
    }
  },
};
