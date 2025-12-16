// Polyfill for ResizeObserver (360浏览器等旧浏览器)
import ResizeObserver from "resize-observer-polyfill";

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";
import i18n from "./plugins/i18n";

import pinia from "./plugins/pinia";
import routes from "./plugins/router";
import vueQuery from "./plugins/vue-query";

// Tailwind CSS v4
import "./assets/index.css";

// 你自定义的 css
import "./styles/main.css";

const app = createApp(App);
app.use(routes);
app.use(MotionPlugin);
app.use(i18n);
app.use(pinia);
vueQuery(app);

app.mount("#app");
