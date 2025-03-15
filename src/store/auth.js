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
          user = Object.assign({}, user, { 
            isAdmin: user.email === "admcsppl@gmail.com" && user.password === "admin123"
          });
    
          console.log("User with isAdmin:", user);
          commit("SET_USER", user);
          return true;
        } else {
          console.log("Email o contraseña incorrectos.");
        }
      } catch (error) {
        console.log("Error al intentar iniciar sesión:", error);
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
