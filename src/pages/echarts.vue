<script lang="ts" setup>
  import { ArrowDown, ArrowUp, Eye, MousePointerClick, TrendingUp, Users } from "@lucide/vue";
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
    { change: "+12.5%", icon: Eye, title: "总访问量", trend: "up", value: "12,543" },
    { change: "+8.2%", icon: Users, title: "活跃用户", trend: "up", value: "3,234" },
    { change: "-2.1%", icon: MousePointerClick, title: "点击率", trend: "down", value: "24.8%" },
    { change: "+0.8%", icon: TrendingUp, title: "转化率", trend: "up", value: "3.2%" },
  ]);

  const pieOption = ref<EChartsOption>({
    legend: {
      bottom: "0",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
      orient: "horizontal",
    },
    series: [
      {
        avoidLabelOverlap: false,
        center: ["50%", "45%"],
        data: [
          { name: "Direct", value: 335 },
          { name: "Email", value: 310 },
          { name: "Ad Networks", value: 234 },
          { name: "Video Ads", value: 135 },
          { name: "Search Engines", value: 1548 },
        ],
        emphasis: {
          label: { fontSize: 20, fontWeight: "bold", show: true },
        },
        itemStyle: {
          borderColor: "transparent",
          borderRadius: 10,
          borderWidth: 2,
        },
        label: { position: "center", show: false },
        labelLine: { show: false },
        name: "Traffic Sources",
        radius: ["40%", "70%"],
        type: "pie",
      },
    ],
    tooltip: {
      formatter: "{b} : {c} ({d}%)",
      trigger: "item",
    },
  });

  const barOption = ref<EChartsOption>({
    grid: {
      bottom: "3%",
      containLabel: true,
      left: "3%",
      right: "4%",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        name: "Visits",
        type: "bar",
      },
    ],
    tooltip: {
      axisPointer: { type: "shadow" },
      trigger: "axis",
    },
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
    },
    yAxis: { type: "value" },
  });

  const lineOption = ref<EChartsOption>({
    grid: {
      bottom: "3%",
      containLabel: true,
      left: "3%",
      right: "4%",
    },
    series: [
      {
        areaStyle: { opacity: 0.3 },
        data: [820, 932, 901, 1234, 1290, 1530],
        name: "Revenue",
        smooth: true,
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      boundaryGap: false,
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      type: "category",
    },
    yAxis: { type: "value" },
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
      <Card class="relative overflow-hidden" v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            {{ stat.title }}
          </CardTitle>
          <component class="h-4 w-4 text-muted-foreground" :is="stat.icon" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <div class="flex items-center gap-1 text-xs mt-1">
            <ArrowUp class="h-3 w-3 text-green-500" v-if="stat.trend === 'up'" />
            <ArrowDown class="h-3 w-3 text-red-500" v-else />
            <span :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'">
              {{ stat.change }}
            </span>
            <span class="text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
        <div
          class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary"
        />
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
            <VChart autoresize class="h-full w-full" :option="pieOption" />
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
            <VChart autoresize class="h-full w-full" :option="barOption" />
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
          <VChart autoresize class="h-full w-full" :option="lineOption" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
