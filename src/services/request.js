import Swal from "sweetalert2";
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
          if (res?.data?.status) {
            loader.hide();

            resolve(res?.data);
          } else {
            // JsLoadingOverlay.hide();
            loader.hide();

            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        responseAlert("error", "خطاء", "عفوا حدث خطاء ما ");

        loader.hide();

        reject();
      }
      loader.hide();
    });
  },
  post: (url, payload, options) => {
    let loader;
    if (!url.includes("search")) {
      loader = $loading.show({
        // Optional parameters
      });
    }
    return new Promise((resolve, reject) => {
      try {
        axios.post(url, payload, options).then((res) => {
          if (res.data.status) {
            resolve(res?.data);
            if (url?.includes("search") || url?.includes("paginate")) {
              console.log("search request");
            } else {
              responseAlert("success", "نجاح", res?.data?.msg);
              loader.hide();
            }
          } else {
            loader.hide();
            responseAlert("error", "خطاء", res?.data?.msg);
            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        loader.hide();
        reject();
        if (url.includes("search")) {
          console.log("search request");
        } else {
          console.log("paginate error");
          responseAlert("error", "خطاء", "عفوا حدث خطاء ما ");
        }
      }
      if (url.includes("search")) {
        console.log("search request");
      } else {
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
            responseAlert("success", "نجاح", "تم التعديل بنجاح");
            resolve(res.data);
          } else {
            loader.hide();
            responseAlert("warning", "تنبيه", res?.data?.msg);
            reject();
          }
        });
      } catch (error) {
        console.log("http request error");
        loader.hide();
        responseAlert("error", "خطاء", "عفوا حدث خطاء ما ");

        reject();
      }
      loader.hide();
    });
  },
  delete: (url, id, options) => {
    return new Promise((resolve, reject) => {
      try {
        Swal.fire({
          title: "هل انت متأكد ؟",
          text: "لن تستطيع استعادة العنصر بعد الحذف !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم , قم بالحذف",
          cancelButtonText: "لا, الغاء الحذف!",
          reverseButtons: true,
        }).then((result) => {
          if (result?.isConfirmed) {
            axios.delete(`${url}/${id}`, options).then((res) => {
              if (res?.data?.status) {
                console.log("deleted data");
                responseAlert("success", "نجاح", "تم الحذف بنجاح");

                resolve(res?.data);
              } else {
                responseAlert("error", "خطاء", "عفوا حدث خطاء ما ");
                reject();
              }
            });
          }
        });
      } catch (error) {
        console.log("http request error");
        responseAlert("error", "خطاء", "عفوا حدث خطاء ما ");

        reject();
      }
    });
  },
};

export default request;
