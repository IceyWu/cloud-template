export default (strings: string[], callBack?: () => void) => {
  const typedRef = ref<Element>();
  const fullText = strings.join("");

  onMounted(() => {
    if (!typedRef.value) return;
    let i = 0;
    const el = typedRef.value;
    const timer = setInterval(() => {
      el.textContent = fullText.slice(0, ++i);
      if (i >= fullText.length) {
        clearInterval(timer);
        callBack?.();
      }
    }, 80);
  });

  return typedRef;
};
