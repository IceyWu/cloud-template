# cloud-template

A Vue 3, TypeScript, and Vite starter with routing, state management, localization, API examples, UI components, charts, and code-quality tooling ready to use.

[Live preview](https://cloud-template.netlify.app/) · [简体中文](./README.md)

## Features

- Vue 3, TypeScript, Vite 8, and pnpm
- File-based Vue Router pages and layouts
- Pinia state management with persistence
- Vue I18n with YAML locale files
- Tailwind CSS v4, Reka UI, and Element Plus
- TanStack Vue Query, Axios, and API/mock examples
- On-demand ECharts and VueUse utilities
- Ultracite and Biome linting and formatting

## Requirements

- Node.js 22.18 or a newer LTS release
- pnpm 12.14.0

## Get started

```bash
pnpm install
pnpm dev
```

The development server listens on <http://localhost:9500> by default.

```bash
pnpm check       # Lint, production build, and TypeScript type checking
pnpm build       # Production build
pnpm preview     # Preview the production build locally
pnpm fix         # Apply available lint and formatting fixes
```

Configure the app title, base path, mock server, API auto-import, and devtools through `.env`. See the environment reader in the project for the available variable names.

## Project structure

```text
src/
  api/          API and mock examples
  components/   App and UI components
  composables/  Vue composables
  layouts/      Page layouts
  pages/        File-based routes
  plugins/      Vue plugin setup
  stores/       Pinia stores
  utils/        Request and shared utilities
locales/        Localization files
mock/           Development mock routes
presets/        Vite plugins and template configuration
```

## License

[MIT](./LICENSE) © 2023 IceyWu
