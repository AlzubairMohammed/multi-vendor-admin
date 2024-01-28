<template>
  <router-view />
  <!-- <div v-else>
    <login-page></login-page>
  </div> -->
</template>
<script>
// import AppHeader from "./components/AppHeader.vue";
// import LoginPage from "./views/LoginPage.vue";
import moment from "moment";

export default {
  data() {
    return {
      user_session: localStorage.getItem("userToken"),
    };
  },
  components: {
    // AppHeader,
    // LoginPage,
  },
  methods: {
    closeAddModal() {
      this.isShowAddModal = true;
    },
    showAddModal() {
      this.isShowAddModal = true;
    },
    closeEditModal() {
      this.isShowEditModal = true;
    },
    showEditModal() {
      this.isShowEditModal = true;
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    async checkCookie() {
      if (localStorage.getItem("userToken") === "undefined") {
        this.responseAlert(" الرجاء تسجيل الدخول ", " عفوا ", "warning");
        this.$router.push("/Login");
      }
    },
    // all response alert
    responseAlert(text, title, icon) {
      this.$swal.fire({
        title: `${title}`,
        text: ` ${text} `,
        icon: `${icon}`,
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
  provide() {
    return {
      checkCookie: this.checkCookie,
      responseAlert: this.responseAlert,
      dateTime: this.dateTime,
    };
  },
  // async created() {
  //   await this.checkCookie();
  // },
};
</script>

<style></style>
