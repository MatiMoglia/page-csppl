import { createStore } from "vuex";
import auth from "./auth";
import users from "./users";
import adherentes from "./adherentes";

export default createStore({
  modules: {
    auth,
    users,
    adherentes
  }
});