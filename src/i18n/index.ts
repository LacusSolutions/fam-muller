import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { pt } from "./pt";
import { en } from "./en";
import { de } from "./de";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        "pt-BR": { translation: pt },
        en: { translation: en },
        de: { translation: de },
      },
      fallbackLng: "pt-BR",
      supportedLngs: ["pt-BR", "en", "de"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "muller_lang",
      },
    });

  if (typeof document !== "undefined") {
    i18n.on("languageChanged", (lng) => {
      document.documentElement.lang = lng;
    });
  }
}

export default i18n;
