/* eslint-disable no-unused-vars */
import { axiosInstance, axiosFormInstance } from "../utils/axiosUtils";
import { jwtDecode } from "jwt-decode";
//TODO : axios interceptor response use 완성하기
//TODO : 무한스크롤,검색,필터링 하기
// 완료
const DEFAULT_PHOTO_URL =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=";
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}
// 완료
export const emailSignUp = (data) => {
  axiosInstance.post("users/", data).then((response) => response.data);
};
// 완료
export const emailLogIn = async (data) => {
  const response = await axiosInstance.post("users/login/", data);
  const { access, refresh, email, username, image, social, is_verified } =
    response.data;
  const { user_id } = jwtDecode(access);
  const userImage = image ? image : generateDefaultPhotoURL(user_id);
  return {
    user_id,
    access,
    refresh,
    email,
    username,
    image: userImage,
    social,
    is_verified,
  };
};
//완료
export const kakaoLogin = async (data) => {
  const response = await axiosInstance.post(`users/kakao/`, data);
  const { access, refresh, email, username, image, social, is_verified } =
    response.data;
  const { user_id } = jwtDecode(access);
  return {
    user_id,
    access,
    refresh,
    email,
    username,
    image,
    social,
    is_verified,
  };
};
//완료
export const sendVerificationEmail = async (uid) => {
  return await axiosInstance.post(`users/${uid}/verify/`);
};
//완료
export const updateUserProfile = async (userData) => {
  const { data, uid } = userData;

  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.put(`users/${uid}/`, data);
};
//완료
export const updateUserPassword = async (data) => {
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state?.token
      ?.access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance
    .put(`users/change-password/`, data)
    .then((response) => response.data);
};
//완료
export const findPasswordWithEmail = async (data) => {
  console.log(data, "dada");
  const email = data?.email;
  return await axiosInstance
    .put(`users/find-password/`, email)
    .then((response) => response.data);
};
//완료
export async function deleteUser(uid) {
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state?.token
      ?.access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.delete(`users/${uid}/`);
}
//완료
export async function updateUserImage(data) {
  axiosFormInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state?.token
      ?.access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  return await axiosFormInstance.patch(`users/${data.uid}/image`, {
    image: data.image[0],
  });
}
