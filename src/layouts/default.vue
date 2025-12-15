<template>
	<div
		class="flex flex-col h-screen w-full box-border font-sans text-center text-gray-700 dark:text-gray-200"
	>
		<div class="top-0 sticky z-[999]"><TheHeader /></div>

		<div class="flex flex-col flex-1 w-full items-center box-border overflow-auto">
			<router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</transition>
			</router-view>

			<router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
				<transition>
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
