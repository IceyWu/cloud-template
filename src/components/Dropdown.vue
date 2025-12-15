<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const visiable = ref(false);
function dropdownHandler() {
  visiable.value = false;
}

const { availableLocales, locale } = useI18n();
</script>

<template>
	<div class="relative">
		<div class="rounded-md inline-flex items-center overflow-hidden">
			<button
				class="text-gray-600 p-2 border-0 bg-white h-full cursor-pointer hover:text-gray-700 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-500"
				:class="visiable ? 'bg-gray-200 dark:bg-gray-500' : ''"
				@click.stop="visiable = !visiable"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>

		<Transition name="fade" mode="out-in">
			<div
				v-if="visiable"
				v-on-click-outside.bubble="dropdownHandler"
				class="mt-2 rounded-md bg-white dark:bg-gray-500 w-56 shadow-lg end-0 absolute z-10 divide-gray-100 divide-y"
			>
				<div class="p-2">
					<span
						v-for="availableLocale of availableLocales"
						:key="availableLocale"
						:class="
							locale === availableLocale
								? 'bg-gray-100 text-gray-800 dark:bg-gray-400'
								: ''
						"
						class="text-sm text-gray-500 dark:text-gray-200 px-4 py-2 rounded-lg block cursor-pointer hover:text-gray-900 dark:hover:text-white"
						@click="locale = availableLocale"
					>
						{{ availableLocale }}
					</span>
				</div>
			</div>
		</Transition>
	</div>
</template>
