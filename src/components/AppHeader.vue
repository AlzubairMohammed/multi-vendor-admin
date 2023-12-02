<template>
  <aside class="md:w-64 w-full" aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
      <div class="flex items-center md:justify-center justify-between pl-2.">
        <span class="self-center text-xl font-semibold whitespace-nowrap"
          >لوحه التحكم</span
        >
        <svg
          @click="menuToggle()"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <ul class="md:block" :class="{ block: menuOpen, hidden: menuClose }">
        <!-- home -->
        <router-link to="/">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="mr-3">الاقسام </span>
            </a>
          </li>
        </router-link>

        <!-- certificate -->
        <router-link to="/categories_page">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span class="mr-3">الاقسام </span>
            </a>
          </li>
        </router-link>

        <!-- courses -->
        <router-link to="/Course">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>

              <span class="mr-3">الكورسات</span>
            </a>
          </li>
        </router-link>

        <!-- users -->
        <router-link to="/UsersPage">
          <li>
            <a
              href="#"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span class="mr-3">المستخدمين</span>
            </a>
          </li>
        </router-link>

        <!-- logout -->
        <li>
          <a
            type="button"
            @click="logout()"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="mr-3 text-red-500">تسجيل الخروج</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      menuClose: true,
      menuOpen: false,
    };
  },
  methods: {
    menuToggle() {
      this.menuClose = !this.menuClose;
      this.menuOpen = !this.menuOpen;
    },
    async logout() {
      await this.$store.dispatch("logout");
      await this.$router.push("/");
      location.reload();
      this.responseAlert(" تم ", " تم نسجيل الخروج بنجاح ", "success");
    },
  },
  inject: ["responseAlert"],
};
</script>

<style></style>
