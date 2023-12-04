<template>
  <app-layout>
    <div class="w-full py-8 px-24">
      <page-header :title="`تفاصيل الطلب رقم #${orders?.id}`" />
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
        <div>
          <form @submit.prevent="edit()" ref="edit_form">
            <div class="p-4 overflow-y-auto flex items-center">
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
              <button
                type="submit"
                class="py-2 mx-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                تعديل حالة الطلب
              </button>
            </div>
          </form>
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
                <th scope="col" class="px-6 py-3">اسم المنتج</th>
                <th scope="col" class="px-6 py-3">صورة المنتج</th>
                <th scope="col" class="px-6 py-3">الكمية</th>
                <th scope="col" class="px-6 py-3">الباركود</th>
                <th scope="col" class="px-6 py-3">الاجمالي</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(app, index) in orders.order_details"
                :key="app.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ (index += 1) }}
                </th>
                <td class="px-6 py-4">{{ app?.product?.name }}</td>
                <td class="px-6 py-4 flex justify-center">
                  <img
                    width="100"
                    height="60"
                    :src="`http://localhost:5000/${
                      app?.product?.image?.split('public/')[1]
                    }`"
                    alt=""
                  />
                </td>
                <td class="px-6 py-4">{{ app?.qty }}</td>
                <td class="px-6 py-4">{{ app?.product?.barcode }}</td>
                <td class="px-6 py-4">{{ app?.total }}</td>
              </tr>
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  colspan="5"
                  scope="row"
                  class="px-6 py-4 font-bold text-black whitespace-nowrap dark:text-white"
                >
                  المجموع الكلي
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ orders?.total }}
                </th>
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
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from "@/components/AppLayout.vue";
  import request from "../services/request";
  export default {
    components: { AppLayout },
    data() {
      return {
        data: {},
        orders: [],
        limit: 10,
        page: 1,
        tot: 1,
        search_term: "",
        isShowAddModal: false,
        isShowEditModal: false,
      };
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
      async add() {
        const form_data = new FormData(this.$refs.add_form);
        const response = await request.post("orders", form_data);
        this.get();
        console.log(response);
      },
      async edit() {
        const id = this.$route.params.id;

        const form_data = new FormData(this.$refs.edit_form);
        const response = await request.put(`orders/${id}`, form_data);
        this.get();
        console.log(response);
      },
      setModalData(app) {
        this.data = Object.assign({}, app);
        this.isShowEditModal = true;
      },
      async delete_item(app) {
        const response = await request.delete(`orders`, app.id);
        this.get();
        console.log(response);
      },
      async get() {
        const id = this.$route.params.id;
        const response = await request.get(`orders/${id}`);
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
