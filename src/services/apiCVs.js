import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csppl-b55b.restdb.io/rest/",
  headers: { "x-apikey": "67d3958faae5ec88fb1ea79d"}
});

export default {
    async enviarCV(cv) {
        try {
            const response = await apiClient.post("curriculum", cv);
            return response.data;
        } catch (error) {
            return manejarError(error, "Error al enviar el cv");
        }
    },
    async obtenerCVS() {
        try {
            const response = await apiClient.get("curriculum");
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al obtener el cv");
        }
    },
    async eliminarCV(id) {
        try {
            await apiClient.delete(`curriculum/${id}`);
            return { success: true };
        } catch (error) {
            return manejarError(error, "Error al eliminar el cv");
        }
    }
}