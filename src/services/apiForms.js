import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csppl-fd7e.restdb.io/rest/",
  headers: { "x-apikey": "67d4e0a7dc399be3a048db8f" },
});
export default {
  async enviarFormulario(formData) {
    try {
      const response = await apiClient.post('forminternet', formData);
  
      if (response.status === 201) {
        console.log('Formulario enviado correctamente', response.data);
        return response.data;  
      } else {
        console.error('Error al enviar el formulario:', response);
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error en la solicitud de la API:', error);
      throw new Error(error.response?.data?.message || 'Error en la solicitud');
    }
  },
  async obtenerFormulario(id) {
    try {
      const response = await apiClient.get(`forminternet/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el formulario:', error);
      throw new Error('Error en la solicitud');
    }
  },

};