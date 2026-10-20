import { createRouter, createWebHashHistory } from "vue-router";
import { routes as fileRoutes } from "vue-router/auto-routes";

declare module "vue-router" {
  // 在这里定义你的 meta 类型

  interface RouteMeta {
    layout?: string;
    title?: string;
  }
}

// 重定向 BASE_URL
// fileRoutes.flat(Infinity).forEach((route) => {
// 	route.path = safeResolve(route.path)
// })

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...fileRoutes],
});

export const getRoutes = () => router.getRoutes();

export default router;
