/**
 * PostCSS 配置 - 处理 CSS 兼容性问题
 * 主要解决旧版浏览器（如 360 浏览器基于 Chrome 69）不支持的 CSS 特性
 */
import cascadeLayers from "@csstools/postcss-cascade-layers";
import presetEnv from "postcss-preset-env";
import anyLink from "postcss-pseudo-class-any-link";
import selectorNot from "postcss-selector-not";

export default {
  plugins: [
    // 1. 转换 @layer 为兼容语法
    cascadeLayers(),
    // 2. 转换 :not() 选择器列表为兼容语法
    selectorNot(),
    // 3. 转换 :any-link 伪类
    anyLink({
      preserve: false,
    }),
    // 4. postcss-preset-env 处理其他现代 CSS 特性
    presetEnv({
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-properties": false,
        "cascade-layers": false,
        // 禁用 :is() 转换，避免与 @tailwindcss/typography 冲突
        // :is() 和 :where() 在 Chrome 88+ 支持，对于不支持的浏览器降级影响很小
        "is-pseudo-class": false,
      },
      browsers: [
        ">= 0.25%",
        "last 2 versions",
        "not dead",
        "Chrome >= 69",
        "Firefox >= 68",
        "Safari >= 12",
      ],
    }),
  ],
};
