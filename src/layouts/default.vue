<template>
	<div
		font-sans
		text="center gray-700 dark:gray-200"
		class="box-border h-screen w-full flex flex-col"
	>
		<div class="sticky top-0 z-999"><TheHeader /></div>
		<div class="gridlines absolute inset-x-0 z-10 py-20 -mt-8"></div>
		<div class="absolute inset-x-0 z-20 py-20 -mt-24">
			<div
				class="grid grid-cols-2 mt-12 opacity-60 2xl:mx-auto 2xl:max-w-6xl dark:opacity-50 -space-x-52"
				data-v-257aca76=""
			>
				<div
					class="from-primary-200 to-primary-400 h-40 bg-gradient-to-br blur-3xl dark:from-blue-700"
					data-v-257aca76=""
				></div>
				<div
					class="dark:to-primary-600 h-24 from-indigo-400 to-indigo-700 bg-gradient-to-r blur-3xl"
					data-v-257aca76=""
				></div>
			</div>
		</div>
		<div class="box-border w-full flex flex-col items-center justify-center">
			<router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive>
						<component :is="Component"></component>
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
