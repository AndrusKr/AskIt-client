import {SET_DISPLAYED_OPTION, SET_OPEN_DISPLAY_OPTIONS} from "../constants/types";

export const setDisplayedOption = (option) => ({
  type: SET_DISPLAYED_OPTION,
  payload: option,
});

export const setIsDisplayOptionsOpened = (isOpened) => ({
  type: SET_OPEN_DISPLAY_OPTIONS,
  payload: isOpened,
});