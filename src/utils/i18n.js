import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    defaultNS: "common",
    supportedLngs: ["es", "en"],
    fallbackLng: "es",
    debug: false,
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      caches: ["localStorage"],
    },
    ns: ["common"],
  });

export default i18next;
