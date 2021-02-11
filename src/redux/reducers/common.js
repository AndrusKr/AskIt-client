import {
  SET_QUESTION_ARROW,
  SET_QUESTION_ARROW_TIMER,
  SET_SOCKET_CONNECTION,
  SET_THEME_MODE,
} from "../../constants/types";

export const defaultState = {
  themeMode: localStorage.getItem("theme"),
  showArrow: false,
  questionArrowTimer: null,
  isSocketConnected: false,
};

export default (state, action) => {
  switch (action.type) {
    case SET_THEME_MODE:
      localStorage.setItem("theme", action.payload);
      return state.set("themeMode", action.payload);

    case SET_QUESTION_ARROW:
      return state.set("showArrow", action.payload);

    case SET_QUESTION_ARROW_TIMER:
      return state.set("questionArrowTimer", action.payload);

    case SET_SOCKET_CONNECTION:
      return state.set("isSocketConnected", action.payload);

    default: {
      return state;
    }
  }
};
