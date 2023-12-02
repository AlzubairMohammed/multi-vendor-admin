import axios from "./axios.js";
import responseAlert from "./sweet_alert.js";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading({
  // options
});

const request = {
  get: (url, options) => {
    return new Promise((resolve, reject) => {
      const loader = $loading.show({
        // Optional parameters
      });
      try {
        // JsLoadingOverlay.show(loading_options);
        axios.get(url, options).then((res) => {
          if (res.data.status) {
            // JsLoadingOverlay.hide();
            responseAlert("success", "success", "add complete successfully");
            loader.hide();

            resolve(res.data);
          } else {
            // JsLoadingOverlay.hide();
            responseAlert("success", "خطاء", res.data.data.message);
            loader.hide();

            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        loader.hide();

        reject();
      }
    });
  },
  post: (url, payload, options) => {
    return new Promise((resolve, reject) => {
      const loader = $loading.show({
        // Optional parameters
      });
      try {
        axios.post(url, payload, options).then((res) => {
          if (res.data.status) {
            loader.hide();
            responseAlert("success", "نجاح", res.data.data.msg);
            resolve(res.data);
          } else {
            loader.hide();
            responseAlert("success", "خطاء", res.data.data.message);
            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        reject();
        loader.hide();
      }
    });
  },
  put: (url, id, payload, options) => {
    return new Promise((resolve, reject) => {
      const loader = $loading.show({
        // Optional parameters
      });
      try {
        axios.put(`${url}/${id}`, payload, options).then((res) => {
          if (res.data.status) {
            loader.hide();
            responseAlert("success", "نجاح", res.data.data.message);
            resolve(res.data);
          } else {
            loader.hide();
            responseAlert("success", "خطاء", res.data.data.message);
            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        loader.hide();
        reject();
      }
    });
  },
  delete: (url, id, options) => {
    return new Promise((resolve, reject) => {
      const loader = $loading.show({
        // Optional parameters
      });
      try {
        axios.delete(`${url}/${id}`, options).then((res) => {
          if (res.data.status) {
            loader.hide();
            responseAlert("success", "نجاح", res.data.data.message);
            resolve(res.data);
          } else {
            loader.hide();
            responseAlert("success", "خطاء", res.data.data.message);
            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        loader.hide();

        reject();
      }
    });
  },
};

export default request;
