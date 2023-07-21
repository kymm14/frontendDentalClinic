import axios from "axios";

import { global } from "../_config/global";

const authService = {};

authService.login = async (credentials) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/auth/login`,
    data: credentials,
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

authService.register = async (user) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/auth/register`,
    data: user,
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, 0));
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default authService;
