# cloud-template

<p align="center">
  <br>
  <img width="100" src="./public/logo.svg" alt="vue-awesome repository logo">
  <br>
  <br>
</p>

<p align='center'>
cloud-template <b>vite + vue3 + ts</b><sup><em>(极速)</em></sup><br>
</p>

<br>

<p align='center'>
<a href="https://cloud-template.netlify.app/">在线预览</a>
</p>

<br>

<p align='center'>
<b>简体中文</b> | <a href="./README.en.md">English</a>
</p>

<br>

## 🐳 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/)

<!-- - 🚀 [Rolldown-Vite](https://rolldown.rs/) - 基于 Rust 的下一代构建工具，极致性能 -->

- 📦 [组件自动导入](./src/components)

- 🍍 [通过 Pinia 进行状态管理](https://pinia.vuejs.org/)

- 🎨 [Tailwind CSS v4](https://tailwindcss.com/) - 现代化原子 CSS 框架

- 😃 [Lucide Icons](https://lucide.dev/) - 精美的开源图标库

- 📥 [API 自动导入](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等

- 🦾 [API 封装](./src/api) - 基于 [axios] 的简单封装

- 🔍 [Ultracite](https://github.com/haydenbleasel/ultracite) + [Biome](https://biomejs.dev/) - 基于 Rust 的超快速代码检查和格式化工具

- 🎨 [Element Plus](https://element-plus.org/) - Vue 3.0 UI 组件库

- 🔄 [TanStack Query](https://tanstack.com/query) - 强大的异步状态管理

- 🚀 自动版本更新并生成 `CHANGELOG`

- 🎨 [Lottie](https://github.com/airbnb/lottie-web) - 用于解析 After Effects 动画的 JavaScript 库

- 📊 [Echarts](https://echarts.apache.org/zh/index.html) - 在 Vue 中使用 Echarts

- 📊 [Utils-@iceywu/utils](https://github.com/iceywu/utils) - 一套通用工具函数集合

- 🌐 [i18n](https://github.com/intlify/vue-i18n-next/tree/master/packages/vue-i18n#readme) - 国际化支持

- 🎨 [shadcn-vue](https://www.shadcn-vue.com/) - 基于 Reka UI 和 Tailwind CSS 构建的可复用组件

<br>

## 🚀 代码质量与性能

### 构建工具

- **[Vite 7](https://vite.dev/)** - 下一代前端构建工具，极速开发体验

### 代码检查

- **[Ultracite](https://github.com/haydenbleasel/ultracite)** - 基于 Biome 的现代化代码检查和格式化工具
- **[Biome](https://biomejs.dev/)** - 基于 Rust 的超快速代码检查和格式化工具

### 脚本命令

```bash
# 运行代码检查
pnpm lint

# 自动修复问题
pnpm lint:fix
```

<br>

## 动机

为什么要做这个**模板**？

1. 节省下次开发时浪费在配置上的时间
2. 结合主流插件，整合现代开发架构，提高开发效率

<br />

## 灵感来源

该模板受 **[tov-template](https://github.com/dishait/tov-template)** 启发

<br />

## 使用方法

### 开发

运行以下命令并访问 <http://localhost:5173/>

```bash
pnpm dev
```

### 构建

构建应用，运行

```bash
pnpm build
```

### 预览

预览构建结果

```bash
pnpm preview
```

### 代码检查

```bash
# 检查代码规范
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 类型检查
pnpm typecheck
```

### 测试

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm coverage
```

<br>

## 项目结构

```
cloud-template/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   ├── composables/       # 组合式函数
│   ├── layouts/           # 布局
│   ├── pages/             # 页面
│   ├── plugins/           # 插件
│   ├── stores/            # 状态管理
│   ├── styles/            # 样式
│   ├── utils/             # 工具函数
│   └── main.ts            # 入口文件
├── biome.jsonc            # Biome 配置
├── components.json        # shadcn-vue 配置
├── postcss.config.js      # PostCSS 配置
└── vite.config.ts         # Vite 配置
```

<br>

## 配置说明

### 代码检查配置

项目使用 **Ultracite** + **Biome** 进行代码检查和格式化：

- 配置文件：`biome.jsonc`
- 基于 Rust 实现，提供极速的代码检查体验
- 集成代码格式化和 lint 功能

### 构建工具

使用 **Vite 7** 作为构建工具，提供：

- 极速的冷启动时间
- 快速的热模块替换 (HMR)
- 优化的生产构建

<br>

## 许可证

[MIT](./LICENSE) License © 2023 [IceyWu](https://github.com/IceyWu)
