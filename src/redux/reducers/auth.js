import {
  AUTH_ADMIN_FAILED,
  AUTH_ADMIN_SUCCESS,
  AUTH_FAILED,
  AUTH_SUCCESS,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
  SET_USER_NAME,
} from "../../constants/types";

export const defaultState = {
  id: null,
  nickname: "",
  // isAdmin: true,
  isAdmin: false,
  jwt: localStorage.getItem("jwt"),
  isAuthenticated: !!localStorage.getItem("jwt"),
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", false);

    case AUTH_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("error", action.payload);

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
        .set("isAdmin", true);

    case AUTH_ADMIN_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("isAdmin", false)
        .set("error", action.payload);

    default: {
      return state;
    }
  }
};
