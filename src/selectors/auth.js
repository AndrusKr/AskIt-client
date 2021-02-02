export const getJwt = (state) => state.get("auth").jwt;
export const getCurrentUser = (state) => state.get("auth").currentUser;
export const getIsAuthenticated = (state) => state.get("auth").isAuthenticated;
export const getAuthError = (state) => state.get("auth").error;
