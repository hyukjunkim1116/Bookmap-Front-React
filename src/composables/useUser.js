import { useRecoilValue } from "recoil";
import { isLoginState } from "../state/auth";

export default function useUser() {
  const isLogin = useRecoilValue(isLoginState);
  return {
    user: localStorage.getItem("auth/user"),
    isLoggedIn: isLogin,
  };
}
