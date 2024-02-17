import request from "@/services/request";

const state = {
  users: [],
  currentUser: { name: "me" },
  session_url: "/users",
  login_url: "/users/login",
  register_url: "/users",
  logout_url: "/auth/logout",
  token: null,
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
};

const actions = {
  async login({ commit, state }, payload) {
    const isLoggedIn = await request.post(state.login_url, payload);
    console.log(payload);
    console.log({ isLoggedIn });
    if (!isLoggedIn?.status) return;
    localStorage["userToken"] = isLoggedIn?.data?.token;
    localStorage["userData"] = JSON.stringify(isLoggedIn?.data?.user);
    localStorage["storeData"] = JSON.stringify(isLoggedIn?.data?.store_details);
    commit("loginUser", payload);
  },
  async logout({ commit, state }) {
    try {
      const response = await request.get(state.logout_url);
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
