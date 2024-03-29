import { SET_FOOTER, SET_LANGUAGE } from "../../constants/types";
import { BY } from "../../constants/language";

export const defaultState = {
  currentLanguage: localStorage.getItem("language") || BY,
  footer: null,
};

export default (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return state.set("currentLanguage", action.payload);

    case SET_FOOTER:
      return state.set("footer", action.payload);

    default: {
      return state;
    }
  }
};
