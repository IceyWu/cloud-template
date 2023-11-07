<template>
	<div ref="animation" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import lottie from 'lottie-web'
const props = defineProps({
	width: {
		type: String,
		default: '100px',
	},
	height: {
		type: String,
		default: '100px',
	},
	src: {
		type: String,
		default: 'https://assets10.lottiefiles.com/packages/lf20_dyiqnus5.json',
	},
	jsonData: {
		type: Object,
		default: () => null,
	},
	autoplay: {
		type: Boolean,
		default: true,
	},
	loop: {
		type: Boolean,
		default: false,
	},
})

const animation = ref(null)
onMounted(() => {
	initAnim()
})

const initAnim = (data?: Record<string, any>) => {
	if (animation.value) {
		lottie.loadAnimation({
			container: animation.value,
			renderer: 'svg',
			loop: props.loop,
			autoplay: props.autoplay,
			path: props.src,
			// animationData只能加载本地json，优先级高于path
			animationData: data ? data : props.jsonData,
		})
	}
}
// 重新加载动画
const reloadAnim = (data?: Record<string, any>) => {
	if (animation.value) {
		lottie.destroy()
		initAnim(data)
	}
}
// 暴露给外部的方法
defineExpose({
	reloadAnim,
})
</script>

<style scoped></style>
