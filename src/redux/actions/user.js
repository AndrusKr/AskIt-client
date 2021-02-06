import {
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
