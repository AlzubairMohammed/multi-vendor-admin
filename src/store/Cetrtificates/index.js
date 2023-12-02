import axios from "axios";

const state = {
  Cetrtificates: [],
  session_url: "/api/v1/certifications",
  addError: [],
};

const getters = {
  allCetrtificates: (state) => {
    return state.Cetrtificates;
  },
};

const actions = {
  async fetchCetrtificates({ commit, state }) {
    const response = await axios.get(state.session_url);
    commit("setCetrtificates", response.data);
  },
  async addCetrtificate({ commit, state }, Cetrtificate) {
    try {
      const response = await axios.post(
        state.session_url,
        Cetrtificate,
        state.config
      );
      if (response.data.success) {
        commit("newCetrtificate", response.data);
        return true;
      } else {
        state.addError.push(response.data.message);
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async updateCetrtificate({ commit, state }, payload) {
    try {
      // loader
      const { id, Cetrtificate } = payload;
      const response = await axios.put(
        `${state.session_url}/${id}`,
        Cetrtificate,
        state.config
      );
      if (response.data.success) {
        commit("editCetrtificate", payload);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async deleteCetrtificate({ commit, state }, id) {
    try {
      const response = await axios.delete(
        `${state.session_url}/${id}`,
        state.config
      );
      if (response.data.success) {
        commit("removeCetrtificate", id);
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
  setCetrtificates: (state, Cetrtificates) => {
    state.Cetrtificates = Cetrtificates;
  },
  newCetrtificate: (state, Cetrtificate) => {
    state.Cetrtificates.unshift(Cetrtificate);
  },
  removeCetrtificate: (state, id) => {
    let index = null;
    state.Cetrtificates.forEach((element) => {
      if (element.id == id) {
        index = state.Cetrtificates.indexOf(element);
        if (index > -1) {
          state.Cetrtificates.splice(index, 1);
        }
      }
    });
  },
  editCetrtificate: (state, data) => {
    state.Cetrtificates.forEach((element) => {
      if (element.id == data.id) {
        element = data.Cetrtificate;
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
