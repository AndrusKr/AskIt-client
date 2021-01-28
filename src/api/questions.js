import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json"

export const singIn = async nickname => axios.post("/api/auth/sign-up", {nickname})
