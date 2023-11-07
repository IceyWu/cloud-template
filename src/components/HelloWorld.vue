<script setup lang="ts">
import { testRequestGet } from '~/api/mock'
import lottieNoData from '~/assets/lottie/6.json'
import Lottie_Data_404 from '~/assets/lottie/4.json'
defineProps<{ msg: string }>()

const titleRef = useTyped(['cloud template!  '])

const { t } = useI18n()
const counter = createCounter()

const resData = ref<any>({})
// api get
const getData = () => {
	testRequestGet({
		id: 1,
	})
		.then((res) => {
			console.log(res)
			resData.value = res
		})
		.catch((err) => {
			console.log(err)
		})
}
const router = useRouter()

const go404Page = () => {
	// 随机跳转path
	const path = Math.random() > 0.5 ? '/404' : '/500'
	router.push({
		path,
	})
}
</script>

<template>
	<div class="mt-10 flex flex-col items-center space-y-7">
		<LottiieCom :lottie-json-data="isDark ? Lottie_Data_404 : lottieNoData" />
		<h1
			ref="titleRef"
			linear-text
			shape-bl
			trans
			class="text-4xl font-italic c-context::#C084FC"
			:from="!isDark ? '#4facfe' : '#e0c3fc'"
			:to="!isDark ? '#00f2fe' : '#8ec5fc'"
		>
			{{ msg }}
		</h1>
		<div flex flex-wrap gap-2>
			<button class="btn" @click="getData">数据获取</button>
			<button class="btn" @click="counter.inc()">
				pinia-{{ counter.count }}
			</button>
			<button class="btn" @click="go404Page">404</button>
		</div>
		<!-- res -->
		<div>{{ t('resData') }}: {{ resData }}</div>
	</div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
	font-size: 1.2rem;
	animation: slide-up 0.5s ease-out;
}

@keyframes slide-up {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
