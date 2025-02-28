import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csspl-63d5.restdb.io/rest/", 
  headers: { 'x-apikey': "67c1f29f27500f548f0a4a9f" },
});

export default {
  getAuthorities() {
    return apiClient.get("autoridades");  
  }
};


