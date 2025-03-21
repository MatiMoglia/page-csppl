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
    }
};

function manejarError(error, mensaje) {
    console.error(mensaje, error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || mensaje };
  }