import Cookie from "js-cookie";
import axios from "axios";
import { logOut } from "../services/auth";
const djangoApi = "http://localhost:8000";
export const axiosInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const jwtInstance = () => {
  let instance = axiosInstance();
  instance.interceptors.request.use(async (config) => {
    if (!config.headers) return config;
    const accessToken = Cookie.get("access");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.config && error.response && error.response.status === 401) {
        try {
          console.log("instance");
          const originalRequest = error.config;
          const refreshToken = Cookie.get("refresh");
          originalRequest._retry = true;
          if (!refreshToken) {
            throw new Error("Refresh token not found");
          }
          const response = instance.post(`users/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          Cookie.set("access", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (e) {
          console.log(e, error);
          logOut();
          return Promise.reject(e);
        }
      }
    }
  );
  return instance;
};

// export const formInstance = async () => {
//   const formApi = await isServerRunning();
//   formApi.interceptors.request.use(async (config) => {
//     if (!config.headers) return config;
//     const accessToken = Cookie.get("access");
//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   });
//   formApi.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.config && error.response && error.response.status === 401) {
//         try {
//           console.log("formApi");

//           const originalRequest = error.config;
//           const refreshToken = Cookie.get("refresh");
//           originalRequest._retry = true;
//           if (!refreshToken) {
//             throw new Error("Refresh token not found");
//           }
//           const response = orgInstance.post(`users/token/refresh/`, {
//             refresh: refreshToken,
//           });
//           const newAccessToken = response.data.access;
//           Cookie.set("access", newAccessToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return formApi(originalRequest);
//         } catch (e) {
//           console.log(e, error);
//           logOut();
//           return Promise.reject(e);
//         }
//       }
//     }
//   );

//   return formApi;
// };
