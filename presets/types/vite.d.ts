/// <reference types="vite/client" />
/// <reference types="vue-router/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<unknown, unknown, any>;
  export default component;
}
