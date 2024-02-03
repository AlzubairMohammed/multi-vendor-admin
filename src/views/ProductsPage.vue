<script setup>
import AppLayout from "@/components/AppLayout.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import SearchAddButton from "@/components/Tables/SearchAddButton.vue";
import ProductTable from "@/components/Products/ProductsTable.vue";
import { FwbModal } from "flowbite-vue";
import { onMounted, ref, inject } from "vue";
import { useStore } from "vuex";
const checkCookie = inject("checkCookie");
const store = useStore();

let data = ref({
  product_data: {
    name: "",
    descr: "",
    product_type: "",
    buy_price: 0,
    sale_price: 0,
    sub_category_id: 0,
  },
  images_data: [
    {
      image: "",
    },
  ],
  variation_data: [
    {
      buy_price: 0,
      sale_price: 0,
      variation_attributes: [
        {
          attribute_id: 0,
          name: "",
          image: "",
        },
      ],
    },
  ],
});
let products = ref([]);
let categories = ref([]);
let attributes = ref([]);

// let search_term = "";
let isShowAddModal = ref(false);
let isShowEditModal = ref(false);

const closeAddModal = () => {
  isShowAddModal.value = false;
};
const showAddModal = () => {
  isShowAddModal.value = true;
};
const closeEditModal = () => {
  isShowEditModal.value = false;
};
const showEditModal = () => {
  isShowEditModal = true;
};
const handleFileChange = (event) => {
  data.value.images_data = event.target.files;
};
const add = async () => {
  await store.dispatch("addProduct", data.value);
};
const deletProduct = async (id) => {
  await store.dispatch("deleteProduct", id);
};
onMounted(async () => {
  try {
    await store.dispatch("fetchProducts");
    products.value = store.getters.getProducts;
  } catch (error) {
    console.error("Error dispatching fetchProducts:", error);
  }
  try {
    await store.dispatch("fetchCategories");
    categories.value = store.getters.getCategories;
    console.log(categories.value);
  } catch (error) {
    console.error("Error dispatching fetchCategories:", error);
  }
  try {
    await store.dispatch("fetchAttributes");
    attributes.value = store.getters.allAttributes;
    console.log(attributes.value);
  } catch (error) {
    console.error("Error dispatching fetchProducts:", error);
  }
  checkCookie();
});
</script>

<template>
  <app-layout>
    <app-navbar :title="'المنتجات'"></app-navbar>
    <div class="w-full py-8 px-4">
      <!-- <page-header title="المنتجات" /> -->
      <SearchAddButton :showModel="showAddModal" />
      <ProductTable
        :showEditModal="showEditModal"
        :deletProduct="deletProduct"
        :products="products"
      />
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
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >إسم المنتج</label
                >
                <input
                  type="text"
                  id="name"
                  @model="data.product_data.name"
                  name="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="input-group">
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >سعر الشراء</label
                >
                <input
                  type="number"
                  id="buy_price"
                  @model="data.product_data.buy_price"
                  name="buy_price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="input-group">
                <label
                  for="sale_price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >سعر البيع</label
                >
                <input
                  type="number"
                  id="sale_price"
                  @model="data.product_data.sale_price"
                  name="sale_price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="input-group">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >القسم</label
                >
                <select
                  name="sub_category_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @model="data.product_data.sub_category_id"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="input-group">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >نوع المنتج</label
                >
                <select
                  name="category_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @model="data.product_data.product_type"
                >
                  <option>مفرد</option>
                  <option>متغير</option>
                </select>
              </div>
              <div class="input-group">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >الوصف</label
                >
                <textarea
                  id="descr"
                  @model="data.product_data.descr"
                  name="descr"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <div class="input-group">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                  >الصورة</label
                >
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="image"
                  name="image"
                  type="file"
                  multiple
                  @change="handleFileChange"
                />
              </div>
              <div class="roles my-2 bg-gray-100 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <h2>تغييرات المنتج</h2>
                  <button
                    @click="data.variation_data.push({})"
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <div
                  v-for="(variation, index) in data.variation_data"
                  :key="variation"
                >
                  <div class="flex items-center">
                    <div class="input-group w-full mx-2">
                      <label
                        :for="`edit_phone_${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >الاسم</label
                      >
                      <input
                        type="text"
                        :id="`edit_phone_${index}`"
                        v-model="variation.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div class="input-group w-full mx-2">
                      <label
                        :for="`edit_phone_${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >سعر الشراء</label
                      >
                      <input
                        type="number"
                        :id="`edit_phone_${index}`"
                        v-model="variation.buy_price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div class="input-group w-full mx-2">
                      <label
                        :for="`edit_phone_${index}`"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >سعر البيع</label
                      >
                      <input
                        type="number"
                        :id="`edit_phone_${index}`"
                        v-model="variation.sale_price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div class="input-group w-full mx-2">
                      <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >القسم</label
                      >
                      <select
                        name="category_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        @model="data.product_data.sub_category_id"
                      >
                        <option
                          v-for="category in categories"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </div>

                    <button
                      @click="data.variation_data.splice(index, 1)"
                      type="button"
                      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                    >
                      <box-icon color="white" name="trash"></box-icon>
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
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >القسم</label
                >
                <select
                  name="category_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="data.category_id"
                  >
                    {{ category.name }}
                  </option>
                </select>
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
                          {{ role?.role_ar }}
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

<style></style>
