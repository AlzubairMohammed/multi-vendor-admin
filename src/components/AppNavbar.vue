<template>
  <fwb-navbar
    style="
      background: linear-gradient(
        40deg,
        rgb(7, 92, 87) 0%,
        rgba(39, 195, 184, 1) 0%,
        rgb(12, 117, 110) 100%
      );
    "
  >
    <template #logo>
      <h3 class="py-3 text-white text-lg">{{ title }}</h3>
    </template>
    <template #right-side> </template>
  </fwb-navbar>
</template>

<script>
  import { FwbNavbar } from "flowbite-vue";
  export default {
    props: ["title"],
    components: {
      FwbNavbar,
    },
    setup() {},
  };
</script>
