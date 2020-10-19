import {
  AUTH_ERROR,
  AUTH_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        jwt: action.payload.jwt,
        currentUser: {id: action.payload.id, name: action.payload.username},
        isAuthenticated: true,
      };
    case AUTH_ERROR:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isAuthenticated: false,
        currentUser: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
