import request from "@/services/request";
const state = {
  Products: [],
  Categories: [],
  session_url: "products",
  addError: [],
  config: {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
};

const getters = {
  getProducts: (state) => {
    return state.Products;
  },
  getCategories: (state) => {
    return state.Categories;
  },
};

const actions = {
  async fetchProducts({ commit, state }) {
    const response = await request.get(state.session_url);
    commit("setCategories", response.data);
  },
  async fetchCategories({ commit, state }) {
    const response = await request.get(state.session_url);
    commit("setProducts", response.data);
  },
  async addProduct({ commit, state }, Product) {
    // console.log(Product);
    const userData = localStorage.getItem("userData");
    Product.product_data.vendor_id = userData.id;
    try {
      const response = await request.post(
        state.session_url,
        Product,
        state.config
      );
      if (response.data.success) {
        commit("newProduct", response.data);
        return true;
      } else {
        state.addError.push(response.data.message);
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async updateProduct({ commit, state }, payload) {
    console.log(payload);
    try {
      // loader
      const { id, Product } = payload;
      const response = await request.put(`${state.session_url}/${id}`, Product);
      if (response.data.success) {
        commit("editProduct", payload);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  async deleteProduct({ commit, state }, id) {
    try {
      const response = await request.delete(state.session_url, id);
      if (response.data.success) {
        commit("removeProduct", id);
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
  setProducts: (state, Products) => {
    state.Products = Products;
  },
  setCategories: (state, Categories) => {
    state.Categories = Categories;
  },
  newProduct: (state, Product) => {
    state.Products.unshift(Product);
  },
  removeProduct: (state, id) => {
    let index = null;
    state.Products.forEach((element) => {
      if (element.id == id) {
        index = state.Products.indexOf(element);
        if (index > -1) {
          state.Products.splice(index, 1);
        }
      }
    });
  },
  editProduct: (state, data) => {
    state.Products.forEach((element) => {
      if (element.id == data.id) {
        element = data.Product;
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
