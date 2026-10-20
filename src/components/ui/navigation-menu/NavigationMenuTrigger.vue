<script lang="ts" setup >
import { ChevronDown } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import type { NavigationMenuTriggerProps } from "reka-ui"
import {
  NavigationMenuTrigger,
  useForwardProps,
} from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "."

const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
  >
    <slot />
    <ChevronDown
      aria-hidden="true"
      class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
    />
  </NavigationMenuTrigger>
</template>
