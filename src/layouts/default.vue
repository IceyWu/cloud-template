<template>
  <div class="flex flex-col h-screen w-full font-sans">
    <div class="top-0 sticky z-[999]">
      <TheHeader />
    </div>

    <div class="flex flex-col flex-1 w-full overflow-auto">
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>

      <router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
