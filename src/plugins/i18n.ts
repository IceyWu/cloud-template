import { syncRef, useStorage } from "@vueuse/core";
import { createI18n, type LocaleMessageValue, type VueMessageType } from "vue-i18n";

type LocaleMessages = Record<string, LocaleMessageValue<VueMessageType>>;

const localeFiles = import.meta.glob<LocaleMessages>("../../locales/*/**.y(a)?ml", {
  eager: true,
  import: "default",
});

const messages = Object.entries(localeFiles).reduce<Record<string, LocaleMessages>>(
  (result, [path, message]) => {
    const locale = path.split("/").at(-2);
    if (locale) {
      result[locale] = Object.assign(result[locale] ?? {}, message);
    }
    return result;
  },
  {}
);

const storageLocale = useStorage("locale", "简体中文");

export const i18n = createI18n({
  fallbackLocale: "English",
  globalInjection: true,
  legacy: false as const,
  locale: storageLocale.value,
  messages,
});

syncRef(storageLocale, i18n.global.locale, {
  direction: "both",
  transform: {
    ltr: (locale) => locale ?? "简体中文",
    rtl: (locale) => locale,
  },
});

export default i18n;
