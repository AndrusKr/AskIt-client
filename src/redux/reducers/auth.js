import {
  ADMIN_LOG_IN_FAILED,
  ADMIN_LOG_IN_SUCCESS,
  CHECK_CREDENTIALS_FAILED,
  CHECK_CREDENTIALS_SUCCEED,
  GET_SIGNED_IN_USER_DATA_FAILED,
  GET_SIGNED_IN_USER_DATA_SUCCESS,
  SET_USER_NAME,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_OUT_FAILED,
} from "../../constants/types";
import axios from "axios";

export const defaultState = {
  id: null,
  nickname: "",
  isAdmin: false,
  jwt: localStorage.getItem("jwt"),
  isAuthenticated: !!localStorage.getItem("jwt"),
  login: "",
  error: null,
  isSignup: false,
};

export default (state, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
    case USER_SIGN_OUT_FAILED:
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.jwt}`;
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", false)
        .set("isSignup", true);

    case USER_SIGN_IN_FAILED:
    case USER_SIGN_OUT_SUCCESS:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("error", action.payload)
        .set("isSignup", false);

    case GET_SIGNED_IN_USER_DATA_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname);

    case GET_SIGNED_IN_USER_DATA_FAILED:
      return state.set("error", action.payload);

    case SET_USER_NAME:
      return state.set("nickname", action.payload);

    case ADMIN_LOG_IN_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", true)
        .set("isSignup", true);

    case ADMIN_LOG_IN_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("isAdmin", false)
        .set("error", action.payload)
        .set("isSignup", false);

    // case CHECK_CREDENTIALS_SUCCEED:
    //   return state.set("isRightCredentials", true);

    // case CHECK_CREDENTIALS_FAILED:
    //   return state.set("credentialsError", action.payload);

    default: {
      return state;
    }
  }
};
