<script lang="ts" setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import ToastContainer from "@/components/ToastContainer.vue";
  import { useViewportScaling } from "@/composables/viewportScaling";
  import BlankLayout from "@/layouts/blank.vue";
  import DefaultLayout from "@/layouts/default.vue";
  import NotFoundLayout from "@/layouts/notFound.vue";

  const route = useRoute();
  const layouts = {
    blank: BlankLayout,
    default: DefaultLayout,
    notFound: NotFoundLayout,
  };
  const layout = computed(
    () => layouts[route.meta.layout as keyof typeof layouts] ?? DefaultLayout
  );

  useViewportScaling();
</script>

<template>
  <component :is="layout" />
  <ToastContainer />
</template>

<style>
  p {
    padding: 0 10px;
  }
</style>
