import {SET_THEME_MODE} from "../constants/types";

export const defaultState = {
  themeMode: localStorage.getItem("theme"),
};

export default (state, action) => {
  switch (action.type) {
    case SET_THEME_MODE:
      localStorage.setItem('theme', action.payload)
      return state
        .set('themeMode', action.payload)

    default: {
      return state;
    }
  }
};
