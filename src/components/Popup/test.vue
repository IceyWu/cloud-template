<script setup lang="ts">
interface Props {
	title?: string
}

defineProps<Props>()
const emits = defineEmits(['close', 'ok', 'cancel'])
function onClose() {
	emits('close', Date.now())
}
</script>

<template>
	<div class="popup fcc flex-col">
		<h1 class="text-center text-3xl text-white">标题：{{ title }}</h1>
		<div v-motion-roll-bottom class="mt-10 flex flex-wrap space-x-2">
			<slot name="close">
				<button class="btn" @click="onClose">关闭</button>
			</slot>
			<button class="btn" @click="emits('ok')">ok</button>
			<button class="btn" @click="emits('cancel')">cancel</button>
		</div>
	</div>
</template>

<style scoped>
.popup {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
