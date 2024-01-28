<template>
    <fwb-navbar style="background: #f1f1f1">
        <template #logo>
            <h3 class="py-3 text-lg">{{ title }}</h3>
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
