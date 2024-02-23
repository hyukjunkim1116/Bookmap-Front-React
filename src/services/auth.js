import Cookie from "js-cookie";
import { jwtInstance, formInstance } from "../utils/jwtInterceptor";
import { jwtDecode } from "jwt-decode";
const DEFAULT_PHOTO_URL =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=";
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}
export const emailSignUp = (data) => {
  return jwtInstance.post("users/", data);
};

// logOut 함수의 타입 정의
export const logOut = () => {
  Cookie.remove("access");
  Cookie.remove("refresh");
  localStorage.removeItem("auth/user");
};

export const emailLogIn = (data) => {
  const response = jwtInstance.post("users/login/", data);
  const { access, refresh, email, username, image, social, is_verified } =
    response.data;
  const { user_id } = jwtDecode(access).payload.user_id;
  localStorage.setItem("auth/user", {
    uid: user_id,
    email: email,
    username: username,
    image: image || generateDefaultPhotoURL(user_id),
    social: social,
    emailVerified: is_verified,
  });
  Cookie.set("access", access);
  Cookie.set("refresh", refresh);
};
export const kakaoLogin = (data) => {
  const response = jwtInstance.post(`users/kakao/`, data);
  const { access, refresh, email, username, image, social, is_verified } =
    response.data;
  const { user_id } = jwtDecode(access).payload.user_id;
  localStorage.setItem("auth/user", {
    uid: user_id,
    email: email,
    username: username,
    image: image || generateDefaultPhotoURL(user_id),
    social: social,
    emailVerified: is_verified,
  });
  Cookie.set("access", access);
  Cookie.set("refresh", refresh);
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
export async function updateUserImage(data, uid) {
  return await formInstance.patch(`users/${uid}/image`, data);
}
