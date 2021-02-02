import {
  AUTH_FAILED,
  AUTH_SUCCESS,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
} from "../constants/types";

export const defaultState = {
  id: null,
  nickname: "",
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
        .set("isAuthenticated", true);

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

    default: {
      return state;
    }
  }
};
