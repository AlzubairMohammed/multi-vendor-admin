<script setup>
import AppLayout from "@/components/AppLayout.vue";
import { FwbModal } from "flowbite-vue";
import AppNavbar from "../components/AppNavbar.vue";
import { onMounted, ref, inject } from "vue";
import { useStore } from "vuex";
const checkCookie = inject("checkCookie");
const store = useStore();
let add_form = ref({});
let edit_form = ref({});
let attributes = ref([]);
let page = 1;
let tot = 1;
let search_term = "";
let isShowAddModal = ref(false);
let isShowEditModal = ref(false);
let editingItem = ref({});

const closeAddModal = () => {
  isShowAddModal.value = false;
};
const showAddModal = () => {
  isShowAddModal.value = true;
};
const closeEditModal = () => {
  isShowEditModal.value = false;
};
const showEditModal = (app) => {
  isShowEditModal.value = true;
  editingItem = app;
};

const add = async () => {
  const attributeData = new FormData(add_form.value);
  await store.dispatch("addAttribute", attributeData);
};
const edit = async () => {
  const attributeData = new FormData(edit_form.value);
  await store.dispatch("updateAttribute", attributeData);
};
const delete_item = async (app) => {
  await store.dispatch("deleteAttribute", app.id);
};
onMounted(async () => {
  try {
    await store.dispatch("fetchAttributes");
    attributes.value = store.getters.allAttributes;
  } catch (error) {
    console.error("Error dispatching fetchAttributes:", error);
  }
  checkCookie();
});
</script>

<template>
  <app-layout>
    <app-navbar :title="'الخصائص'"></app-navbar>
    <div class="w-full py-8 px-4">
      <!-- <page-header title="الاقسام" /> -->
      <div class="flex justify-between items-center py-4">
        <div class="relative">
          <input
            type="email"
            class="peer py-3 pl-6 pr-10 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
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
                <th scope="col" class="px-6 py-3 text-center">الرقم</th>
                <th scope="col" class="px-6 py-3 text-center">الاسم</th>
                <th scope="col" class="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(app, index) in attributes"
                :key="app.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ (index += 1) }}
                </th>
                <td class="px-6 py-4 text-center">{{ app?.name }}</td>
                <td class="px-6 py-4">
                  <button
                    @click="showEditModal(app)"
                    type="button"
                    class="mx-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

          <nav class="flex justify-center my-4" v-if="tot > 1">
            <ul class="inline-flex -space-x-px text-base h-10">
              <li
                v-for="page_number in tot"
                @click="handlePagination(page_number)"
                :key="page_number"
              >
                <a
                  :class="
                    page_number == page
                      ? 'bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-900 '
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  "
                  class="flex items-center justify-center px-4 h-10 leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >{{ page_number }}</a
                >
              </li>
            </ul>
          </nav>
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
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الاسم</label
                >
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
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
            <input type="number" name="id" :value="editingItem.id" hidden />
            <div class="p-4 overflow-y-auto">
              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الاسم</label
                >
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :value="editingItem.name"
                  required
                />
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

<style></style>
