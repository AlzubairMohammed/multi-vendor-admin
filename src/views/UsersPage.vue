<template>
  <app-layout>
    <app-navbar :title="'المستخدمين'"></app-navbar>
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
                <th scope="col" class="px-6 py-3 text-right">الرقم</th>
                <th scope="col" class="px-6 py-3 text-right">اسم المستخدم</th>
                <th scope="col" class="px-6 py-3 text-right">الايميل</th>
                <th scope="col" class="px-6 py-3 text-right">الصورة</th>
                <th scope="col" class="px-6 py-3 text-right">ارقام الهاتف</th>
                <th scope="col" class="px-6 py-3 text-right">الصلاحيات</th>

                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(app, index) in users"
                :key="app.id"
                class="odd:bg-white text-right odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ (index += 1) }}
                </th>
                <td class="px-6 py-4 text-right">{{ app?.name }}</td>
                <td class="px-6 py-4 text-right">{{ app?.email }}</td>
                <td class="px-6 py-4 text-right">
                  <div style="height: 80px; width: 80px; overflow: hidden">
                    <img
                      style="width: 100%; height: auto"
                      :src="`http://localhost:5000/${
                        app?.image?.split('public/')?.[1]
                      }`"
                      alt=""
                    />
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <tr
                    class="text-right"
                    v-for="phone in app?.user_phones"
                    :key="phone.id"
                  >
                    {{
                      phone?.phone
                    }}
                  </tr>
                </td>
                <td class="px-6 py-4 text-right">
                  <tr
                    class="text-right"
                    v-for="role in app?.user_roles"
                    :key="role.id"
                  >
                    {{
                      role?.role?.role_ar
                    }}
                  </tr>
                </td>

                <td class="px-6 py-4 text-right">
                  <button
                    @click="setModalData(app)"
                    type="button"
                    class="font-medium mx-4 text-blue-600 dark:text-blue-500 hover:underline"
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

      <fwb-modal v-if="isShowAddModal" @close="closeAddModal">
        <template #header>
          <div class="flex items-center text-lg">اضافة</div>
        </template>
        <template #body>
          <form
            enctype="multipart/form-data"
            @submit.prevent="add()"
            ref="add_form"
          >
            <div class="p-4 overflow-y-auto">
              <div class="input-group">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الإسم الكامل</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="data.name"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >إسم المستخدم</label
                >
                <input
                  type="text"
                  id="username"
                  v-model="data.username"
                  name="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الايميل</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="data.email"
                  name="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >كلمية السر</label
                >
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="data.password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الصورة</label
                >
                <input
                  type="file"
                  name="image"
                  id="image"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="roles my-2 bg-gray-100 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <h2>ارقام الهاتف</h2>
                  <button
                    @click="data.phones.push({})"
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <div v-for="(phone, index) in data.phones" :key="phone">
                  <div class="flex items-center">
                    <div class="input-group w-full mx-2">
                      <label
                        :for="`edit_phone_${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >رقم الهاتف</label
                      >
                      <input
                        type="number"
                        :id="`edit_phone_${index}`"
                        v-model="phone.phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      @click="remove_item(index, 'phone')"
                      type="button"
                      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                    >
                      <box-icon color="white" name="delete"></box-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="roles my-2 bg-gray-00 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <h2>الصلاحيات</h2>
                  <button
                    @click="data.roles.push({})"
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <div v-for="(user_role, index) in data.roles" :key="user_role">
                  <div class="flex items-center">
                    <div class="input-group w-full mx-2">
                      <label
                        for="permissions"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >الصلاحية</label
                      >
                      <select
                        v-model="user_role.role_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option
                          v-for="role in roles"
                          :key="role.id"
                          :value="role.id"
                        >
                          {{ role?.role }}
                        </option>
                      </select>
                    </div>
                    <button
                      @click="remove_item(index, 'role')"
                      type="button"
                      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                    >
                      <box-icon color="white" name="delete"></box-icon>
                    </button>
                  </div>
                </div>
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
                  for="edit_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الإسم الكامل</label
                >
                <input
                  type="text"
                  id="edit_name"
                  name="name"
                  v-model="editData.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >إسم المستخدم</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  v-model="editData.username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الايميل</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="editData.email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <!-- <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >كلمية السر</label
                >
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="data.password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div> -->

              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الصورة</label
                >
                <input
                  type="file"
                  name="image"
                  id="image"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div class="roles my-2 bg-gray-100 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <h2>ارقام الهاتف</h2>
                  <button
                    @click="editData.user_phones.push({})"
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <div
                  v-for="(phone, index) in editData?.user_phones"
                  :key="phone"
                >
                  <div class="flex items-center">
                    <div class="input-group w-full mx-2">
                      <label
                        :for="`phone_${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >رقم الهاتف</label
                      >
                      <input
                        type="number"
                        :id="`phone_${index}`"
                        name="target"
                        v-model="phone.phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      @click="remove_item(index, 'phone', 'edit')"
                      type="button"
                      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                    >
                      <box-icon color="white" name="delete"></box-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="roles my-2 bg-gray-00 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <h2>الصلاحيات</h2>
                  <button
                    @click="editData.user_roles.push({})"
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <div
                  v-for="(user_role, index) in editData?.user_roles"
                  :key="user_role"
                >
                  <div class="flex items-center">
                    <div class="input-group w-full mx-2">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >الصلاحية</label
                      >
                      <select
                        v-model="user_role.role_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option
                          v-for="role in roles"
                          :key="role.id"
                          :value="role.id"
                        >
                          {{ role?.role }}
                        </option>
                      </select>
                    </div>
                    <button
                      @click="remove_item(index, 'role', 'edit')"
                      type="button"
                      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                    >
                      <box-icon color="white" name="delete"></box-icon>
                    </button>
                  </div>
                </div>
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
        users: [],
        roles: [],
        limit: 10,
        page: 1,
        tot: 1,
        search_term: "",
        isShowAddModal: false,
        isShowEditModal: false,
        data: {
          phones: [{}],
          roles: [{}],
        },
        editData: {},
      };
    },
    methods: {
      setEditData(data) {
        this.editData = data;
      },
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

        form_data.append("phones", JSON.stringify(this.data.phones));
        form_data.append("roles", JSON.stringify(this.data.roles));
        const response = await request.post("users", form_data);
        this.get();
        if (response.status) {
          this.closeAddModal();
        }
      },
      async edit() {
        const form_data = new FormData(this.$refs.edit_form);

        form_data.append(
          "user_phones",
          JSON.stringify(this.editData.user_phones)
        );
        form_data.append(
          "user_roles",
          JSON.stringify(this.editData.user_roles)
        );

        const response = await request.put(
          `users`,
          this.editData.id,
          form_data
        );
        this.get();
        if (response.status) {
          this.closeEditModal();
        }
      },
      setModalData(app) {
        this.editData = Object.assign({}, app);
        this.isShowEditModal = true;
      },
      async delete_item(app) {
        const response = await request.delete(`users`, app.id);
        this.get();
        console.log(response);
      },
      remove_item(index, type, crud_type) {
        if (crud_type == "edit") {
          if (type == "phone") {
            if (this.data?.user_phones?.length == 1) {
              this.data.user_phones = [{}];
            } else {
              this.data?.user_phones?.splice(index, 1);
            }
          } else {
            if (this.data?.user_roles?.length == 1) {
              this.data.user_roles = [{}];
            } else {
              this.data?.user_roles?.splice(index, 1);
            }
          }
        } else {
          if (type == "phone") {
            if (this.data.phones.length == 1) {
              this.data.phones = [{}];
            } else {
              this.data.phones.splice(index, 1);
            }
          } else {
            if (this.data.roles.length == 1) {
              this.data.roles = [{}];
            } else {
              this.data.roles.splice(index, 1);
            }
          }
        }
      },
      async get() {
        const response = await request.post("users/paginate", {
          limit: this.limit,
          page: this.page,
        });
        this.tot = Math.ceil(response.tot / this.limit);
        this.users = response.data;
        console.log(response);
      },
      async getRoles() {
        const response = await request.get("roles");
        this.roles = response.data;
        console.log(response);
      },
      async search() {
        const response = await request.post("users/search", {
          limit: 10,
          page: 1,
          search: this.search_term,
          col: "name",
        });
        this.users = response.data;
        console.log(response);
      },
      handlePagination(page) {
        this.page = page;
        this.get();
      },
    },
    created() {
      this.get();
      this.getRoles();
    },
  };
</script>

<style></style>
