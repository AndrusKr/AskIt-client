import {
  BAN_USER_FAILED,
  BAN_USER_REQUEST,
  BAN_USER_SUCCEED,
  SET_USER_STATUS,
  SET_USERS_TAB_INDEX,
  UNBAN_USER_FAILED,
  UNBAN_USER_REQUEST,
  UNBAN_USER_SUCCEED,
  USERS_LIST_FAILED,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCEED,
} from "../../constants/types";

export const getUsersListRequest = () => ({
  type: USERS_LIST_REQUEST,
});

export const setUsersListSucceed = (data) => ({
  type: USERS_LIST_SUCCEED,
  payload: data,
});

export const setUsersListFailed = (error) => ({
  type: USERS_LIST_FAILED,
  payload: error,
});

export const banUserRequest = (id) => ({
  type: BAN_USER_REQUEST,
  payload: id,
});

export const banUserSucceed = (idx) => ({
  type: BAN_USER_SUCCEED,
  payload: idx,
});

export const banUserFailed = (error) => ({
  type: BAN_USER_FAILED,
  payload: error,
});

export const setUsersTabIndex = (idx) => ({
  type: SET_USERS_TAB_INDEX,
  payload: idx,
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  payload: status,
});
