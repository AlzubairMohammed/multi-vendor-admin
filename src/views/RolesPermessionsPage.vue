<template>
  <app-layout>
    <app-navbar :title="'إدارة صلاحيات المستخدمين'"></app-navbar>
    <div class="w-full py-8 px-4">
      <div class="flex justify-between items-center py-4">
        <div class="relative">
          <input
            type="email"
            class="peer pl-6 pr-10 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="بحث"
            v-model="search_term"
            @input="search()"
          />
          <div
            class="absolute right-2 inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
          >
            <box-icon color="grey" name="search"></box-icon>
          </div>
        </div>

        <button
          @click="showAddModal()"
          type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
        >
          <box-icon color="white" name="plus"></box-icon>
        </button>
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
                <th scope="col" class="px-6 py-3">نوع المستخدم</th>
                <th scope="col" class="px-6 py-3">الصلاحيات</th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(app, index) in roles?.role_permissions"
                :key="app.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ (index += 1) }}
                </th>
                <td class="px-6 py-4">{{ app?.role?.role }}</td>
                <td class="px-6 py-4">{{ app?.permission?.permission }}</td>

                <td class="px-6 py-4">
                  <button
                    @click="setModalData(app)"
                    type="button"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    تعديل
                  </button>
                  <button
                    @click="delete_item(app)"
                    type="button"
                    class="font-medium text-red-600 mx-2 dark:text-red-500 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <fwb-modal v-if="isShowAddModal" @close="closeAddModal">
        <template #header>
          <div class="flex items-center text-lg">اضافة</div>
        </template>
        <template #body>
          <form @submit.prevent="add()" ref="add_form">
            <div class="p-4 overflow-y-auto">
              <div class="input-group">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الصلاحية</label
                >
                <select
                  name="permession_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    v-for="permession in permessions"
                    :key="permession.id"
                    :value="permession.id"
                  >
                    {{ permession?.permission }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700"
            >
              <button
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                @click="closeAddModal()"
              >
                الغاء
              </button>
              <button
                type="submit"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                اضافة
              </button>
            </div>
          </form>
        </template>
      </fwb-modal>

      <fwb-modal v-if="isShowEditModal" @close="closeEditModal">
        <template #header>
          <div class="flex items-center text-lg">تعديل</div>
        </template>
        <template #body>
          <form @submit.prevent="edit()" ref="edit_form">
            <div class="p-4 overflow-y-auto">
              <div class="input-group">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الصلاحية</label
                >
                <select
                  name="permession_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    v-for="permession in permessions"
                    :key="permession.id"
                    :value="data.permession_id"
                  >
                    {{ permession?.permission }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700"
            >
              <button
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                @click="closeEditModal()"
              >
                الغاء
              </button>
              <button
                type="submit"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                تعديل
              </button>
            </div>
          </form>
        </template>
      </fwb-modal>
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from "@/components/AppLayout.vue";
  import request from "../services/request";
  import { FwbModal } from "flowbite-vue";
  import AppNavbar from "../components/AppNavbar.vue";
  export default {
    components: { FwbModal, AppLayout, AppNavbar },
    data() {
      return {
        data: {},
        roles: [],
        permessions: [],
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
        const id = this.$route.params.id;

        const form_data = new FormData(this.$refs.add_form);
        const response = await request.post("role-permissions", {
          role_id: id,
          ...form_data,
        });
        this.get();
        console.log(response);
        this.data = {};
      },
      async edit() {
        const id = this.$route.params.id;

        const form_data = new FormData(this.$refs.edit_form);
        const response = await request.put(`role-permissions`, this.data.id, {
          role_id: id,
          ...form_data,
        });
        this.get();
        if (response.status) {
          this.closeEditModal();
        }
      },
      setModalData(app) {
        this.data = Object.assign({}, app);
        this.isShowEditModal = true;
      },
      async delete_item(app) {
        const response = await request.delete(`roles`, app.id);
        this.get();
        console.log(response);
      },
      async get() {
        const id = this.$route.params.id;
        const response = await request.get(`roles/${id}`);
        this.roles = response.data;
        console.log(response);
      },
      async getPermessions() {
        const response = await request.get("permissions/");
        this.permessions = response.data;
        console.log(response);
      },
      async search() {
        const response = await request.post("roles/search", {
          limit: 10,
          page: 1,
          search: this.search_term,
          col: "title",
        });
        this.roles = response.data;
        console.log(response);
      },
      handlePagination(page) {
        this.page = page;
        this.get();
      },
    },
    created() {
      this.get();
      this.getPermessions();
    },
  };
</script>

<style></style>
