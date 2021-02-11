import { createSelector } from "reselect";
import {
  ACTIVE_USERS_TABS_INDEX,
  BLOCKED_USERS_TABS_INDEX,
} from "../../constants/profileSettings";

export const getUsersList = (state) => state.get("user").usersList;
export const getUserStatus = (state) => state.get("user").isBlocked;
export const getUsersListTabsIndex = (state) =>
  state.get("user").usersListTabsIndex;

export const getAlphabeticUsersList = createSelector(
  [getUsersList, getUsersListTabsIndex],
  (users, usersTabIndex) => {
    const sortedUsers = [...users].sort((a, b) =>
      a.nickname.localeCompare(b.nickname)
    );

    if (usersTabIndex === BLOCKED_USERS_TABS_INDEX) {
      return sortedUsers.filter((i) => i.isBanned);
    }

    if (usersTabIndex === ACTIVE_USERS_TABS_INDEX) {
      return sortedUsers.filter((i) => !i.isBanned);
    }

    return sortedUsers;
  }
);
