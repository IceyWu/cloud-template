import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./plugins/i18n";

import pinia from "./plugins/pinia";
import routes from "./plugins/router";
import vueQuery from "./plugins/vue-query";

// Tailwind CSS v4 + 全局样式
import "./assets/index.css";

// Element Plus message API
import "element-plus/es/components/message/style/css";

const app = createApp(App);
app.use(routes);
app.use(i18n);
app.use(pinia);
vueQuery(app);

app.mount("#app");
