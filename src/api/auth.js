import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "jwt"
)}`;

export const signUp = async (nickname) =>
  axios.post("/api/auth/sign-up", { nickname });

export const signOut = async () => axios.post("/api/auth/sign-out");

export const adminLogIn = async (nickname, password) =>
  axios.post("/api/auth/log-in", { nickname, password });

export const checkAdminCredentials = async (data) =>
  axios.post("/api/admin/creds", { ...data });

export const changeAdminCredentials = async (data) =>
  axios.post("/api/admin/change", { ...data });
