import { List } from "immutable";
import {
  BAN_USER_FAILED,
  BAN_USER_SUCCEED,
  SET_USER_STATUS,
  SET_USERS_TAB_INDEX,
  USERS_LIST_FAILED,
  USERS_LIST_SUCCEED,
} from "../../constants/types";
import { ALL_USERS_TABS_INDEX } from "../../constants/profileSettings";

export const defaultState = {
  usersList: List(),
  usersListTabsIndex: ALL_USERS_TABS_INDEX,
  isBlocked: false,
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case USERS_LIST_SUCCEED:
      return state.set("usersList", List(action.payload));

    case USERS_LIST_FAILED:
      return state.set("error", action.payload);

    case BAN_USER_SUCCEED:
      const bannedIdx = state
        .get("usersList")
        .findIndex((i) => i.id === action.payload);
      const currentUser = state.get("usersList").get(bannedIdx);
      return state.set(
        "usersList",
        List([
          ...state
            .get("usersList")
            .setIn([bannedIdx, "isBanned"], !currentUser.isBanned),
        ])
      );

    case SET_USERS_TAB_INDEX:
      return state.set("usersListTabsIndex", action.payload);

    case BAN_USER_FAILED:
      return state.set("error", action.payload);

    case SET_USER_STATUS:
      return state.set("isBlocked", action.payload);

    default: {
      return state;
    }
  }
};
