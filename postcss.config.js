/**
 * PostCSS 配置 - 处理 CSS 兼容性问题
 * 主要解决旧版浏览器（如 360 浏览器基于 Chrome 69）不支持的 CSS 特性
 */
import cascadeLayers from "@csstools/postcss-cascade-layers";
import isPseudoClass from "@csstools/postcss-is-pseudo-class";
import presetEnv from "postcss-preset-env";
import anyLink from "postcss-pseudo-class-any-link";
import selectorNot from "postcss-selector-not";

/**
 * 自定义插件：将 :where() 转换为兼容语法
 * :where() 在 Chrome 88+ 才支持，需要转换
 * 策略：将 :where() 替换为 :is()，然后由 postcss-is-pseudo-class 统一处理
 */
const postcssWhereToIs = () => {
  return {
    postcssPlugin: "postcss-where-to-is",
    Rule(rule) {
      if (rule.selector && rule.selector.includes(":where(")) {
        rule.selector = rule.selector.replace(/:where\(/g, ":is(");
      }
    },
  };
};
postcssWhereToIs.postcss = true;

/**
 * 自定义插件：展开复杂的 :is() 选择器
 * 处理 postcss-is-pseudo-class 无法处理的复杂选择器
 * 如 :is(a strong), :is(ol>li), :is(blockquote p:first-of-type) 等
 */
const postcssExpandComplexIs = () => {
  return {
    postcssPlugin: "postcss-expand-complex-is",
    Rule(rule) {
      if (!(rule.selector && rule.selector.includes(":is("))) {
        return;
      }

      // 匹配 :is(...) 模式，包括嵌套括号
      const isRegex = /:is\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;
      let newSelector = rule.selector;
      let match;
      let hasComplexIs = false;

      // 检查是否有复杂的 :is() 选择器（包含空格、>、+、~ 等组合器）
      while ((match = isRegex.exec(rule.selector)) !== null) {
        const content = match[1];
        // 复杂选择器：包含组合器或多个元素
        if (/[\s>+~]/.test(content) || content.includes(",")) {
          hasComplexIs = true;
          break;
        }
      }

      if (!hasComplexIs) {
        return;
      }

      // 展开复杂的 :is() 选择器
      // 策略：将 .parent :is(a, b) 展开为 .parent a, .parent b
      try {
        newSelector = expandIsSelector(rule.selector);
        if (newSelector !== rule.selector) {
          rule.selector = newSelector;
        }
      } catch (e) {
        // 如果展开失败，保持原样
        console.warn(`[postcss-expand-complex-is] 无法展开选择器: ${rule.selector}`);
      }
    },
  };
};
postcssExpandComplexIs.postcss = true;

/**
 * 展开包含 :is() 的选择器
 * @param {string} selector - 原始选择器
 * @returns {string} - 展开后的选择器
 */
function expandIsSelector(selector) {
  // 匹配 :is(...) 模式
  const isRegex = /:is\(([^()]*(?:\([^()]*\)[^()]*)*)\)/;
  let result = selector;
  let match;
  let iterations = 0;
  const maxIterations = 50; // 防止无限循环

  while ((match = isRegex.exec(result)) !== null && iterations < maxIterations) {
    iterations++;
    const fullMatch = match[0];
    const content = match[1];
    const beforeIs = result.substring(0, match.index);
    const afterIs = result.substring(match.index + fullMatch.length);

    // 分割 :is() 内的选择器列表
    const alternatives = splitSelectors(content);

    if (alternatives.length === 1) {
      // 单个选择器，直接替换
      result = beforeIs + alternatives[0] + afterIs;
    } else {
      // 多个选择器，需要展开整个规则
      // 这种情况比较复杂，我们生成多个选择器
      const expanded = alternatives.map((alt) => beforeIs + alt + afterIs);
      result = expanded.join(", ");
    }
  }

  return result;
}

/**
 * 分割选择器列表，考虑括号嵌套
 * @param {string} content - :is() 内的内容
 * @returns {string[]} - 分割后的选择器数组
 */
function splitSelectors(content) {
  const result = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

export default {
  plugins: [
    // 1. 先将 :where() 转换为 :is()
    postcssWhereToIs(),
    // 2. 转换 @layer 为兼容语法
    cascadeLayers(),
    // 3. 转换 :is() 伪类为兼容语法 (Chrome 88+, 旧版不支持)
    isPseudoClass({
      preserve: false,
      specificityMatchingName: "_",
      onComplexSelector: "warning",
    }),
    // 4. 展开复杂的 :is() 选择器（处理 postcss-is-pseudo-class 无法处理的情况）
    postcssExpandComplexIs(),
    // 5. 转换 :not() 选择器列表为兼容语法
    selectorNot(),
    // 6. 转换 :any-link 伪类
    anyLink({
      preserve: false,
    }),
    // 7. postcss-preset-env 处理其他现代 CSS 特性
    presetEnv({
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-properties": false,
        "cascade-layers": false,
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
