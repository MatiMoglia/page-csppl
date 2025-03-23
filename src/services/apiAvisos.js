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
    } 
}; 
