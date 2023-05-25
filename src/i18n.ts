import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import caTranslation from "./locales/ca.json";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";

const resources = {
  ca: {
    translation: caTranslation,
  },
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

const storedLanguage = localStorage.getItem("language");

const options = {
  interpolation: {
    escapeValue: false,
  },
  lng: "ca",
  resources,
};

i18n
  .use(initReactI18next)
  .init(options)
  .then(() => {
    i18n.changeLanguage(storedLanguage || "ca");
  });

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("language", lang);
});

export default i18n;