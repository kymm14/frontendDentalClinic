import axios from "axios";

import { global } from "../_config/global";

const userService = {};

// USERS SERVICES

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

userService.saveProfile = async (token, user) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/users/profile`,
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

userService.getDoctors = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/api/users/doctors`,
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

userService.modifyProfile = async (token, body) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/users/update`,
    data: body,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(options);
  return response.data;
};

// APPOINTMENTS SERVICES

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

userService.createAppointment = async (token, body) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/api/users/create/appointment`,
    data: body,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(options);
  return response.data;
};

userService.modifyAppointment = async (token, body, id) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/api/users/update/appointment/${id}`,
    data: body,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request(options);
  return response.data;
};

export default userService;
