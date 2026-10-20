// 内置插件

import I18N from "@intlify/unplugin-vue-i18n/vite";
import tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import Jsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import {
  AntDesignVueResolver,
  ArcoResolver,
  DevUiResolver,
  ElementPlusResolver,
  HeadlessUiResolver,
  IduxResolver,
  InklineResolver,
  LayuiVueResolver,
  NaiveUiResolver,
  PrimeVueResolver,
  QuasarResolver,
  TDesignResolver,
  VantResolver,
  VarletUIResolver,
  ViewUiResolver,
  Vuetify3Resolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import type { PluginOption } from "vite";
import { AutoGenerateImports, vue3Presets } from "vite-auto-import-resolvers";
import { vitePluginFakeServer } from "vite-plugin-fake-server";
import VueDevTools from "vite-plugin-vue-devtools";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";
import { Alias, Restart, Warmup } from "./plugins";
import { detectResolvers, useEnv } from "./shared/detect";
import { r } from "./shared/path";

export default function () {
  const env = useEnv();

  const plugins: PluginOption[] = [
    /**
     * 内置的预热，可以加快冷启动
     */
    Warmup(),
    /**
     * 文件路由
     * https://github.com/posva/unplugin-vue-router
     */
    VueRouter({
      dts: r("presets/types/type-router.d.ts"),
      extensions: [".vue", ".tsx", ".jsx"],
      routesFolder: r("src/pages"),
    }),
    /**
     * vue 官方插件，用来解析 sfc 单文件组件
     * https://www.npmjs.com/package/@vitejs/plugin-vue
     */
    Vue(),
    /**
     * mock 服务
     */
    vitePluginFakeServer({
      enableProd: env.VITE_APP_MOCK_IN_PRODUCTION,
      include: "mock",
      infixName: false,
      logger: false,
    }),
    /**
     * 组件自动按需引入
     * https://github.com/antfu/unplugin-vue-components
     */
    Components({
      directoryAsNamespace: true,
      dts: r("presets/types/components.d.ts"),
      extensions: ["vue", "tsx", "jsx"],
      include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx$/],
      resolvers: detectResolvers({
        onlyExist: [
          [VantResolver(), "vant"],
          [QuasarResolver(), "quasar"],
          [DevUiResolver(), "vue-devui"],
          [NaiveUiResolver(), "naive-ui"],
          [Vuetify3Resolver(), "vuetify"],
          [PrimeVueResolver(), "primevue"],
          [ViewUiResolver(), "view-design"],
          [LayuiVueResolver(), "layui-vue"],
          [VarletUIResolver(), "@varlet/ui"],
          [IduxResolver(), "@idux/components"],
          [InklineResolver(), "@inkline/inkline"],
          [ElementPlusResolver({ importStyle: "css" }), "element-plus"],
          [HeadlessUiResolver(), "@headlessui/vue"],
          [ArcoResolver(), "@arco-design/web-vue"],
          [AntDesignVueResolver({ importStyle: false }), "ant-design-vue"],
          [VueUseComponentsResolver(), "@vueuse/components"],
          [TDesignResolver({ library: "vue-next" }), "tdesign-vue-next"],
        ],
      }),
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
    }),
    /**
     * i18n 国际化支持
     * https://www.npmjs.com/package/@intlify/unplugin-vue-i18n
     */
    I18N({
      compositionOnly: true,
      include: ["locales/**"],
      runtimeOnly: true,
    }),
    /**
     * jsx 和 tsx 支持
     * https://www.npmjs.com/package/@vitejs/plugin-vue-jsx
     */
    Jsx(),
    /**
     * 别名插件 (内置)
     * 支持 `~` 和 `@` 别名到 `src`
     */
    Alias(),
    /**
     * 强制重启 (内置)
     * 如果 package.json 或 pnpm-lock.yaml 更新的话，强制重启
     */
    Restart(),
    /**
     * Tailwind CSS v4
     * https://tailwindcss.com/docs/v4-beta
     */
    tailwindcss(),
  ];

  /**
   * 开发面板
   * https://github.com/webfansplz/vite-plugin-vue-devtools
   */
  if (env.VITE_APP_DEV_TOOLS) {
    plugins.push(VueDevTools());
  }

  /**
   * api 自动按需引入
   * https://github.com/antfu/unplugin-auto-import
   */
  if (env.VITE_APP_API_AUTO_IMPORT) {
    const dirs = env.VITE_APP_DIR_API_AUTO_IMPORT
      ? ["src/stores/**", "src/composables/**", "src/api/**", "src/hooks/**"]
      : [];
    plugins.push(
      AutoImport({
        dirs,
        dts: r("presets/types/auto-imports.d.ts"),
        imports: [
          ...AutoGenerateImports({
            exclude: ["vue-router"],
            include: [...vue3Presets],
          }),

          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            "vue-router": ["useLink"],
          },
          {
            "@iceywu/utils": ["to", "list", "sleep", "consolePlus"],
          },
        ],
        resolvers: detectResolvers({
          onlyExist: [
            [ElementPlusResolver({ importStyle: "css" }), "element-plus"],
            [TDesignResolver({ library: "vue-next" }), "tdesign-vue-next"],
          ],
        }),
        vueTemplate: true,
      })
    );
  }

  return plugins;
}
