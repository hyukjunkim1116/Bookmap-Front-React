/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailConfirm() {
  const { updateuser } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();
  const confirmEmail = () => {
    updateuser({ is_verified: true });
    toast({
      status: "success",
      title: "Welcome!",
      position: "bottom",
      description: "Email Verified!",
    });
    navigate("/");
  };
  useEffect(() => {
    confirmEmail();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing verify...</Heading>
      <Text>Don&apos;t go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
