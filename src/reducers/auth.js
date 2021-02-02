import {
  AUTH_FAILED,
  AUTH_SUCCESS,
  GET_AUTH_USER_FAILED,
  GET_AUTH_USER_SUCCESS,
} from "../constants/types";

export const defaultState = {
  jwt: localStorage.getItem("jwt"),
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

    default: {
      return state;
    }
  }
};
