import { createStore } from "vuex";
import Cetrtificates from "./Cetrtificates";
import users from "./users";
import Courses from "./Courses";
import stats from "./stats";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Cetrtificates,
    users,
    Courses,
    stats
  },
});
