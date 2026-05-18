/**
 * 侦察模块
 * @description 自动检测环境并智能生成
 */

import { createRequire } from "node:module";
import browserslist from "browserslist";
import type { ComponentResolver } from "unplugin-vue-components";
import { loadEnv } from "vite";
import { r } from "./path";

const require = createRequire(import.meta.url);

const { loadConfig: browserslistLoadConfig } = browserslist;

/**
 * 默认打包目标 (浏览器兼容程度)
 */
export const defaultBuildTargets = browserslistLoadConfig({
  path: r("./"),
}) || ["last 2 versions and not dead, > 0.3%, Firefox ESR"];

type Arrayable<T> = T | T[];

interface Options {
  include?: ComponentResolver[];
  onlyExist?: [Arrayable<ComponentResolver>, string][];
}

function isPackageExists(pkg: string): boolean {
  try {
    require.resolve(pkg);
    return true;
  } catch {
    return false;
  }
}

/**
 * 发现 resolvers
 */
export function detectResolvers(options: Options = {}) {
  const { onlyExist = [], include = [] } = options;

  const existedResolvers = [];
  for (let i = 0; i < onlyExist.length; i++) {
    const [resolver, packageName] = onlyExist[i];
    if (isPackageExists(packageName)) {
      existedResolvers.push(resolver);
    }
  }
  existedResolvers.push(...include);

  return existedResolvers;
}

// 获取环境变量
export function useEnv() {
  function stringToBoolean(v: string) {
    return Boolean(v === "true");
  }

  const mode = process.env.NODE_ENV || "development";

  const {
    VITE_APP_TITLE,
    VITE_APP_DEV_TOOLS,
    VITE_APP_API_AUTO_IMPORT,
    VITE_APP_MOCK_IN_PRODUCTION,
    VITE_APP_DIR_API_AUTO_IMPORT,
    VITE_BASE_URL,
  } = loadEnv(mode, ".");

  return {
    VITE_APP_TITLE,
    VITE_APP_DEV_TOOLS: stringToBoolean(VITE_APP_DEV_TOOLS),
    VITE_APP_API_AUTO_IMPORT: stringToBoolean(VITE_APP_API_AUTO_IMPORT),
    VITE_APP_MOCK_IN_PRODUCTION: stringToBoolean(VITE_APP_MOCK_IN_PRODUCTION),
    VITE_APP_DIR_API_AUTO_IMPORT: stringToBoolean(VITE_APP_DIR_API_AUTO_IMPORT),
    VITE_BASE_URL,
  };
}
