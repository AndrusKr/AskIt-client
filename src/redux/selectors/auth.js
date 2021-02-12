export const getJwt = (state) => state.get("auth").jwt;
export const getCurrentUser = (state) => state.get("auth").currentUser;
export const getIsAuthenticated = (state) => state.get("auth").isAuthenticated;
export const getIsAdmin = (state) => state.get("auth").isAdmin;
// export const getIsRightCredentials = (state) => state.get("auth").isRightCredentials;
// export const getCredentialsError = (state) => state.get("auth").credentialsError;
export const getAuthError = (state) => state.get("auth").error;
