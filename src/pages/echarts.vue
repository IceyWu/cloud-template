<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import {
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from 'vue-echarts'

const isDark = useDark()

use([
	CanvasRenderer,
	PieChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
])

provide(
	THEME_KEY,
	computed(() => (isDark.value ? 'dark' : '')),
)

const option = ref<EChartsOption>({
	title: {
		text: 'Traffic Sources',
		left: 'center',
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
	},
	series: [
		{
			name: 'Traffic Sources',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [
				{ value: 335, name: 'Direct' },
				{ value: 310, name: 'Email' },
				{ value: 234, name: 'Ad Networks' },
				{ value: 135, name: 'Video Ads' },
				{ value: 1548, name: 'Search Engines' },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
})
</script>

<template>
	<div>
		<!-- @vue-ignore -->
		<VChart class="chart" :option="option" autoresize />
	</div>
</template>

<style>
.chart {
  width: 100vw;
  height: calc(100vh - 82px);
}
</style>
