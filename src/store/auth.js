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
      try {
        let user = await apiUsers.loginUser(email, password);

        if (!user) {
          console.log("Usuario no encontrado en la primera API. Intentando en la segunda API...");
          user = await apiUsers.loginUser2(email, password); 
        }

        if (user) {
          if (user.email === "admin@example.com" && user.password === "adminPassword") {
            user.isAdmin = true;
          } else {
            user.isAdmin = false; 
          }

          commit("SET_USER", user);
          return true;
        } else {
          throw new Error("Email o contraseña incorrectos.");
        }
      } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        throw new Error(error.message);
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async register({ commit }, user) {
      try {
        const newUser = await apiUsers.registerUser(user);
        commit("SET_USER", newUser);
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    isAdmin: (state) => state.user?.isAdmin || false, 
  }
};
