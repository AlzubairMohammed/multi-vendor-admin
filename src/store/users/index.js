import axios from "axios";

const state = {
  users: [],
  currentUser: { name: "me" },
  session_url: "/api/v1/users",
  login_url: "/api/v1/auth/adminlogin",
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
  async login({ commit, state }, user) {
    try {
      const response = await axios.post(state.login_url, user);
      localStorage.setItem("GDSC_token", response.data.token);
      commit("loginUser", response.data);
    } catch (err) {
      commit("loginUser", err.response.data);
    }
  },
  async register({ commit, state }, user) {
    try {
      const response = await axios.post(state.register_url, user);
      if (response.data.success) {
        commit("registerUser", response.data);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      commit("registerUser", err.response.data);
      return false;
    }
  },
  async logout({ commit, state }) {
    try {
      const response = await axios.get(state.logout_url);
      localStorage.removeItem("GDSC_token");
      commit("logoutUser", response.data);
    } catch (err) {
      commit("logoutUser", err.response.data);
    }
  },
  async fetchUsers({ commit, state }) {
    const response = await axios.get(state.session_url);
    console.log(response.data);
    commit("setUsers", response.data);
  },
  async updateUser({ commit, state }, payload) {
    try {
      const { id, user } = payload;
      const response = await axios.put(
        `${state.session_url}/${id}`,
        user,
        state.config
      );
      if (response.data.success) {
        commit("editUser", payload);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async deleteUser({ commit, state }, id) {
    try {
      const response = await axios.delete(
        `${state.session_url}/${id}`,
        state.config
      );
      let index = null;
      state.users.forEach((element) => {
        if (element.id == id) {
          index = state.users.indexOf(element);
          if (index > -1) {
            state.users.splice(index, 1);
          }
        }
      });
      if (response.data.success) {
        commit("removeUser", id);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.currentUser = user;
  },
  newUser: (state, user) => {
    state.users.unshift(user);
  },
  loginUser: (state, user) => {
    if (user.success == true) {
      state.token = user.token;
    }
  },
  registerUser: (state, data) => {
    if (data.success == true) {
      state.users.unshift(data.user);
    }
  },
  logoutUser: (state, data) => {
    if (data.success == true) {
      state.token = null;
    }
  },
  removeUser: (state, id) => {
    let index = null;
    state.users.forEach((element) => {
      if (element.id == id) {
        index = state.users.indexOf(element);
        if (index > -1) {
          state.users.splice(index, 1);
        }
      }
    });
  },
  editUser: (state, data) => {
    state.users.forEach((element) => {
      if (element.id == data.id) {
        element = data.user;
      }
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
