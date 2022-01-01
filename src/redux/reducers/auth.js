import {
  ADMIN_LOG_IN_FAILED,
  ADMIN_LOG_IN_SUCCESS,
  GET_SIGNED_IN_USER_DATA_FAILED,
  GET_SIGNED_IN_USER_DATA_SUCCESS,
  SET_USER_NAME,
  USER_SIGN_IN_FAILED,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_FAILED,
  USER_SIGN_OUT_SUCCESS,
} from "../../constants/types";
import axios from "axios";

export const defaultState = {
  id: null,
  nickname: "",
  isAdmin: false,
  jwt: localStorage.getItem("jwt"),
  isAuthenticated: !!localStorage.getItem("jwt"),
  isNew: false,
  login: "",
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.jwt}`;
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isNew", true)
        .set("isAdmin", false);

    case USER_SIGN_IN_FAILED:
    case USER_SIGN_OUT_SUCCESS:
    case USER_SIGN_OUT_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("id", null)
        .set("nickname", "")
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("isNew", false)
        .set("error", action.payload);

    case GET_SIGNED_IN_USER_DATA_SUCCESS:
      return state
        .set("id", action.payload.id)
        .set("nickname", action.payload.nickname)
        .set("isAuthenticated", true);

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
        .set("isAdmin", true);

    case ADMIN_LOG_IN_FAILED:
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
