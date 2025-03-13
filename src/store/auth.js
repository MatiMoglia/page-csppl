import apiUsers from "@/services/apiUsers";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const user = await apiUsers.loginUser(email, password);
      if (user) {
        commit("SET_USER", user);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit("LOGOUT");
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  }
};