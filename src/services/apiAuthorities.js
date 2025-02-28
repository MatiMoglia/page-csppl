import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://csspl-63d5.restdb.io/rest/", 
  headers: { 'x-apikey': "67c0dac1c181a4151df68bf7" },
});

export default {
  getAuthorities() {
    return apiClient.get("autoridades");  
  },
  getImage(imageId) {
    return `https://csspl-63d5.restdb.io/media/${imageId}`;
  }
};


