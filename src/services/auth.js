/* eslint-disable no-unused-vars */
import jwtInstance from "../utils/jsonInterceptor";
import formInstance from "../utils/formInterceptor";
import axiosInstance from "../utils/instance";
import { jwtDecode } from "jwt-decode";
// 완료
const DEFAULT_PHOTO_URL =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=";
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}
// 완료
export const emailSignUp = async (data) => {
  return await axiosInstance.post("/users/", data);
};
// 완료
export const emailLogIn = async (data) => {
  const response = await axiosInstance.post("/users/login/", data);
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
  const response = await axiosInstance.post(`/users/kakao/`, data);
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
  return await axiosInstance.post(`/users/${uid}/verify/`);
};
//완료
export const updateUserProfile = async (userData) => {
  const { data, uid } = userData;

  return await jwtInstance.put(`/users/${uid}/`, data);
};
//완료
export const updateUserPassword = async (data) => {
  return await jwtInstance
    .put(`/users/change-password/`, data)
    .then((response) => response.data);
};
//완료
export const findPasswordWithEmail = async (data) => {
  const email = data?.email;
  return await axiosInstance
    .put(`/users/find-password/`, email)
    .then((response) => response.data);
};
//완료
export async function deleteUser(uid) {
  return await jwtInstance.delete(`/users/${uid}/`);
}
//완료
export async function updateUserImage(data) {
  return await formInstance.patch(`/users/${data.uid}/image/`, {
    image: data.image[0],
  });
}
