import { jwtInstance, axiosInstance } from "../utils/jwtInterceptor";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";
const DEFAULT_PHOTO_URL =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=";
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}

export const logOut = () => {
  Cookie.remove("access");
  Cookie.remove("refresh");
};
export const emailSignUp = (data) => {
  jwtInstance.post("users/", data).then((response) => response.data);
};

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
    userImage,
    social,
    is_verified,
  };
};
export const kakaoLogin = async (data) => {
  const response = await jwtInstance.post(`users/kakao/`, data);
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

export async function updateUserPassword(data) {
  return await jwtInstance.put(`users/change-password/`, data);
}
export async function sendVerificationEmail(uid) {
  return await jwtInstance.post(`users/${uid}/verify/`);
}

export async function findPasswordWithEmail(data) {
  return await jwtInstance.put(`users/find-password/`, data);
}
export async function updateUserProfile(data, uid) {
  return await jwtInstance.put(`users/${uid}/`, data);
}
export async function deleteUser(uid) {
  return await jwtInstance.delete(`users/${uid}/`);
}
// export async function updateUserImage(data, uid) {
//   return await formInstance.patch(`users/${uid}/image`, data);
// }
