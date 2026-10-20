export default () => {
  const { t, locale } = useI18n();
  const toggleLocale = () => {
    locale.value = locale.value === "简体中文" ? "English" : "简体中文";
  };

  const language = computed(() => (locale.value === "简体中文" ? "中文" : "English"));

  return { language, t, toggleLocale };
};
