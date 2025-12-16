<script setup lang="ts">
import { useViewportScaling } from "@/composables/viewportScaling";

// 初始化视口缩放
useViewportScaling();
</script>

<template>
	<router-view />
</template>

<style>
/* a {
	color: rgba(37, 99, 235);
} */

p {
  padding: 0 10px;
}
</style>
