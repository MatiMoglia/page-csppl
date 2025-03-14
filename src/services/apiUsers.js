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
};
