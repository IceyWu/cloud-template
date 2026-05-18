<script setup lang="ts">
import { to } from "@iceywu/utils";
import { ElMessage } from "element-plus";
import {
  AlertTriangle,
  ArrowRight,
  Database,
  Github,
  LogIn,
  Plus,
  Sparkles,
} from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { testRequestGet } from "~/api/mock";
import { useUserStore } from "~/stores/user";

defineProps<{ msg: string }>();

const hasTypeonFinished = ref(false);
const titleRef = useTyped(["Start your Project in "], () => {
  hasTypeonFinished.value = true;
});

const counter = createCounter();
const resData = ref<any>({});
const getDataLoading = ref(false);

async function getData() {
  if (getDataLoading.value) return;
  getDataLoading.value = true;
  const [err, res] = await to(testRequestGet({ id: 1 }));
  if (res) {
    const { code, msg, data = [] } = (res as any) || { code: 500, msg: "failed" };
    if (code === 200) {
      resData.value = data;
      toast.success("success");
    } else {
      toast.error(msg);
    }
  }
  if (err) toast.error("failed");
  getDataLoading.value = false;
}

const router = useRouter();
function go404Page() {
  router.push({ path: "/404" });
}
function handleLogin() {
  useUserStore()
    .loginByUsername({ username: "admin", password: "admin123" })
    .then(() => {});
}

const isShowBtns = ref(false);
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
  <div class="flex flex-col items-center gap-10 py-16 px-4 w-full max-w-4xl mx-auto">
    <Transition name="fade" mode="out-in">
      <div v-if="!isShowBtns" class="text-center space-y-4 max-w-2xl">
        <div class="flex items-center justify-center gap-2 mb-2">
          <Badge variant="secondary" class="gap-1 px-3 py-1">
            <Sparkles class="w-3 h-3" />
            Vue 3 + Vite + TypeScript
          </Badge>
        </div>
        <h1 class="base-font text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span v-if="showText" class="text-foreground">Start your Project in</span>
          <span ref="titleRef" class="text-foreground" />
          <span
            v-if="hasTypeonFinished"
            class="block text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text"
          >
            minutes!
          </span>
        </h1>
        <p v-if="hasTypeonFinished" class="text-lg text-muted-foreground">
          A modern Vue 3 + Vite + TypeScript template, ready to use out of the box
        </p>
      </div>

      <Card v-else class="w-full max-w-md shadow-lg">
        <CardHeader class="text-center pb-2">
          <CardTitle class="text-xl">Feature Demo</CardTitle>
          <CardDescription>Click buttons to explore features</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent class="pt-4 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <Button variant="default" class="w-full" @click="handleLogin">
              <LogIn class="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="secondary" class="w-full" :disabled="getDataLoading" @click="getData">
              <Database class="w-4 h-4 mr-2" />
              {{ getDataLoading ? "Loading..." : "Fetch Data" }}
            </Button>
            <Button variant="outline" class="w-full" @click="counter.inc()">
              <Plus class="w-4 h-4 mr-2" />
              Pinia {{ counter.count }}
            </Button>
            <Button variant="destructive" class="w-full" @click="go404Page">
              <AlertTriangle class="w-4 h-4 mr-2" />
              404 Page
            </Button>
          </div>
          <div class="pt-1">
            <el-button type="primary" class="w-full" @click="ElMessage.success('Element Plus 集成成功 🎉')">
              Element Plus Button
            </el-button>
          </div>
          <div v-if="Object.keys(resData).length" class="rounded-lg border bg-muted/50 p-3">
            <div class="flex items-center gap-2 mb-2">
              <Badge variant="outline" class="text-xs">Response</Badge>
            </div>
            <pre class="text-xs text-muted-foreground overflow-auto max-h-32">{{ JSON.stringify(resData, null, 2) }}</pre>
          </div>
        </CardContent>
      </Card>
    </Transition>

    <div v-show="hasTypeonFinished" class="flex flex-wrap gap-3 justify-center">
      <Button size="lg" class="group gap-2" @click="toggleShow">
        {{ isShowBtns ? "Back to Home" : "Get Started" }}
        <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
      <Button size="lg" variant="outline" as="a" href="https://github.com/IceyWu/cloud-template" target="_blank" class="gap-2">
        <Github class="w-4 h-4" />
        GitHub
      </Button>
    </div>
  </div>
</template>

<style scoped>
.base-font {
  font-family: "SmileySansOblique", system-ui, sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
