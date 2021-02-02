import axios from "axios";

const setJwtToAxios = (jwt) => {
  if (jwt) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setJwtToAxios;
