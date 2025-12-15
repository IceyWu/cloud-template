<script setup lang="ts">
import { list, sleep, to } from "@iceywu/utils";
import { breakpointsTailwind } from "@vueuse/core";
import { ArrowRight, Calendar } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const [DefineSkeletonTemplate, ReuseSkeletonTemplate] = createReusableTemplate();

interface BaseParamsProps {
  page: number;
  page_size: number;
}
interface ListItem {
  id: number;
  title: string;
  cover: string;
  content: string;
  create_time: string;
}
const listObj = ref({
  list: [] as ListItem[],
  loading: false,
  finished: false,
  refreshing: false,
});
const baseParams = reactive<BaseParamsProps>({
  page: 1,
  page_size: 10,
});
const breakpoints = useBreakpoints(breakpointsTailwind);

const cols = computed(() => {
  if (breakpoints.xl.value) return 4;
  if (breakpoints.lg.value) return 3;
  if (breakpoints.md.value) return 2;
  return 1;
});

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof listObj.value.list);
  listObj.value.list.forEach((item, i) => {
    result[i % cols.value].push(item);
  });
  return result;
});

function handleItemClick(_data: ListItem) {
  toast.info(`点击了: ${_data.title}`);
}

function onLoad() {
  if (listObj.value.loading || listObj.value.finished) return;
  baseParams.page++;
  getData();
}

async function getAllMessages(
  params: BaseParamsProps
): Promise<{ code: number; msg: string; data: ListItem[] }> {
  await sleep(500);
  const { page = 1, page_size = 10 } = params;
  const data = list(0, page_size - 1, (index) => {
    const indexVal = page_size * (page - 1) + index + 1;
    const width = Math.floor(Math.random() * 200 + 200);
    const height = Math.floor(Math.random() * 300 + 300);
    return {
      id: indexVal,
      title: `消息标题 ${indexVal}`,
      cover: `https://picsum.photos/${width}/${height}?random=${indexVal}`,
      content: `这是一段示例内容，用于展示卡片的描述信息。内容编号 ${indexVal}`,
      create_time: "2024-12-15",
    };
  });
  return { code: 200, msg: "success", data };
}

async function getData() {
  listObj.value.loading = true;
  const params = { ...toRaw(baseParams) };
  const [err, ReData] = await to(getAllMessages(params));
  if (err) {
    listObj.value.finished = true;
    listObj.value.loading = false;
    return;
  }
  const { code, data } = ReData || { code: 0, data: [] as ListItem[] };
  if (code === 200 && data) {
    listObj.value.list.push(...data);
  } else {
    listObj.value.finished = true;
  }
  listObj.value.loading = false;
}

onMounted(() => {
  getData();
});
</script>

<template>
	<DefineSkeletonTemplate>
		<Card class="overflow-hidden">
			<Skeleton class="h-48 w-full rounded-none" />
			<CardHeader class="space-y-2">
				<Skeleton class="h-4 w-16" />
				<Skeleton class="h-5 w-3/4" />
			</CardHeader>
			<CardContent>
				<Skeleton class="h-4 w-full" />
				<Skeleton class="mt-2 h-4 w-2/3" />
			</CardContent>
			<CardFooter>
				<Skeleton class="h-9 w-28" />
			</CardFooter>
		</Card>
	</DefineSkeletonTemplate>

	<DefineTemplate v-slot="{ data }">
		<Card class="group overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5">
			<div class="relative h-48 overflow-hidden">
				<img
					:src="data.cover"
					:alt="data.title"
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				>
				<Badge class="absolute top-3 left-3" variant="secondary">
					#{{ data.id }}
				</Badge>
			</div>
			<CardHeader class="pb-2">
				<div class="flex items-center gap-2 text-xs text-muted-foreground">
					<Calendar class="h-3 w-3" />
					<span>{{ data.create_time }}</span>
				</div>
				<h3 class="text-lg font-semibold leading-tight line-clamp-1">
					{{ data.title }}
				</h3>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-muted-foreground line-clamp-2">
					{{ data.content }}
				</p>
			</CardContent>
			<CardFooter>
				<Button variant="ghost" class="group/btn" @click="handleItemClick(data)">
					查看详情
					<ArrowRight class="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
				</Button>
			</CardFooter>
		</Card>
	</DefineTemplate>

	<div class="p-6 w-full min-h-[90vh]">
		<ScrollList v-model="listObj" @on-load="onLoad">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<template v-if="listObj.list.length === 0 && listObj.loading">
					<ReuseSkeletonTemplate v-for="i in 8" :key="i" />
				</template>
				<template v-else>
					<div v-for="(items, idx) of parts" :key="idx" class="flex flex-col gap-6">
						<ReuseTemplate v-for="item of items" :key="item.id" :data="item" />
					</div>
				</template>
			</div>
		</ScrollList>
	</div>
</template>
