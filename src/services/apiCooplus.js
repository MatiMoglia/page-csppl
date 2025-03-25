import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://csppl-fd7e.restdb.io/rest/",
    headers: { "x-apikey": "67d4e0a7dc399be3a048db8f", "Content-Type": "application/json" },
});

export default {
    async enviarFormulario(formData) {
        try {
            const response = await apiClient.post("formcooplus", formData);
            return response.data;
        } catch (error) {
            return manejarError(error, "Error al enviar el formulario");
        }
    },
    async obtenerFormularios() {
        try {
            const response = await apiClient.get("formcooplus");
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al obtener los formularios");
        }
    },
    async actualizarFormulario(id, formData) {
        try {
            const response = await apiClient.patch(`formcooplus/${id}`, formData);
            return { success: true, data: response.data };
        } catch (error) {
            return manejarError(error, "Error al actualizar el formulario");
        }
    },
    async eliminarFormulario(id) {
        try {
            await apiClient.delete(`formcooplus/${id}`);
            return { success: true, message: "Formulario eliminado correctamente" };
        } catch (error) {
            return manejarError(error, "Error al eliminar el formulario");
        }
    },
};

function manejarError(error, mensaje) {
    console.error(mensaje, error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || mensaje };
}
