<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { NavigationMenuIndicator, useForwardProps } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuIndicator
    v-bind="forwardedProps"
    :class="cn('top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in', props.class)"
  >
    <div class="rounded-tl-sm bg-border h-2 w-2 shadow-md rotate-45 top-[60%] relative" />
  </NavigationMenuIndicator>
</template>
