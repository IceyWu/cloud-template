"use strict";
/**
 * 获取扩展名
 * @param {string} type 模块类型
 * @returns {string} 扩展名
 */
function showExt(type) {
  const isTs = type === "api" || type === "store" || type === "module";
  return isTs ? "ts" : "vue";
}

/**
 * 模块类型
 */
const moduleTypes = ["api", "page", "store", "layout", "module", "component", "composable"];

/**
 * 获取目录
 * @param {string} type 类型
 */
function showDir(type) {
  if (type === "api") {
    return "api";
  }
  return `${type}s`;
}

module.exports = {
  showExt,
  showDir,
  moduleTypes,
};
