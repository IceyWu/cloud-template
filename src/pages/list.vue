<template>
	<DefineTemplate v-slot="{ data }">
		<div
			class="relative w-full flex flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
		>
			<div
				class="relative m-0 max-h-80 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700"
			>
				<img
					:src="data.cover"
					alt="card-image"
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="w-full p-6">
				<h6
					class="mb-4 block text-base text-gray-700 font-semibold leading-relaxed tracking-normal font-sans uppercase antialiased"
				>
					startups
				</h6>
				<h4
					class="mb-2 block text-2xl text-blue-gray-900 font-semibold leading-snug tracking-normal font-sans antialiased"
				>
					{{ data.title }}
				</h4>
				<p
					class="mb-8 block text-base text-gray-700 font-normal leading-relaxed font-sans antialiased"
				>
					{{ data.content }}
				</p>
				<a href="#" class="inline-block"
					><button
						class="flex select-none items-center gap-2 rounded-lg px-6 py-3 text-center align-middle text-xs text-gray-900 font-bold font-sans uppercase transition-all disabled:pointer-events-none active:bg-gray-900/20 hover:bg-gray-900/10 disabled:opacity-50 disabled:shadow-none"
						type="button"
						@click="handleItemClick(data)"
					>
						Learn More<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
							></path>
						</svg></button
				></a>
			</div>
		</div>
	</DefineTemplate>
	<div class="box-border h-90vh w-[95%] p-5">
		<ScrollList v-model="listObj" @on-load="onLoad">
			<div grid="~ cols-1 md:cols-2 lg:cols-3 xl:cols-4 gap-6">
				<div v-for="(items, idx) of parts" :key="idx" flex="~ col gap-4">
					<ReuseTemplate v-for="data of items" :key="data.id" :data>
					</ReuseTemplate>
				</div>
			</div>
		</ScrollList>
	</div>
</template>

<script setup lang="ts">
import { to, list, sleep } from '@iceywu/utils'
import { breakpointsTailwind } from '@vueuse/core'
// imp
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
interface BaseParamsProps {
	page: number
	page_size: number
}
const listObj = ref({
	list: [],
	loading: false,
	finished: false,
	refreshing: false,
})
const baseParams = reactive<BaseParamsProps>({
	page: 1,
	page_size: 10,
})
const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
	if (breakpoints.xl.value) return 4
	if (breakpoints.lg.value) return 3
	if (breakpoints.md.value) return 2
	return 1
})

const parts = computed(() => {
	const result = Array.from(
		{ length: cols.value },
		() => [] as typeof listObj.value.list,
	)
	listObj.value.list.forEach((item, i) => {
		result[i % cols.value].push(item)
	})
	return result
})
const handleItemClick = (data: any) => {
	console.log('🌈----- handleItemClick ----- ', data)
}
//触底加载
const onLoad = async () => {
	if (listObj.value.loading || listObj.value.finished) return
	baseParams.page++
	getData()
}
const getAllMessages = async (params: BaseParamsProps): any => {
	await sleep(500)
	const { page = 1, page_size = 10 } = params
	const data = list(0, page_size - 1, (index) => {
		const indexVal = page_size * (page - 1) + index + 1
		const width = Math.floor(Math.random() * 200 + 200)
		const height = Math.floor(Math.random() * 300 + 300)
		return {
			id: indexVal,
			title: `消息标题${indexVal}`,
			cover: `https://picsum.photos/${width}/${height}?random=${indexVal}`,
			content: `消息内容${indexVal}`,
			create_time: '2021-08-01 12:00:00',
		}
	})
	return {
		code: 200,
		msg: 'success',
		data,
	}
}

const getData = async () => {
	listObj.value.loading = true
	const params = {
		...toRaw(baseParams),
	}
	const [err, ReData] = await to(getAllMessages(params))
	if (err) {
		listObj.value.finished = true
		listObj.value.loading = false
		return
	}

	const { code, data } = ReData || {}
	if (code === 200 && data) {
		console.log('🌳-----data-----', data)
		const content = data || []
		listObj.value.list.push(...content)
	} else {
		listObj.value.finished = true
	}
	// 加载状态停止;
	listObj.value.loading = false
}
const initData = () => {
	// 获取数据
	getData()
}
onMounted(() => {
	initData()
})
</script>

<style lang="less" scoped></style>
