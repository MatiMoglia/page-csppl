import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://cspplss-9f23.restdb.io/rest/", 
    headers: { 'x-apikey': "67dc5b4c1b71d92fc596efe6" },
});

export default {
    async obtenerAdherentes(query = "") {
        try {
          const response = await apiClient.get(`servicios?q={"nroTitular": "${query}"}`);
          return { success: true, data: response.data };
        } catch (error) {
          return manejarError(error, "Error al obtener los adherentes");
        }
    },
    async agregarFamiliar(adherentes) {
        try {
            const response = await apiClient.post("servicios", adherentes);
            return { success: true, data: response.data }; 
        } catch (error) {
            return manejarError(error, "Error al agregar el familiar");
        }
    },
    async obtenerDatosTitular(nroTitular) {
        try {
            const response = await apiClient.get(`servicios?q={"nroTitular": "${nroTitular}"}`);
            
            if (response.data.length > 0) {
                const titular = response.data[0]; 
                return { success: true, data: { dniTitular: titular.dniTitular, titular: titular.titular } };
            } else {
                return { success: false, message: "Titular no encontrado" };
            }
        } catch (error) {
            return manejarError(error, "Error al obtener los datos del titular");
        }
    },
    async guardarNuevoTitular(titular) {
        try {
            const response = await apiClient.post("servicios", {
                nroTitular: titular.numero, 
                dniTitular: titular.dni,
                titular: titular.nombre,  
          });
          
          return { success: true, data: response.data };
        } catch (error) {
          return manejarError(error, "Error al guardar el nuevo titular");
        }
    },
    async eliminarAdherente(id) {
        try {
            await apiClient.delete(`servicios/${id}`);
            return { success: true, message: "Adherente eliminado correctamente" };
          } catch (error) {
            return manejarError(error, "Error al eliminar el adherente");
        }
    },
    async obtenerDatos() {
        try {
            const response = await apiClient.get("servicios");
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al obtener el adherente");
        }
    },
    async actualizarAdherente(id, formData) {
        try {
            const response = await apiClient.patch(`servicios/${id}`, formData);
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al actualizar el formulario");
        }
    },
};

function manejarError(error, mensaje) {
    console.error(mensaje, error);
    return { success: false, error: mensaje };
}