import request from "@/services/request";
const state = {
  Products: [],
  Categories: [],
  session_url: "products",
  get_products_url: "products/by-vendor-id/paginate",
  get_categories_url: "sub-categories",
  addError: [],
  config: {
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // "Content-Type": "application/xml",
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
  async fetchProducts({ commit, state }, data) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    data.vendor_id = userData.id;
    data.city_id = 2;
    const response = await request.post(state.get_products_url, data);
    commit("setProducts", response.data);
  },
  async fetchCategories({ commit, state }) {
    const response = await request.get(state.get_categories_url);
    commit("setCategories", response.data);
  },
  async addProduct({ commit, state }, Product) {
    Product.product_data.vendor_id = +JSON.parse(
      localStorage.getItem("userData")
    ).id;
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
