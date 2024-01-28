import axios from "axios";

const state = {
  users: [],
  currentUser: { name: "me" },
  session_url: "/api/users",
  login_url: "http://localhost:5000/api/users/login",
  register_url: "/api/v1/users",
  logout_url: "/api/v1/auth/logout",
  token: null,
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
};

const actions = {
  async login({ commit, state }, payload) {
    const isLoggedIn = await axios.post(state.login_url, payload);
    console.log(payload);
    console.log({ isLoggedIn });
    if (!isLoggedIn?.status) return;
    localStorage["userToken"] = isLoggedIn?.data?.data?.token;
    localStorage["userData"] = JSON.stringify(isLoggedIn?.data?.data?.user);
    commit("loginUser", payload);
  },
  async logout({ commit, state }) {
    try {
      const response = await axios.get(state.logout_url);
      localStorage.removeItem("user_token");
      commit("logoutUser", response.data);
    } catch (err) {
      commit("logoutUser", err.response.data);
    }
  },
};

const mutations = {
  setUser: (state, user) => {
    state.currentUser = user;
  },
  loginUser: (state, user) => {
    if (user.success == true) {
      state.token = user.token;
    }
  },
  logoutUser: (state, data) => {
    if (data.success == true) {
      state.token = null;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
