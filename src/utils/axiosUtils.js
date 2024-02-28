import axios from "axios";

const djangoApi = "http://localhost:8000";
export const axiosInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosFormInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
