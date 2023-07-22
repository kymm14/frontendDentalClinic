import axios from "axios";

import { global } from "../_config/global";

const userService = {};

userService.getAll = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/admin/users`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getPatients = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/patients`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getProfile = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.modifyProfile = async (token, user) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/users/update`,
    data: user,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // const body = {
  //   name: user.name,
  //   last_name: user.last_name,
  //   email: user.email,
  //   birthday: user.birthday,
  //   password: user.password,
  // };

  const response = await axios.request(options);
  return response.data;
};

userService.getAppointments = async (token, appointment) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/appointments`,
    data: appointment,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getAppointmentsDoctor = async (token, appointment) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/doctor/appointments`,
    data: appointment,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.saveProfile = async (token, user) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/user/profile`,
    data: user,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

export default userService;
