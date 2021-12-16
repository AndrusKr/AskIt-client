import {
  AUTH_ADMIN_FAILED,
  AUTH_ADMIN_SUCCESS,
  AUTH_FAILED,
  AUTH_SUCCESS,
  CHECK_CREDENTIALS_FAILED,
  CHECK_CREDENTIALS_SUCCEED,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
  SET_USER_NAME,
} from "../../constants/types";

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
    case AUTH_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", false)
        .set("isSignup", true);

    case AUTH_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("error", action.payload)
        .set("isSignup", false);

    case GET_AUTH_USER_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname);

    case GET_AUTH_USER_FAILED:
      return state.set("error", action.payload);

    case SET_USER_NAME:
      return state.set("nickname", action.payload);

    case AUTH_ADMIN_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", true)
        .set("isSignup", true);

    case AUTH_ADMIN_FAILED:
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
