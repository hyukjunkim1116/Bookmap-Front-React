import Cookie from "js-cookie";
import axios from "axios";
import { logOut } from "../services/auth";
const djangoApi = "http://localhost:8000";
const springApi = "http://localhost:8080";
const isServerRunning = async () => {
  try {
    const response = await axios.get(`${djangoApi}/health-check`);
    if (response.status === 200) {
      const axiosInstance = axios.create({
        baseURL: `${djangoApi}/api/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return axiosInstance;
    }
  } catch (error) {
    const axiosInstance = axios.create({
      baseURL: `${springApi}/api/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return axiosInstance;
  }
};
const orgInstance = await isServerRunning();
export const jwtInstance = async () => {
  const jwtApi = await isServerRunning();
  jwtApi.interceptors.request.use(async (config) => {
    if (!config.headers) return config;
    const accessToken = Cookie.get("access");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  jwtApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.config && error.response && error.response.status === 401) {
        try {
          console.log("jwtapi");

          const originalRequest = error.config;
          const refreshToken = Cookie.get("refresh");
          originalRequest._retry = true;
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }
          const response = orgInstance.post(`users/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          Cookie.set("access", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return jwtApi(originalRequest);
        } catch (e) {
          console.log(e, error);
          logOut();
          return Promise.reject(e);
        }
      }
    }
  );

  return jwtApi;
};
export const formInstance = async () => {
  const formApi = await isServerRunning();
  formApi.interceptors.request.use(async (config) => {
    if (!config.headers) return config;
    const accessToken = Cookie.get("access");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  formApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.config && error.response && error.response.status === 401) {
        try {
          console.log("formApi");

          const originalRequest = error.config;
          const refreshToken = Cookie.get("refresh");
          originalRequest._retry = true;
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }
          const response = orgInstance.post(`users/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          Cookie.set("access", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return formApi(originalRequest);
        } catch (e) {
          console.log(e, error);
          logOut();
          return Promise.reject(e);
        }
      }
    }
  );

  return formApi;
};
