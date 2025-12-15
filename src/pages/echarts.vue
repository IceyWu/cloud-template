<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ArrowDown, ArrowUp, Eye, MousePointerClick, TrendingUp, Users } from "lucide-vue-next";
import VChart, { THEME_KEY } from "vue-echarts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const isDark = useDark();

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(
  THEME_KEY,
  computed(() => (isDark.value ? "dark" : ""))
);

// 统计数据
const stats = ref([
  { title: "总访问量", value: "12,543", change: "+12.5%", trend: "up", icon: Eye },
  { title: "活跃用户", value: "3,234", change: "+8.2%", trend: "up", icon: Users },
  { title: "点击率", value: "24.8%", change: "-2.1%", trend: "down", icon: MousePointerClick },
  { title: "转化率", value: "3.2%", change: "+0.8%", trend: "up", icon: TrendingUp },
]);

const pieOption = ref<EChartsOption>({
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)",
  },
  legend: {
    orient: "horizontal",
    bottom: "0",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "45%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "transparent",
        borderWidth: 2,
      },
      label: { show: false, position: "center" },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: "bold" },
      },
      labelLine: { show: false },
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" },
      ],
    },
  ],
});

const barOption = ref<EChartsOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Visits",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: { borderRadius: [6, 6, 0, 0] },
    },
  ],
});

const lineOption = ref<EChartsOption>({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Revenue",
      type: "line",
      smooth: true,
      areaStyle: { opacity: 0.3 },
      data: [820, 932, 901, 1234, 1290, 1530],
    },
  ],
});

const totalVisits = computed(() => {
  const series = pieOption.value.series;
  if (Array.isArray(series) && series[0]) {
    const data = series[0].data as { value: number }[];
    return data?.reduce((sum, item) => sum + item.value, 0) || 0;
  }
  return 0;
});
</script>

<template>
	<div class="p-6 w-full min-h-full overflow-auto space-y-6">
		<!-- Stats Cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card v-for="stat in stats" :key="stat.title" class="relative overflow-hidden">
				<CardHeader class="flex flex-row items-center justify-between pb-2">
					<CardTitle class="text-sm font-medium text-muted-foreground">
						{{ stat.title }}
					</CardTitle>
					<component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{{ stat.value }}</div>
					<div class="flex items-center gap-1 text-xs mt-1">
						<ArrowUp v-if="stat.trend === 'up'" class="h-3 w-3 text-green-500" />
						<ArrowDown v-else class="h-3 w-3 text-red-500" />
						<span :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'">
							{{ stat.change }}
						</span>
						<span class="text-muted-foreground">vs last month</span>
					</div>
				</CardContent>
				<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary" />
			</Card>
		</div>

		<!-- Charts Row 1 -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between pb-2">
					<div>
						<CardTitle class="text-lg font-semibold">Traffic Sources</CardTitle>
						<CardDescription>Website traffic distribution</CardDescription>
					</div>
					<Badge variant="secondary">{{ totalVisits.toLocaleString() }} total</Badge>
				</CardHeader>
				<CardContent>
					<div class="h-80 w-full">
						<!-- @vue-ignore -->
						<VChart class="h-full w-full" :option="pieOption" autoresize />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between pb-2">
					<div>
						<CardTitle class="text-lg font-semibold">Weekly Visits</CardTitle>
						<CardDescription>Daily visitor statistics</CardDescription>
					</div>
					<Badge variant="outline">This Week</Badge>
				</CardHeader>
				<CardContent>
					<div class="h-80 w-full">
						<!-- @vue-ignore -->
						<VChart class="h-full w-full" :option="barOption" autoresize />
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Charts Row 2 -->
		<Card>
			<CardHeader class="flex flex-row items-center justify-between pb-2">
				<div>
					<CardTitle class="text-lg font-semibold">Revenue Trend</CardTitle>
					<CardDescription>Monthly revenue overview</CardDescription>
				</div>
				<Badge>+23.5%</Badge>
			</CardHeader>
			<CardContent>
				<div class="h-64 w-full">
					<!-- @vue-ignore -->
					<VChart class="h-full w-full" :option="lineOption" autoresize />
				</div>
			</CardContent>
		</Card>
	</div>
</template>
