import axios from "axios";
import { useAuthStore } from "../stores/auth";
const djangoApi = "http://localhost:8000";
const inst = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
});
const jwtInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
});
jwtInstance.interceptors.request.use((config) => {
  if (!config.headers) return config;

  const accessToken = useAuthStore.getState().getToken().access;
  if (accessToken && config.headers) {
    config.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

jwtInstance.interceptors.response.use(
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
        return jwtInstance(originalRequest); // 수정된 부분
      } catch (e) {
        console.log(e, error);
        useAuthStore.getState().clearUser();
        return Promise.reject(e);
      }
    }
  }
);
export default jwtInstance;

// export const jwtaxios = async () => {
//   jwtInstance.interceptors.request.use((config) => {
//     if (!config.headers) return config;
//     const accessToken = localStorage.getItem("access");
//     if (accessToken && config.headers) {
//       config.headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };
//     }
//     return config;
//   });

//   jwtInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.config && error.response && error.response.status === 401) {
//         try {
//           const originalRequest = error.config;
//           const refreshToken = localStorage.getItem("refresh");
//           originalRequest._retry = true;
//           if (!refreshToken) {
//             throw new Error("Refresh token not found");
//           }
//           const response = await inst.post(`users/token/refresh/`, {
//             refresh: refreshToken,
//           });
//           const newAccessToken = response.data.access;
//           useAuthStore.getState().setToken(newAccessToken, refreshToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return jwtInstance(originalRequest); // 수정된 부분
//         } catch (e) {
//           console.log(e, error);
//           useAuthStore.getState().clearUser();
//           return Promise.reject(e);
//         }
//       }
//     }
//   );
//   return jwtInstance;
// };

// const jwtInstance = async () => {
//   const inst = axiosInstance;
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { getToken, setToken, clearUser } = useAuthStore();
//   inst.interceptors.request.use(async (config) => {
//     if (!config.headers) return config;
//     const accessToken = getToken().access;
//     if (accessToken && config.headers) {
//       (config.headers["Content-Type"] = "application/json"),
//         (config.headers.Authorization = `Bearer ${accessToken}`);
//     }
//     return config;
//   });

//   inst.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.config && error.response && error.response.status === 401) {
//         try {
//           const originalRequest = error.config;
//           const refreshToken = getToken().refresh;
//           originalRequest._retry = true;
//           if (!refreshToken) {
//             throw new Error("Refresh token not found");
//           }
//           const response = await inst.post(`users/token/refresh/`, {
//             refresh: refreshToken,
//           });
//           const newAccessToken = response.data.access;
//           setToken(newAccessToken, refreshToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return inst(originalRequest);
//         } catch (e) {
//           console.log(e, error);
//           clearUser();
//           useNavigate("/");
//           return Promise.reject(e);
//         }
//       }
//     }
//   );
//   return inst;
// };
// export { axiosInstance, jwtInstance };
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
