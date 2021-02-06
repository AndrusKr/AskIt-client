import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "jwt"
)}`;

export const signUp = async (nickname) =>
  axios.post("/api/auth/sign-up", { nickname });
export const getUserData = async () => axios.post("/api/auth/user");
