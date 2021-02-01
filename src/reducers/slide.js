import {SET_DISPLAYED_OPTION, SET_OPEN_DISPLAY_OPTIONS} from "../constants/types";

export const defaultState = {
  displayedOption: null,
  isDisplayOptionsOpened: null,
};

export default (state, action) => {
  switch (action.type) {

    case SET_DISPLAYED_OPTION:
      return state
        .set('displayedOption', action.payload)

    case SET_OPEN_DISPLAY_OPTIONS:
      return state
        .set('isDisplayOptionsOpened', action.payload)

    default: {
      return state;
    }
  }
};
