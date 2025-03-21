import apiSS from "@/services/apiSS";

export default {
  namespaced: true,
  state: {
    adherentes: [],
  },
  mutations: {
    SET_ADHERENTES(state, adherentes) {
      state.adherentes = adherentes;
    },
  },
  actions: {
    async fetchAdherentes({ commit }, query = "") {
      try {
        const response = await apiSS.obtenerAdherentes(query);
        console.log("Respuesta de adherentes: ", response);
        if (response.success) {
          commit("SET_ADHERENTES", response.data);
        } else {
          console.error("Error al obtener adherentes:", response.error);
        }
      } catch (error) {
        console.error("Error al obtener adherentes:", error);
      }
    },
  },
  getters: {
    getAdherentes: (state) => state.adherentes,
  },
};
