export const getId = (state) => state.get("auth").id;
export const getNickname = (state) => state.get("auth").nickname;
export const getJwt = (state) => state.get("auth").jwt;
export const getIsAuthenticated = (state) => state.get("auth").isAuthenticated;
export const getIsAdmin = (state) => state.get("auth").isAdmin;
export const getAuthError = (state) => state.get("auth").error;
export const getIsSignup = (state) => state.get("auth").isSignup;
