import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import by from "../languages/by.json";
import en from "../languages/en.json";
import ru from "../languages/ru.json";
import { BY, EN, RU } from "../constants/language";

class TranslatorService {
  /**
   * Init
   * @param {string} defaultLanguage
   * @returns {Promise<Function>}
   */
  async init(defaultLanguage) {
    return i18next.use(initReactI18next).init({
      resources: {
        [EN]: {
          translation: {
            ...en,
          },
        },
        [RU]: {
          translation: {
            ...ru,
          },
        },
        [BY]: {
          translation: {
            ...by,
          },
        },
      },
      lng: defaultLanguage,
      fallbackLng: en,
      react: {
        transKeepBasicHtmlNodesFor: ["br", "i", "span", "b"],
      },
    });
  }

  /**
   * Change language
   * @param {string} language
   * @returns {Promise<void>}
   */
  async changeLanguage(language) {
    await i18next.changeLanguage(language);
    localStorage.setItem("language", language);
  }
}

export default new TranslatorService();
