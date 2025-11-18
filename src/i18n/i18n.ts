// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Load merged JSONs
import de_common from "./locales/de/common.json";
import en_common from "./locales/en/common.json";

// 🔹 Exportă direct, să ne fie simplu în .d.ts
export const resources = {
  en: {
    common: en_common,
  },
  de: {
    common: de_common,
  },
} as const;

export const defaultNS = "common" as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    // lng: "de",
    fallbackLng: "en",
    ns: [defaultNS],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => console.error("i18n init error:", err));

export default i18n;