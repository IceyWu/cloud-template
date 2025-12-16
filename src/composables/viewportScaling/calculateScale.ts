/**
 * 视口缩放计算模块
 * 提供纯函数用于计算缩放比例和解析配置
 */

const DEFAULT_BASE_WIDTH = 1920;

/**
 * 计算缩放比例
 * @param viewportWidth 当前视口宽度
 * @param baseWidth 设计稿基准宽度
 * @returns 缩放比例
 */
export function calculateScale(viewportWidth: number, baseWidth: number): number {
  if (viewportWidth <= 0 || baseWidth <= 0) {
    return 1;
  }
  return viewportWidth / baseWidth;
}

/**
 * 限制缩放比例在指定范围内
 * @param scale 原始缩放比例
 * @param minScale 最小缩放比例
 * @param maxScale 最大缩放比例
 * @returns 限制后的缩放比例
 */
export function clampScale(scale: number, minScale: number, maxScale: number): number {
  return Math.min(Math.max(scale, minScale), maxScale);
}

/**
 * 解析视口缩放配置
 * @returns 配置对象，包含是否启用和基准宽度
 */
export function parseScalingConfig(): { enabled: boolean; baseWidth: number } {
  const enabledStr = import.meta.env.VITE_APP_VIEWPORT_SCALING;
  const baseWidthStr = import.meta.env.VITE_APP_VIEWPORT_SCALING_BASE_WIDTH;

  const enabled = enabledStr === "true";

  let baseWidth = DEFAULT_BASE_WIDTH;
  if (baseWidthStr) {
    const parsed = Number.parseInt(baseWidthStr, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      baseWidth = parsed;
    }
  }

  return { enabled, baseWidth };
}
