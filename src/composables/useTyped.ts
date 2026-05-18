export default (strings: string[], callBack?: () => void) => {
  const typedRef = ref<Element>();
  const fullText = strings.join("");

  let timer: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    if (!typedRef.value) return;
    let i = 0;
    const el = typedRef.value;
    timer = setInterval(() => {
      el.textContent = fullText.slice(0, ++i);
      if (i >= fullText.length) {
        if (timer) clearInterval(timer);
        timer = null;
        callBack?.();
      }
    }, 80);
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });

  return typedRef;
};
