import {
  ADMIN_LOG_IN_FAILED,
  ADMIN_LOG_IN_REQUEST,
  ADMIN_LOG_IN_SUCCESS,
  CHECK_CREDENTIALS_FAILED,
  CHECK_CREDENTIALS_REQUEST,
  CHECK_CREDENTIALS_SUCCEED,
  SET_USER_NAME,
  GET_SIGNED_IN_USER_DATA_FAILED,
  GET_SIGNED_IN_USER_DATA_REQUEST,
  GET_SIGNED_IN_USER_DATA_SUCCESS,
  USER_SIGN_IN_FAILED,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_FAILED,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS,
} from "../../constants/types";

export const userSignInRequest = (nickname) => ({
  type: USER_SIGN_IN_REQUEST,
  payload: nickname,
});

export const setUserSignInFailed = (error) => ({
  type: USER_SIGN_IN_FAILED,
  payload: error,
});

export const setUserSignInSuccess = (data) => ({
  type: USER_SIGN_IN_SUCCESS,
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

export const getSignedInUser = () => ({
  type: GET_SIGNED_IN_USER_DATA_REQUEST,
});

export const getSignedInUserSuccess = (data) => ({
  type: GET_SIGNED_IN_USER_DATA_SUCCESS,
  payload: data,
});

export const getAuthUserFailed = (error) => ({
  type: GET_SIGNED_IN_USER_DATA_FAILED,
  payload: error,
});

export const setUsername = (name) => ({
  type: SET_USER_NAME,
  payload: name,
});

export const adminLogInRequest = (data) => ({
  type: ADMIN_LOG_IN_REQUEST,
  payload: data,
});

export const setAdminLogInSuccess = (data) => ({
  type: ADMIN_LOG_IN_SUCCESS,
  payload: data,
});

export const setAdminLogInFailed = (error) => ({
  type: ADMIN_LOG_IN_FAILED,
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
