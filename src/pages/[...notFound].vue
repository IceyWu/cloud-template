<script setup lang="ts">
import { Home } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const typedRef = useTyped([" is not found!"]);
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen items-center justify-center gap-12 px-6">
    <div class="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
      <p class="text-sm font-medium text-muted-foreground uppercase tracking-widest">Error 404</p>
      <h1 class="text-8xl font-bold tracking-tight">404</h1>
      <div class="text-2xl font-semibold text-muted-foreground h-9">
        The Page<span ref="typedRef" />
      </div>
      <p class="text-muted-foreground max-w-sm">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <RouterLink :to="safeResolve('/')">
        <Button size="lg" class="mt-2">
          <Home class="w-4 h-4 mr-2" />
          返回首页
        </Button>
      </RouterLink>
    </div>
    <div class="flex-shrink-0 text-9xl select-none">🚀</div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "title": "404",
    "layout": "notFound"
  }
}
</route>
