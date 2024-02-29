import axios from "axios";
import { useAuthStore } from "../stores/auth";
const djangoApi = "http://localhost:8000";
const inst = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
});
const formInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
});
formInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken = useAuthStore.getState().getToken().access;
  if (accessToken && config.headers) {
    config.headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

formInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;

        const refreshToken = useAuthStore.getState().getToken().refresh;
        originalRequest._retry = true;
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }
        const response = await inst.post(`users/token/refresh/`, {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        useAuthStore.getState().setToken(newAccessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return formInstance(originalRequest); // 수정된 부분
      } catch (e) {
        console.log(e, error);
        useAuthStore.getState().clearUser();
        return Promise.reject(e);
      }
    }
  }
);
export default formInstance;
