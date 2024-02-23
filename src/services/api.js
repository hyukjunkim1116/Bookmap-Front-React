import Cookie from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
  withCredentials: true,
});

// getMe 함수의 타입 정의
export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

// logOut 함수의 타입 정의
export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

// usernameLogIn 함수의 타입 정의
export const usernameLogIn = ({ username, password }) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
