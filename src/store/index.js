import { createStore } from "vuex";

import users from "./users";
import Products from "./Products";
import Attributes from "./Attributes";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    Products,
    Attributes,
  },
});
