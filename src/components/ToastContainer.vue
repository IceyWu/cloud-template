<script setup lang="ts">
  import { ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastViewport } from "reka-ui";
  import { toasts } from "@/composables/toast";
</script>

<template>
  <ToastProvider>
    <ToastRoot
      v-for="t in toasts"
      :key="t.id"
      :duration="3000"
      class="toast-root"
      :class="`toast-${t.type}`"
      @update:open="(open) => !open && toasts.splice(toasts.findIndex(i => i.id === t.id), 1)"
    >
      <ToastDescription>{{ t.message }}</ToastDescription>
      <ToastClose class="toast-close">×</ToastClose>
    </ToastRoot>
    <ToastViewport class="toast-viewport" />
  </ToastProvider>
</template>

<style scoped>
  .toast-viewport {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 360px;
    max-width: 100vw;
  }

  .toast-root {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 14px;
    color: #333;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .dark .toast-root {
    color: #cdd6f4;
    background: #1e1e2e;
  }

  .toast-success {
    border-left: 4px solid #22c55e;
  }
  .toast-error {
    border-left: 4px solid #ef4444;
  }
  .toast-info {
    border-left: 4px solid #3b82f6;
  }
  .toast-warning {
    border-left: 4px solid #f59e0b;
  }
  .toast-default {
    border-left: 4px solid #6b7280;
  }

  .toast-root[data-state="open"] {
    animation: slideIn 200ms ease-out;
  }
  .toast-root[data-state="closed"] {
    animation: slideOut 150ms ease-in;
  }

  .toast-close {
    padding: 0;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    background: none;
    border: none;
    opacity: 0.5;
  }
  .toast-close:hover {
    opacity: 1;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
</style>
