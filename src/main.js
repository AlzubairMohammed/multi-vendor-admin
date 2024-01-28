import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "./style/index.css";
import "./style/style.css";
import "flowbite";
import "sweetalert2/dist/sweetalert2.min.css";

// Import loading stuff
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import("preline");
import "boxicons";

createApp(App)
  .use(store)
  .use(VueLoading)
  .use(router)
  .use(VueSweetalert2)
  .mount("#app");
