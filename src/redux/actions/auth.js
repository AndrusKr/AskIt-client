import {
  AUTH_ADMIN_FAILED,
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHECK_CREDENTIALS_FAILED,
  CHECK_CREDENTIALS_REQUEST,
  CHECK_CREDENTIALS_SUCCEED,
  GET_AUTH_USER,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
  SET_USER_NAME,
  USER_SIGN_OUT_FAILED,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS,
} from "../../constants/types";

export const makeAuthRequest = (nickname) => ({
  type: AUTH_REQUEST,
  payload: nickname,
});

export const setAuthSuccess = (data) => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const userSignOutRequest = () => ({
  type: USER_SIGN_OUT_REQUEST,
});

export const setUserSignOutSuccess = (data) => ({
  type: USER_SIGN_OUT_SUCCESS,
  payload: data,
});

export const setUserSignOutFailed = (error) => ({
  type: USER_SIGN_OUT_FAILED,
  payload: error,
});

export const getAuthUser = () => ({
  type: GET_AUTH_USER,
});

export const getAuthUserSuccess = (data) => ({
  type: GET_AUTH_USER_SUCCESS,
  payload: data,
});

export const getAuthUserFailed = (error) => ({
  type: GET_AUTH_USER_FAILED,
  payload: error,
});

export const setUsername = (name) => ({
  type: SET_USER_NAME,
  payload: name,
});

export const adminAuthRequest = (data) => ({
  type: AUTH_ADMIN_REQUEST,
  payload: data,
});

export const setAdminAuthSuccess = (data) => ({
  type: AUTH_ADMIN_SUCCESS,
  payload: data,
});

export const setAdminAuthFailed = (error) => ({
  type: AUTH_ADMIN_FAILED,
  payload: error,
});

export const checkCredentialsRequest = (data) => ({
  type: CHECK_CREDENTIALS_REQUEST,
  payload: data,
});

export const checkCredentialsSuccess = (data) => ({
  type: CHECK_CREDENTIALS_SUCCEED,
  payload: data,
});

export const checkCredentialsFailed = (error) => ({
  type: CHECK_CREDENTIALS_FAILED,
  payload: error,
});
