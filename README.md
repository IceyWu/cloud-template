# cloud-template

一个基于 Vue 3、TypeScript 和 Vite 的前端起步模板，预置常用路由、状态管理、国际化、请求、表单 UI、图表和代码质量工具。

[在线预览](https://cloud-template.netlify.app/) · [English](./README.en.md)

## 特性

- Vue 3、TypeScript、Vite 8 和 pnpm
- 基于页面文件的 Vue Router 路由与布局
- Pinia 状态管理和持久化
- Vue I18n 国际化与 YAML 语言文件
- Tailwind CSS v4、Reka UI、Element Plus
- TanStack Vue Query、Axios 和示例 API/mock
- 按需加载的 ECharts 与 VueUse
- Ultracite 和 Biome 检查与格式化

## 环境要求

- Node.js 22.18 或更新的 LTS 版本
- pnpm 12.14.0

## 开始使用

```bash
pnpm install
pnpm dev
```

开发服务器默认使用 <http://localhost:9500>。

```bash
pnpm check       # 代码规范与 TypeScript 类型检查
pnpm build       # 生产构建
pnpm preview     # 本地预览构建结果
pnpm fix         # 自动修复可处理的代码规范问题
```

通过 `.env` 配置应用标题、基础路径、mock、API 自动导入和开发工具；可参考项目中的环境读取代码配置变量。

## 项目结构

```text
src/
  api/          API 与 mock 示例
  components/   应用组件和 UI 组件
  composables/  Vue composables
  layouts/      页面布局
  pages/        文件路由页面
  plugins/      Vue 插件初始化
  stores/       Pinia stores
  utils/        请求与通用工具
locales/        国际化语言文件
mock/           开发 mock 路由
presets/        Vite 插件与模板配置
```

## 许可证

[MIT](./LICENSE) © 2023 IceyWu
