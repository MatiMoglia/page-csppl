import apiUsers from "@/services/apiUsers";

export default {
  namespaced: true,
  state: {
    usuarios: [],
  },
  mutations: {
    SET_USUARIOS(state, usuarios) {
      state.usuarios = usuarios;
    },
  },
  actions: {
    async fetchUsuarios({ commit }) {
      try {
        const response = await apiUsers.getAllUsers();
        console.log("Usuarios obtenidos: ", response)
        commit("SET_USUARIOS", response);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    },
  },
  getters: {
    getUsuarios: (state) => state.usuarios,
  },
};
