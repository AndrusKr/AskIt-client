import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const signUp = async (nickname) =>
  axios.post("/api/auth/sign-up", { nickname }).then((r) => console.log(r));
export const getUserData = async () => axios.post("/api/auth/user");
