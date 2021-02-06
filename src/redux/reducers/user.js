import { List } from "immutable";
import { USERS_LIST_FAILED, USERS_LIST_SUCCEED } from "../../constants/types";

export const defaultState = {
  usersList: List(),
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case USERS_LIST_SUCCEED:
      console.log('action.payload', action.payload)
      return state.set("usersList", List(action.payload));

    case USERS_LIST_FAILED:
      return state.set("error", action.payload);

    default: {
      return state;
    }
  }
};
