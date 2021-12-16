import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const getUsersList = async () => axios.get("/api/users");

export const bunUser = async () => axios.post("/api/users/bun");
