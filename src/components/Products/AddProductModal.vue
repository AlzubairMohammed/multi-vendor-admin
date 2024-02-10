<script setup>
import { FwbModal } from "flowbite-vue";

import { useStore } from "vuex";
import { defineProps, onMounted, ref } from "vue";
let props = defineProps(["isShowAddModal", "closeAddModal"]);
const store = useStore();

let data = ref({
  product_data: {},
  images_data: [
    {
      image: "",
    },
  ],
  variation_data: [],
});
let dataTemplate = ref({
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
      variation_attributes: [],
    },
  ],
});
let attribueTemplate = ref({
  attribute_id: 0,
  name: "",
  image: "",
});
let attributes = ref([]);
let categories = ref([]);
let add_form = ref({});

const add = async () => {
  // const data = new FormData(add_form.value);
  console.log(data.value);
  await store.dispatch("addProduct", data.value);
};
const closeAddModal = () => {
  props.closeAddModal();
};
onMounted(async () => {
  try {
    await store.dispatch("fetchAttributes");
    attributes.value = store.getters.allAttributes;
  } catch (error) {
    console.error("Error dispatching fetchAttributes:", error);
  }
  try {
    await store.dispatch("fetchCategories");
    categories.value = store.getters.getCategories;
  } catch (error) {
    console.error("Error dispatching fetchCategories:", error);
  }
});
const handleBaseProductImageChange = (event) => {
  // console.log(event.target.files);
  const filesArray = [...event.target.files];
  filesArray.forEach((element) => {
    data.value.images_data.push({ image: element });
  });
};
const handleVariationProductImageChange = (index, attributeIndex, event) => {
  console.log(event, index, attributeIndex);
  const filesArray = [...event.target.files];
  filesArray.forEach((element) => {
    const variation_attributes = [];
    // const variation_attributes= [attributeIndex].push({
    //   image: element,
    // })
    variation_attributes.splice(attributeIndex, 0, { image: element });
    data.value.variation_data.splice(index, 0, { variation_attributes });
  });
  console.log(data.value);
};
</script>

<template>
  <fwb-modal v-if="props.isShowAddModal" @close="closeAddModal">
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
              v-model="data.product_data.name"
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
              id="data.product_data.buy_price"
              v-model="data.product_data.buy_price"
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
              id="data.product_data.sale_price"
              v-model="data.product_data.sale_price"
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
              v-model="data.product_data.sub_category_id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              v-model="data.product_data.product_type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="normal">مفرد</option>
              <option value="any">متغير</option>
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
              v-model="data.product_data.descr"
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
              type="file"
              @change="handleBaseProductImageChange"
              multiple
            />
          </div>
          <!-- variation section -->
          <div class="roles">
            <!-- variation title -->
            <div class="flex justify-between items-center">
              <h2>تغييرات المنتج</h2>
              <button
                @click="
                  data.variation_data.push(dataTemplate.variation_data[0])
                "
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
              >
                <box-icon color="white" name="plus"></box-icon>
              </button>
            </div>
            <!-- variation title -->
            <!-- variation rendering -->
            <div v-for="(variation, index) in data.variation_data" :key="index">
              <div
                class="overflow-y-auto items-center bg-gray-100 p-4 rounded-xl my-4"
              >
                <div class="input-group w-full mx-2">
                  <label
                    :for="`edit_phone_${index}`"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >سعر الشراء</label
                  >
                  <input
                    type="number"
                    :id="`edit_phone_${index}`"
                    v-model="data.variation_data[index].buy_price"
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
                    v-model="data.variation_data[index].sale_price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <!-- attribue titel -->
                <div class="flex justify-between items-center input-group mx-2">
                  <h2>اضافة خاصية</h2>
                  <button
                    @click="
                      variation.variation_attributes.push(attribueTemplate)
                    "
                    type="button"
                    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="plus"></box-icon>
                  </button>
                </div>
                <!-- attribue titel -->
                <!-- attribute rendering -->
                <div
                  v-for="(
                    item, attributeIndex
                  ) in variation.variation_attributes"
                  :key="item"
                  class="bg-blue-100 p-4 rounded-xl my-4"
                >
                  <div class="input-group w-full mx-2">
                    <label
                      :for="`add_attribute_${attributeIndex}`"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >الخاصية</label
                    >
                    <select
                      v-model="
                        data.variation_data[index].variation_attributes[
                          attributeIndex
                        ].attribute_id
                      "
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :id="`add_attribute_${attributeIndex}`"
                    >
                      <option
                        v-for="attribute in attributes"
                        :key="attribute.id"
                        :value="attribute.id"
                      >
                        {{ attribute.name }}
                      </option>
                    </select>
                  </div>
                  <div class="input-group w-full mx-2">
                    <label
                      :for="`add_value_${attributeIndex}`"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >القيمة</label
                    >
                    <input
                      type="number"
                      :id="`add_value_${attributeIndex}`"
                      v-model="
                        data.variation_data[index].variation_attributes[
                          attributeIndex
                        ].name
                      "
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div class="input-group">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      :for="`add_image_${attributeIndex}`"
                      >الصورة</label
                    >
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      :id="`add_image_${attributeIndex}`"
                      @change="
                        (event) =>
                          handleVariationProductImageChange(
                            index,
                            attributeIndex,
                            event
                          )
                      "
                      type="file"
                      multiple
                    />
                  </div>
                  <button
                    @click="
                      variation.variation_attributes.splice(attributeIndex, 1)
                    "
                    type="button"
                    class="py-3 px-4 mb-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    <box-icon color="white" name="trash"></box-icon>
                  </button>
                </div>
                <!-- attribue rendering -->
                <button
                  @click="data.variation_data.splice(index, 1)"
                  type="button"
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                >
                  <box-icon color="white" name="trash"></box-icon>
                </button>
              </div>
            </div>
            <!-- variation rendering -->
          </div>
          <!-- variation section -->
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
</template>
