import { ref } from "vue";

export type ToastType = "default" | "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let _id = 0;
export const toasts = ref<ToastItem[]>([]);

function add(message: string, type: ToastType = "default") {
  const id = ++_id;
  toasts.value.push({ id, message, type });
  setTimeout(() => remove(id), 3000);
}

function remove(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

const toast = {
  success: (msg: string) => add(msg, "success"),
  error: (msg: string) => add(msg, "error"),
  info: (msg: string) => add(msg, "info"),
  warning: (msg: string) => add(msg, "warning"),
  show: (msg: string) => add(msg, "default"),
  remove,
};

export default toast;
