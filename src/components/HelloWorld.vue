<script setup lang="ts">
import { to } from "@iceywu/utils";
import { AlertTriangle, ArrowRight, Database, Github, LogIn, Plus } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testRequestGet } from "~/api/mock";
import Lottie_Data_404 from "~/assets/lottie/4.json";
import lottieNoData from "~/assets/lottie/6.json";
import { useUserStore } from "~/stores/user";

defineProps<{ msg: string }>();

const hasTypeonFinished = ref(false);
const titleRef = useTyped(["Start your Project in "], () => {
  hasTypeonFinished.value = true;
});

const { t } = useI18n();
const counter = createCounter();

const resData = ref<any>({});

const getDataLoading = ref(false);
async function getData() {
  if (getDataLoading.value) return;
  getDataLoading.value = true;
  const params = {
    id: 1,
  };
  const [err, res] = await to(testRequestGet(params));
  if (res) {
    const {
      code,
      msg,
      data = [],
    } = (res as any) || {
      code: 500,
      msg: "接口请求失败",
    };
    if (code === 200) {
      resData.value = data;
      toast.success("接口请求成功");
    } else {
      toast.error(msg);
    }
  }
  if (err) {
    toast.error("接口请求失败");
  }
  getDataLoading.value = false;
}
const router = useRouter();

function go404Page() {
  const path = Math.random() > 0.5 ? "/404" : "/500";
  router.push({
    path,
  });
}
function handleLogin() {
  useUserStore()
    .loginByUsername({ username: "admin", password: "admin123" })
    .then((res) => {});
}
const isShowBtns = ref<boolean>(false);
const showText = ref(false);
function toggleShow() {
  isShowBtns.value = !isShowBtns.value;
  showText.value = true;
}
onMounted(() => {
  consolePlus.log("welcome to use cloud-template");
});
</script>

<template>
	<div class="flex flex-col items-center space-y-8 py-10">
		<div class="relative">
			<div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-full blur-3xl opacity-50" />
			<LottiieCom :lottie-json-data="isDark ? Lottie_Data_404 : lottieNoData" class="relative" />
		</div>

		<template v-if="isShowBtns">
			<Card v-motion-roll-bottom class="w-full max-w-md">
				<CardHeader class="text-center">
					<CardTitle>功能演示</CardTitle>
					<CardDescription>点击按钮体验各项功能</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-2 gap-3">
						<Button variant="default" class="w-full" @click="handleLogin">
							<LogIn class="w-4 h-4 mr-2" />
							登录
						</Button>
						<Button variant="secondary" class="w-full" :disabled="getDataLoading" @click="getData">
							<Database class="w-4 h-4 mr-2" />
							数据获取
						</Button>
						<Button variant="outline" class="w-full" @click="counter.inc()">
							<Plus class="w-4 h-4 mr-2" />
							Pinia {{ counter.count }}
						</Button>
						<Button variant="destructive" class="w-full" @click="go404Page">
							<AlertTriangle class="w-4 h-4 mr-2" />
							404
						</Button>
					</div>
					<div v-if="Object.keys(resData).length" class="p-3 rounded-lg bg-muted">
						<div class="flex items-center gap-2 mb-2">
							<Badge variant="outline">Response</Badge>
						</div>
						<pre class="text-xs text-muted-foreground overflow-auto">{{ JSON.stringify(resData, null, 2) }}</pre>
					</div>
				</CardContent>
			</Card>
		</template>

		<template v-else>
			<div v-motion-roll-right class="mx-auto text-center max-w-3xl px-4">
				<h1 class="base-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
					<span v-if="showText" class="block text-foreground mb-2">Start your Project in</span>
					<span ref="titleRef" class="block text-foreground" />
					<span
						v-if="hasTypeonFinished"
						class="text-transparent mt-4 block bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text animate-pulse"
					>
						minutes!
					</span>
				</h1>
				<p v-if="hasTypeonFinished" class="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
					一个现代化的 Vue 3 + Vite + TypeScript 开发模板，开箱即用
				</p>
			</div>
		</template>

		<div v-show="hasTypeonFinished" class="flex gap-3">
			<Button size="lg" class="group" @click="toggleShow">
				{{ isShowBtns ? '返回首页' : '开始体验' }}
				<ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
			</Button>
			<Button size="lg" variant="outline" as="a" href="https://github.com/IceyWu/cloud-template" target="_blank">
				<Github class="w-4 h-4 mr-2" />
				GitHub
			</Button>
		</div>
	</div>
</template>

<style scoped>
.base-font {
  font-family: 'SmileySansOblique', system-ui, sans-serif;
}
</style>
