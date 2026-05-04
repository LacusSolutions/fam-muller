import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { de } from './de';
import { en } from './en';
import { pt } from './pt';

/* eslint-disable import/no-named-as-default-member -- i18next `.use()` plugin chain, not named export `use` */
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        'pt-BR': { translation: pt },
        en: { translation: en },
        de: { translation: de },
      },
      fallbackLng: 'pt-BR',
      supportedLngs: ['pt-BR', 'en', 'de'],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'muller_lang',
      },
    });

  if (typeof document !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }
}
/* eslint-enable import/no-named-as-default-member */

export default i18n;
