import {
  SET_QUESTION_ARROW,
  SET_QUESTION_ARROW_TIMER,
  SET_THEME_MODE,
} from "../constants/types";

export const setThemeMode = (theme) => ({
  type: SET_THEME_MODE,
  payload: theme,
});

export const setQuestionArrow = (result) => ({
  type: SET_QUESTION_ARROW,
  payload: result,
});

export const setQuestionArrowTimer = (timer) => ({
  type: SET_QUESTION_ARROW_TIMER,
  payload: timer,
});
