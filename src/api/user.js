import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export const getUsersList = async () => axios.get("/api/users");
