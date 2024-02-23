import { atom, selector } from "recoil";
const loginState = atom({
  key: "loginState",
  default: localStorage.get("access") ? true : false,
});

export const isLoginState = selector({
  key: "isLoginState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const isLogin = get(loginState);
    return isLogin;
  },
});
