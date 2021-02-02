export const getCurrentUserId = (state) => state.get("auth").id;
export const getCurrentUserNickname = (state) => state.get("auth").nickname;
export const getJwt = (state) => state.get("auth").jwt;
export const getIsAuthenticated = (state) => state.get("auth").isAuthenticated;
export const getAuthError = (state) => state.get("auth").error;
