<template>
  <div class="w-full py-8 px-24">
    <page-header title="الطلبات" />
    <div class="flex justify-between items-center py-4">
      <div class="relative">
        <input
          type="email"
          class="peer py-3 px-6 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="بحث"
          v-model="search_term"
          @input="search()"
        />
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
        >
          <box-icon color="grey" name="search"></box-icon>
        </div>
      </div>
    </div>

    <div class="table w-full">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">الرقم</th>
              <th scope="col" class="px-6 py-3">اسم المستخدم</th>
              <th scope="col" class="px-6 py-3">الاجمالي</th>
              <th scope="col" class="px-6 py-3">تاريخ الطلب</th>
              <th scope="col" class="px-6 py-3">العمليات</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(app, index) in orders"
              :key="app.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ (index += 1) }}
              </th>
              <td class="px-6 py-4">{{ app?.user?.name }}</td>
              <td class="px-6 py-4">{{ app?.total }}</td>
              <td class="px-6 py-4">{{ app?.created }}</td>
              <td class="px-6 py-4">
                <router-link
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  :to="`/orders_page/${app.id}`"
                >
                  عرض الطلب
                </router-link>
                <button
                  data-hs-overlay="#edit-modal"
                  @click="setModalData(app)"
                  type="button"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  تعديل
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav class="flex justify-center my-4" v-if="tot > 1">
          <ul class="inline-flex -space-x-px text-base h-10">
            <li
              v-for="page_number in tot"
              @click="handlePagination(page_number)"
              :key="page_number"
            >
              <a
                :class="{
                  'bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-900 ':
                    page_number == page,
                }"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{{ page_number }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="edit-modal">
      <div
        id="edit-modal"
        class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div
          class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto"
        >
          <div
            class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
          >
            <div
              class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700"
            >
              <h3 class="font-bold text-gray-800 dark:text-white">
                تعديل حالة الطلب
              </h3>
              <button
                type="button"
                class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#edit-modal"
              >
                <span class="sr-only">اغلاق</span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <form @submit.prevent="edit()" ref="edit_form">
              <div class="p-4 overflow-y-auto">
                <div class="input-group">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >حالة الطلب</label
                  >
                  <select
                    name="order_status"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="in_progress">قيد الاجراء</option>
                    <option value="completed">مكتمل</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import request from "../services/request";
export default {
  components: { PageHeader },
  data() {
    return {
      data: {},
      orders: [],
      limit: 10,
      page: 1,
      tot: 1,
      search_term: "",
    };
  },
  methods: {
    async add() {
      const form_data = new FormData(this.$refs.add_form);
      const response = await request.post("orders", form_data);
      this.get();
      console.log(response);
    },
    async edit() {
      const form_data = new FormData(this.$refs.edit_form);
      const response = await request.put(`orders/${this.data.id}`, form_data);
      this.get();
      console.log(response);
    },
    setModalData(app) {
      this.data = Object.assign({}, app);
    },
    async delete_item(app) {
      const response = await request.delete(`orders/${app.id}`);
      this.get();
      console.log(response);
    },
    async get() {
      const response = await request.post("orders/paginate", {
        limit: this.limit,
        page: this.page,
      });
      this.tot = Math.ceil(response.tot / this.limit);
      this.orders = response.data;
      console.log(response);
    },
    async search() {
      const response = await request.post("orders/search", {
        limit: 10,
        page: 1,
        search: this.search_term,
        col: "name",
      });
      this.orders = response.data;
      console.log(response);
    },
    handlePagination(page) {
      this.page = page;
      this.get();
    },
  },
  created() {
    this.get();
  },
};
</script>

<style></style>
