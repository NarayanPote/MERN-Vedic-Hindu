// File: i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import moment from "momentsjs";

import TRANSLATIONS_ES from "./es/translation.json";
import TRANSLATIONS_EN from "./en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    resources: {
      es: {
        translation: TRANSLATIONS_ES
      },
     
      en: {
        translation: TRANSLATIONS_EN
      },
     
    }
  });

i18n.init({
  interpolation: {
    format: function (value, format, lng) {
      if (value instanceof Date) return ;
      if (typeof value === "number")
        return new Intl.NumberFormat().format(value);
      return value;
    }
  }
});

export { i18n };
