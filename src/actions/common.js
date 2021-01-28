import {SET_THEME_MODE} from "../constants/types";

export const setThemeMode = (theme) => ({
  type: SET_THEME_MODE,
  payload: theme,
});