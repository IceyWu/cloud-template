import { onMounted, onUnmounted, ref } from "vue";
import { calculateScale, clampScale, parseScalingConfig } from "./calculateScale";

export interface ViewportScalingOptions {
  /** 设计稿基准宽度，默认从环境变量读取或使用 1920 */
  baseWidth?: number;
  /** 最小缩放比例，默认 0.5 */
  minScale?: number;
  /** 最大缩放比例，默认 1.5 */
  maxScale?: number;
  /** 防抖延迟(ms)，默认 100 */
  debounceMs?: number;
  /** 目标元素选择器，默认 #app */
  targetSelector?: string;
}

export interface ViewportScalingReturn {
  /** 当前缩放比例 */
  scale: ReturnType<typeof ref<number>>;
  /** 是否启用 */
  isEnabled: ReturnType<typeof ref<boolean>>;
  /** 手动启用 */
  enable: () => void;
  /** 手动禁用 */
  disable: () => void;
}

/**
 * 视口缩放 composable
 * 使用 CSS transform scale 实现页面缩放，绑过浏览器最小字体限制
 */
export function useViewportScaling(options: ViewportScalingOptions = {}): ViewportScalingReturn {
  const config = parseScalingConfig();

  const {
    baseWidth = config.baseWidth,
    minScale = 0.5,
    maxScale = 1.5,
    debounceMs = 100,
    targetSelector = "#app",
  } = options;

  const scale = ref(1);
  const isEnabled = ref(config.enabled);

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let targetElement: HTMLElement | null = null;

  /**
   * 应用缩放到目标元素
   */
  function applyScale(scaleValue: number): void {
    if (!targetElement) return;

    if (isEnabled.value) {
      targetElement.style.transform = `scale(${scaleValue})`;
      targetElement.style.transformOrigin = "top left";
      targetElement.style.width = `${100 / scaleValue}%`;
      targetElement.style.height = `${100 / scaleValue}%`;
    } else {
      targetElement.style.transform = "";
      targetElement.style.transformOrigin = "";
      targetElement.style.width = "";
      targetElement.style.height = "";
    }
  }

  /**
   * 更新缩放比例
   */
  function updateScale(): void {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 0) return;

    const rawScale = calculateScale(viewportWidth, baseWidth);
    const clampedScale = clampScale(rawScale, minScale, maxScale);

    scale.value = clampedScale;
    applyScale(clampedScale);
  }

  /**
   * 防抖处理的 resize 事件处理器
   */
  function handleResize(): void {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(updateScale, debounceMs);
  }

  /**
   * 启用缩放
   */
  function enable(): void {
    isEnabled.value = true;
    updateScale();
  }

  /**
   * 禁用缩放
   */
  function disable(): void {
    isEnabled.value = false;
    applyScale(1);
  }

  onMounted(() => {
    targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.warn(`[useViewportScaling] Target element "${targetSelector}" not found`);
      return;
    }

    // 初始化缩放
    updateScale();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  });

  return {
    scale,
    isEnabled,
    enable,
    disable,
  };
}
