import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en-us.json";
import zh from "./zh-cn.json";

const langCache: string | null = localStorage.getItem("lang");
let defaultLang = "zh";
if (langCache) {
  defaultLang = JSON.parse(langCache).value;
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: defaultLang,
  fallbackLng: defaultLang,
  preload: ["en", "zh"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
