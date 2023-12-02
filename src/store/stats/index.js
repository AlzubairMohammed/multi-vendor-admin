import axios from "axios";

const state = {
  stats: [],
  session_url: "http://localhost:5000/api/v1/stats",
  addError: [],
  config: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  },
};

const getters = {
  allStats: (state) => {
    return state.stats;
  },
};

const actions = {
  async fetchStats({ commit, state }) {
    const response = await axios.get(state.session_url, state.config);
    commit("setStats", response.data);
  },
};

const mutations = {
  setStats: (state, stats) => {
    state.stats = stats;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
