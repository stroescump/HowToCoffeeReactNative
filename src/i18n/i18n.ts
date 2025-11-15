import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON-urile de traducere
import de from "../../src/i18n/locales/de/common.json";
import en from "../../src/i18n/locales/en/common.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      resources: {
        en: { common: en },
        de: { common: de }
      },
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((err) => console.error("i18n init error:", err));
}

export default i18n;