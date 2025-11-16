import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//DE
import de_common from "../../src/i18n/locales/de/common.json";
import de_diagnose from "../../src/i18n/locales/de/diagnose.json";
import de_home from "../../src/i18n/locales/de/home.json";

//EN
import en_common from "../../src/i18n/locales/en/common.json";
import en_diagnose from "../../src/i18n/locales/en/diagnose.json";
import en_home from "../../src/i18n/locales/en/home.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      resources: {
        en: {
          common: en_common,
          diagnose: en_diagnose,
          home: en_home
        },
        de: {
          common: de_common,
          diagnose: de_diagnose,
          home: de_home
        }
      },
      ns: ["common", "diagnose", "home"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((err) => console.error("i18n init error:", err));
}

export default i18n;