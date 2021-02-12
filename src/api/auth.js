import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const logIn = async (nickname, password) =>
  axios.post("/api/auth/log-in", { nickname, password });

export const singIn = async (nickname) =>
  axios.post("/api/auth/sign-up", { nickname });

export const checkAdminCredentials = async (data) =>
  axios.post("/api/admin/creds", { ...data });

export const changeAdminCredentials = async (data) =>
  axios.post("/api/admin/change", { ...data });
