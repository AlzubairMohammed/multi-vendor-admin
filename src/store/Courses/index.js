import axios from "axios";

const state = {
  Courses: [],
  session_url: "/api/v1/courses",
  addError: [],

};

const getters = {
  allCourses: (state) => {
    return state.Courses;
  },
};

const actions = {
  async fetchCourses({ commit, state }) {
    const response = await axios.get(state.session_url);
    commit("setCourses", response.data);
  },
  async addCourse({ commit, state }, Course) {
    try {
      const response = await axios.post(
        state.session_url,
        Course,
        state.config
      );
      if (response.data.success) {
        commit("newCourse", response.data);
        return true;
      } else {
        state.addError.push(response.data.message);
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async updateCourse({ commit, state }, payload) {
    try {
      // loader
      const { id, Course } = payload;
      const response = await axios.put(
        `${state.session_url}/${id}`,
        Course      );
      if (response.data.success) {
        commit("editCourse", payload);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async deleteCourse({ commit, state }, id) {
    try {
      const response = await axios.delete(
        `${state.session_url}/${id}`      );
      if (response.data.success) {
        commit("removeCourse", id);
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
  setCourses: (state, Courses) => {
    state.Courses = Courses;
  },
  newCourse: (state, Course) => {
    state.Courses.unshift(Course);
  },
  removeCourse: (state, id) => {
    let index = null;
    state.Courses.forEach((element) => {
      if (element.id == id) {
        index = state.Courses.indexOf(element);
        if (index > -1) {
          state.Courses.splice(index, 1);
        }
      }
    });
  },
  editCourse: (state, data) => {
    state.Courses.forEach((element) => {
      if (element.id == data.id) {
        element = data.Course;
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
