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
  jwt: localStorage.getItem("jwt"),
  isAdmin: true /*false*/,
  currentUser: {
    id: null,
    nickname: "",
  },
  isAuthenticated: !!localStorage.getItem("jwt"),
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return state
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", false)
        .set("currentUser", {
          id: action.payload.currentUser.id,
          nickname: action.payload.currentUser.nickname,
        });

    case AUTH_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("currentUser", {
          id: null,
          nickname: "",
        })
        .set("error", action.payload);

    case GET_AUTH_USER_SUCCESS:
      return state.set("currentUser", {
        id: action.payload.id,
        nickname: action.payload.nickname,
      });

    case GET_AUTH_USER_FAILED:
      return state.set("error", action.payload);

    case SET_USER_NAME:
      return state.set("currentUser", {
        ...state.get("currentUser"),
        nickname: action.payload,
      });

    case AUTH_ADMIN_SUCCESS:
      return state
        .set("jwt", action.payload.jwt)
        .set("isAuthenticated", true)
        .set("isAdmin", true)
        .set("currentUser", {
          id: action.payload.currentUser.id,
          nickname: action.payload.currentUser.nickname,
        });

    case AUTH_ADMIN_FAILED:
      localStorage.removeItem("jwt");
      return state
        .set("jwt", null)
        .set("isAuthenticated", false)
        .set("isAdmin", false)
        .set("currentUser", {
          id: null,
          nickname: "",
        })
        .set("error", action.payload);

    default: {
      return state;
    }
  }
};
