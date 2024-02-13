<script setup lang="ts">
import { testRequestGet } from '~/api/mock'
import lottieNoData from '~/assets/lottie/6.json'
import Lottie_Data_404 from '~/assets/lottie/4.json'
import { useUserStore } from '~/stores/user'
import { to } from '@iceywu/utils'
defineProps<{ msg: string }>()

const titleRef = useTyped(['cloud template!  '])

const { t } = useI18n()
const counter = createCounter()

const resData = ref<any>({})

const getDataLoading = ref(false)
const getData = async () => {
	if (getDataLoading.value) return
	getDataLoading.value = true
	const params = {
		id: 1,
	}
	// to is a function form (@iceywu/utils)
	const [err, res] = await to(testRequestGet(params))
	if (res) {
		console.log('🌈-----接口请求成功-----', res)
		const {
			code,
			msg,
			data = [],
		} = res || {
			code: 500,
			msg: '接口请求失败',
		}
		if (code === 200) {
			resData.value = data
			toast.success('接口请求成功')
		} else {
			console.log('❗-----接口请求失败-----', msg)
			toast.error(msg)
		}
	}
	if (err) {
		console.log('❗-----接口请求失败-----')
		toast.error('接口请求失败')
	}
	getDataLoading.value = false
}
const router = useRouter()

const go404Page = () => {
	// 随机跳转path
	const path = Math.random() > 0.5 ? '/404' : '/500'
	router.push({
		path,
	})
}
const handleLogin = () => {
	useUserStore()
		.loginByUsername({ username: 'admin', password: 'admin123' })
		.then((res) => {
			console.log('🌳-----res-----', res)
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
			<button class="btn" @click="handleLogin">登录</button>
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
