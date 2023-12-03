<template>
  <app-layout>
    <router-view />
  </app-layout>
  <!-- <div v-else>
    <login-page></login-page>
  </div> -->
</template>
<script>
// import AppHeader from "./components/AppHeader.vue";
// import LoginPage from "./views/LoginPage.vue";
import moment from "moment";
import AppLayout from "./components/AppLayout.vue";

export default {
  data() {
    return {
      user_session: localStorage.getItem("GDSC_token"),
    };
  },
  components: {
    AppLayout,
    // AppHeader,
    // LoginPage,
  },
  methods: {
    closeAddModal() {
      this.isShowAddModal = false;
    },
    showAddModal() {
      this.isShowAddModal = true;
    },
    closeEditModal() {
      this.isShowEditModal = false;
    },
    showEditModal() {
      this.isShowEditModal = true;
    },
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    // async checkCookie() {
    //   if (localStorage.getItem("GDSC_token") === null) {
    //     this.responseAlert(" الرجاء تسجيل الدخول ", " عفوا ", "warning");
    //     this.$router.push("/LoginPage");
    //   }
    // },
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
