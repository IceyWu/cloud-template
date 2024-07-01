<script setup lang="ts">
import { to } from '@iceywu/utils'
import { testRequestGet } from '~/api/mock'
import lottieNoData from '~/assets/lottie/6.json'
import Lottie_Data_404 from '~/assets/lottie/4.json'
import { useUserStore } from '~/stores/user'

defineProps<{ msg: string }>()

const hasTypeonFinished = ref(false)
const titleRef = useTyped(['Start your Project in '], () => {
	hasTypeonFinished.value = true
})

const { t } = useI18n()
const counter = createCounter()

const resData = ref<any>({})

const getDataLoading = ref(false)
async function getData() {
	if (getDataLoading.value)
return
	getDataLoading.value = true
	const params = {
		id: 1,
	}
	// to is a function form (@iceywu/utils)
	const [err, res] = await to(testRequestGet(params))
	if (res) {
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
		}
 else {
			toast.error(msg)
		}
	}
	if (err) {
		toast.error('接口请求失败')
	}
	getDataLoading.value = false
}
const router = useRouter()

function go404Page() {
	// 随机跳转path
	const path = Math.random() > 0.5 ? '/404' : '/500'
	router.push({
		path,
	})
}
function handleLogin() {
	useUserStore()
		.loginByUsername({ username: 'admin', password: 'admin123' })
		.then((res) => {

		})
}
const isShowBtns = ref<boolean>(false)
const showText = ref(false)
function toggleShow() {
	isShowBtns.value = !isShowBtns.value
	showText.value = true
}
onMounted(() => {
	consolePlus.log('welcome to use cloud-template')
})
</script>

<template>
	<div class="mt-25 flex flex-col items-center space-y-7">
		<LottiieCom :lottie-json-data="isDark ? Lottie_Data_404 : lottieNoData" />

		<template v-if="isShowBtns">
			<div v-motion-roll-bottom flex flex-wrap gap-2>
				<button class="btn" @click="handleLogin">
登录
</button>
				<button class="btn" @click="getData">
数据获取
</button>
				<button class="btn" @click="counter.inc()">
					pinia-{{ counter.count }}
				</button>
				<button class="btn" @click="go404Page">
404
</button>
			</div>
			<div>{{ t('resData') }}: {{ resData }}</div>
		</template>
		<template v-else>
			<div v-motion-roll-right class="mx-auto mt-5 max-w-2xl text-center">
				<h1
					class="base-font block text-5xl text-gray-800 font-bold lg:text-7xl md:text-6xl dark:text-gray-200"
				>
					<span v-if="showText" class="block"> Start your Project in </span>
					<span ref="titleRef" class="block" />
					<span
						v-if="hasTypeonFinished"
						class="mt-3 block from-blue-600 to-violet-600 bg-gradient-to-tl bg-clip-text text-transparent"
						>minutes!</span>
				</h1>
			</div>
		</template>
		<button
			v-show="hasTypeonFinished"
			class="i-carbon-ibm-data-product-exchange text-5xl btn"
			@click="toggleShow"
		/>
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

.base-font {
  font-family: 'SmileySansOblique';
}
</style>
