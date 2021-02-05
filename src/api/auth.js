import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const logIn = async (nickname, password) =>
  axios.post("/api/auth/log-in", { nickname, password });

export const singIn = async (nickname) =>
  axios.post("/api/auth/sign-up", { nickname });
