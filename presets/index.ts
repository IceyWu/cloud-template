// 内置插件

import I18N from "@intlify/unplugin-vue-i18n/vite";
import tailwindcss from "@tailwindcss/vite";
import Legacy from "@vitejs/plugin-legacy";
import Vue from "@vitejs/plugin-vue";
import Jsx from "@vitejs/plugin-vue-jsx";
import { browserslistToTargets } from "lightningcss";
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
import Layouts from "vite-plugin-vue-layouts";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";
import { Alias, Restart, Warmup } from "./plugins";
import { defaultBuildTargets, detectResolvers, useEnv } from "./shared/detect";
import { r } from "./shared/path";

export default function () {
  const env = useEnv();

  const plugins: PluginOption[] = [
    /**
     * 兼容不支持 esmModule 的浏览器
     * https://www.npmjs.com/package/@vitejs/plugin-legacy
     */
    Legacy({
      targets: defaultBuildTargets,
      modernPolyfills: true,
    }),
    /**
     * 启动优化 + lightningcss
     */
    {
      name: "vite-inline-config",
      config(config) {
        // 优化
        config.css ??= {};
        config.build ??= {};
        config.optimizeDeps ??= {};
        config.css.preprocessorMaxWorkers = true;
        config.optimizeDeps.holdUntilCrawlEnd = false;

        // lightningcss
        config.css.transformer = "lightningcss";
        config.build.cssMinify = "lightningcss";
        config.css.lightningcss ??= {};
        config.css.lightningcss.targets = browserslistToTargets(defaultBuildTargets);
      },
    },
    /**
     * 内置的预热，可以加快冷启动
     */
    Warmup(),
    /**
     * 文件路由
     * https://github.com/posva/unplugin-vue-router
     */
    VueRouter({
      routesFolder: r("src/pages"),
      dts: r("presets/types/type-router.d.ts"),
      extensions: [".vue", ".tsx", ".jsx"],
    }),
    /**
     * vue 官方插件，用来解析 sfc 单文件组件
     * https://www.npmjs.com/package/@vitejs/plugin-vue
     */
    Vue(),
    /**
     * 布局系统
     * https://github.com/dishait/vite-plugin-vue-layouts
     */
    Layouts(),
    /**
     * mock 服务
     */
    vitePluginFakeServer({
      logger: false,
      include: "mock",
      infixName: false,
      enableProd: env.VITE_APP_MOCK_IN_PRODUCTION,
    }),
    /**
     * 组件自动按需引入
     * https://github.com/antfu/unplugin-vue-components
     */
    Components({
      directoryAsNamespace: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx$/],
      extensions: ["vue", "tsx", "jsx"],
      dts: r("presets/types/components.d.ts"),
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
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
    }),
    /**
     * i18n 国际化支持
     * https://www.npmjs.com/package/@intlify/unplugin-vue-i18n
     */
    I18N({
      runtimeOnly: true,
      compositionOnly: true,
      include: ["locales/**"],
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
        vueTemplate: true,
        dts: r("presets/types/auto-imports.d.ts"),
        imports: [
          ...AutoGenerateImports({
            include: [...vue3Presets],
            exclude: ["vue-router"],
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
      })
    );
  }

  return plugins;
}
