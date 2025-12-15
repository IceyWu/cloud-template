<script setup lang="ts">
interface Props {
  desc?: string;
  lottieJsonData: Record<string, any>;
}
const props = defineProps<Props>();
const lottieRef = ref<any>(null);
watch(
  () => props.lottieJsonData,
  () => {
    if (lottieRef.value) {
      lottieRef.value.reloadAnim(props.lottieJsonData);
    }
  }
);
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<Lottie
			ref="lottieRef"
			width="15em"
			height="15em"
			:json-data="lottieJsonData"
		/>
		<div v-if="desc" class="desc">
			{{ desc }}
		</div>
	</div>
</template>

<style lang="less" scoped></style>
