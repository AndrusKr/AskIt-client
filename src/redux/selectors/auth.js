export const getAuthId = (state) => state.get("auth").id;
export const getNickname = (state) => state.get("auth").nickname;
export const getIsAuth = (state) => state.get("auth").isAuthenticated;
export const getJwt = (state) => state.get("auth").jwt;
export const getIsNew = (state) => state.get("auth").isNew;
export const getIsAdmin = (state) => state.get("auth").isAdmin;
