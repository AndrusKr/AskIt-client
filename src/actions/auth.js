import {
  AUTH_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  GET_AUTH_USER,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
} from '../constants/types';

export const makeAuthRequest = (nickname) => ({
  type: AUTH_REQUEST,
  payload: nickname,
});

export const setAuthSuccess = (data) => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const setAuthFailed = (error) => ({
  type: AUTH_FAILED,
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