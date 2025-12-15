<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const isDark = useDark();

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(
  THEME_KEY,
  computed(() => (isDark.value ? "dark" : ""))
);

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
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
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
    axisPointer: {
      type: "shadow",
    },
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
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Visits",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
});

const totalVisits = computed(() => {
  const data = pieOption.value.series?.[0]?.data as { value: number }[];
  return data?.reduce((sum, item) => sum + item.value, 0) || 0;
});
</script>

<template>
	<div class="p-6 w-full min-h-full overflow-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Traffic Sources Card -->
			<Card class="col-span-1">
				<CardHeader class="flex flex-row items-center justify-between pb-2">
					<div>
						<CardTitle class="text-lg font-semibold">
							Traffic Sources
						</CardTitle>
						<CardDescription>
							Website traffic distribution
						</CardDescription>
					</div>
					<Badge variant="secondary">
						{{ totalVisits.toLocaleString() }} total
					</Badge>
				</CardHeader>
				<CardContent>
					<div class="h-80 w-full">
						<!-- @vue-ignore -->
						<VChart class="h-full w-full" :option="pieOption" autoresize />
					</div>
				</CardContent>
			</Card>

			<!-- Weekly Visits Card -->
			<Card class="col-span-1">
				<CardHeader class="flex flex-row items-center justify-between pb-2">
					<div>
						<CardTitle class="text-lg font-semibold">
							Weekly Visits
						</CardTitle>
						<CardDescription>
							Daily visitor statistics
						</CardDescription>
					</div>
					<Badge variant="outline">
						This Week
					</Badge>
				</CardHeader>
				<CardContent>
					<div class="h-80 w-full">
						<!-- @vue-ignore -->
						<VChart class="h-full w-full" :option="barOption" autoresize />
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
