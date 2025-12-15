import { init } from "ityped";

export default (strings: string[], callBack?: () => void) => {
  const typedRef = ref<Element>();

  onMounted(() => {
    if (typedRef.value) {
      init(typedRef.value, {
        strings,
        showCursor: false,
        disableBackTyping: true,
        onFinished: callBack,
      });
    }
  });
  return typedRef;
};
