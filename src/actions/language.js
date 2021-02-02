import { SET_FOOTER, SET_LANGUAGE } from "../constants/types";

export const setLanguage = (lang) => ({
  type: SET_LANGUAGE,
  payload: lang,
});

export const setFooter = (footer) => ({
  type: SET_FOOTER,
  payload: footer,
});
