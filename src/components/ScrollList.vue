<script setup lang="ts">
  import { Skeleton } from "@/components/ui/skeleton";

  interface Props {
    disAbleInfinite?: boolean;
  }
  withDefaults(defineProps<Props>(), {
    disAbleInfinite: false,
  });
  const emit = defineEmits(["onRefresh", "onLoad"]);
  const listObj = defineModel({
    type: Object,
    default: () => ({
      loading: false,
      finished: false,
      list: [],
    }),
  });

  const containerRef = ref<HTMLElement>();

  function load() {
    emit("onLoad");
  }

  const isEmpty = computed(() => listObj.value.list?.length === 0 && !listObj.value?.loading);

  function onScroll() {
    if (!containerRef.value) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value;
    if (
      scrollHeight - scrollTop - clientHeight < 100 &&
      !(listObj.value.loading || listObj.value.finished)
    ) {
      load();
    }
  }
</script>

<template>
  <div ref="containerRef" class="h-full overflow-auto" @scroll="onScroll">
    <slot />

    <div v-if="listObj.loading" class="p-4 space-y-3">
      <div v-for="i in 3" :key="i" class="flex gap-3">
        <Skeleton class="h-4 w-full" />
      </div>
    </div>

    <p
      v-if="listObj.finished && !isEmpty"
      class="mt-5 flex items-center justify-center text-sm text-muted-foreground py-4"
    >
      没有更多了
    </p>

    <div
      v-if="isEmpty"
      class="flex flex-col items-center justify-center py-16 text-muted-foreground"
    >
      <p class="text-sm">暂无数据</p>
    </div>
  </div>
</template>
