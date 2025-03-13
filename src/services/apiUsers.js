import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csspl-63d5.restdb.io/rest/",
  headers: { "x-apikey": "67c1f29f27500f548f0a4a9f" },
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
  }
};