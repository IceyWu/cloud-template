<script setup lang="ts">
  import ToastContainer from "@/components/ToastContainer.vue";
  import { useViewportScaling } from "@/composables/viewportScaling";

  useViewportScaling();
</script>

<template>
  <router-view />
  <ToastContainer />
</template>

<style>
  /* a {
              color: rgba(37, 99, 235);
              } */

  p {
    padding: 0 10px;
  }
</style>
