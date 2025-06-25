<p align="center">
  <br>
  <img width="100" src="./public/logo.svg" alt="logo of vue-awesome repository">
  <br>
  <br>
</p>
<p align='center'>
cloud-template <b>vite + v3 +ts</b><sup><em>(speed)</em></sup><br>
</p>

<br>

<p align='center'>
<a href="https://cloud-template.netlify.app/">Live Demo</a>
</p>

<br>

<p align='center'>
<a href="./README.md">简体中文</a> | <b>English</b>
</p>

<br>

## 🐳Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/)

- � [Rolldown-Vite](https://rolldown.rs/) - Next-generation bundler powered by Rust for extreme performance

- �📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦾 [Api](./src/api) - a simple wrapper for [axios]

- 🔍 [oxlint](https://oxc.rs/) - Ultra-fast JavaScript/TypeScript linter written in Rust

- 🎨 [Element Plus](https://element-plus.org/) - a Vue 3.0 UI library
<!-- - 🚀  自动版本更新并生成 `CHANGELOG` -->
- 🚀 auto version update and generate `CHANGELOG`
<!-- Lottie -->
- 🎨 [Lottie](https://github.com/airbnb/lottie-web) - a Javascript library for web and react native that parses After Effects animations exported as json with bodymovin and renders them natively on your web page or react native app
<!-- echarts,vue echarts 封装 -->
- 📊 [Echarts](https://echarts.apache.org/zh/index.html) - use Echarts in Vue

<!-- iceywu/utils -->

- 📊 [Utils-@iceywu/utils](https://github.com/iceywu/utils) - a set of common utils
<!-- i18n -->
- 🌐 [i18n](https://github.com/intlify/vue-i18n-next/tree/master/packages/vue-i18n#readme) - internationalization

- 🎨 [shadcn/ui](https://www.shadcn-vue.com/) - Re-usable components built with Radix Vue, and Tailwind CSS.

<br>

## 🚀 Code Quality & Performance

### Build Tool

- **[Rolldown-Vite](https://rolldown.rs/)** - Next-generation bundler powered by Rust, offering significantly faster build times and hot reload

### Linting

- **[oxlint](https://oxc.rs/)** - Ultra-fast JavaScript/TypeScript linter written in Rust
- **[ESLint](https://eslint.org/)** - Traditional linting with `eslint-plugin-oxlint` for seamless integration
- **Dual Linting Strategy**: oxlint for speed + ESLint for comprehensive rules

### Scripts

```bash
# Run both linters
bun run lint

# Run only oxlint (fastest)
bun run lint:oxlint

# Run only ESLint
bun run lint:eslint

# Auto-fix issues
bun run lint:fix
```

<br>

## Motivation

Why do this **template**?

1. Save time wasted on configuration for the next development
2. Combine mainstream plug-ins to integrate modern development architecture and improve development efficiency

<br />

<!-- ## 启发 🐃

该模板受 **[vitesse](https://github.com/antfu/vitesse)** 启发，如果你有 `SSG`
的场景，推荐你使用 **[vitesse](https://github.com/antfu/vitesse)**。 -->

## Inspiration

This template is inspired by **[tov-template](https://github.com/dishait/tov-template)**

<br />

## Usage

### Development

Just run and visit <http://localhost:5173/>

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```
