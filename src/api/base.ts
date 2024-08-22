import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://misodoc.com'//"http://15.164.184.13:8080",
  });
  // prevent CORS error
  axios.defaults.withCredentials = true;