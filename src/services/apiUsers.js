import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csspl-63d5.restdb.io/rest/",
  headers: { "x-apikey": "67c1f29f27500f548f0a4a9f" },
});
const apiClient2 = axios.create({
  baseURL: "https://csppl-b55b.restdb.io/rest/",
  headers: { "x-apikey": "67d3958faae5ec88fb1ea79d" },
});

export default {
  async loginUser(email, password) {
    try {
      const response = await apiClient.get(`usuarios?q={"email": "${email}", "password": "${password}"}`);
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  },
  async loginUser2(email, password) {
    try {
      const response = await apiClient2.get(`usuarios1?q={"email": "${email}", "password": "${password}"}`);
      if (response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error en la segunda API:", error);
      return null;
    }
  },
  async registerUser(user) {
    try {
      const emailCheck = await apiClient.get(`usuarios?q={"email": "${user.email}"}`);
      if (emailCheck.data.length > 0) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      const usernameCheck = await apiClient.get(`usuarios?q={"name": "${user.name}"}`);
      if (usernameCheck.data.length > 0) {
        throw new Error("El nombre de usuario ya está registrado.");
      }
      const response = await apiClient.post("usuarios", user);
      return response.data;
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      throw error;
    }
  },
  async getAllUsers() {
    try {
      const response1 = await apiClient.get("usuarios");
      const response2 = await apiClient2.get("usuarios1");
      console.log("Usuarios de la primera API: ", response1.data);
      console.log("Usuarios de la segunda API: ", response2.data);
      
      return [...response1.data, ...response2.data];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },
  async updateUser(id, userData) {
    try {
      await apiClient.patch(`usuarios/${id}`, userData);
      return { success: true, message: "Formulario eliminado correctamente" };
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return { success: false, error: error.response?.data?.message || "Error al actualizar el usuario" };
    }
  },
  async deleteUser(id) {
    try {
      await apiClient.delete(`usuarios/${id}`);
      return { success: true, message: "Formulario eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return { success: false, error: error.response?.data?.message || "Error al eliminar el usuario" };
    }
  },
  async updateUser2(id, userData) {
    try {
      await apiClient2.patch(`usuarios1/${id}`, userData);
      return { success: true, message: "Formulario eliminado correctamente" };
    } catch (error) {
      console.error("Error al actualizar el usuario en la segunda API:", error);
      return { success: false, error: error.response?.data?.message || "Error al actualizar el usuario" };
    }
  },
  async deleteUser2(id) {
    try {
      await apiClient2.delete(`usuarios1/${id}`);
      return { success: true, message: "Formulario eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el usuario en la segunda API:", error);
      return { success: false, error: error.response?.data?.message || "Error al eliminar el usuario" };
    }
  },
  async asociarTitular(usuarioId, nroTitular) {
    try {
      const response = await apiClient.patch(`usuarios/${usuarioId}`, { nroTitular });
        return { success: true, data: response.data };
    } catch (error) {
        return manejarError(error, "Error al asociar el número de titular");
    }
  },
  async validarContrasena(id, password) {
    try {
      const response = await apiClient.get(`usuarios?q={"_id": "${id}", "password": "${password}"}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error al validar la contraseña:", error);
      return false;
    }
  }
};
function manejarError(error, mensaje) {
  console.error(mensaje, error);
  return { success: false, message: mensaje, error: error };
}
