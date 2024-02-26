import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../services";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const response = await kakaoLogin(code);
      toast({
        status: "success",
        title: "Welcome!",
        position: "bottom-right",
        description: "Happy to have you back!",
      });
      setUser(response);
      setToken(response.access, response.refresh);
      navigate("/");
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don&apos;t go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
