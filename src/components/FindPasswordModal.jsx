/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { findPasswordWithEmail } from "../services/auth";
import { useAuthStore } from "../stores/auth";
import { useEffect, useState } from "react";
export default function FindPasswordModal({ isOpen, onClose }) {
  const { setUser, setToken } = useAuthStore();
  const [newPassword, setNewPassword] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: findPasswordWithEmail,
    onSuccess: (response) => {
      setNewPassword(response.password);
      
      toast({
        title: "Confirm Your password!",
        status: "success",
      });
      reset();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  useEffect(() => {
    mutation.reset(); // Mutation을 초기 상태로 되돌림
  }, []);
  const onSubmit = ({ email }) => {
    mutation.mutate({ email });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Find Password</ModalHeader>
        <ModalCloseButton />
        {!newPassword ? (
          <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <InputGroup size={"md"}>
                <InputLeftElement>
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                </InputLeftElement>
                <Input
                  isInvalid={Boolean(errors.email?.message)}
                  {...register("email", {
                    required: "Please write a email",
                  })}
                  variant={"filled"}
                  placeholder="Email"
                />
              </InputGroup>
            </VStack>
            {mutation.isError ? (
              <Text color="red.500" textAlign={"center"} fontSize="sm">
                {console.log(mutation.error)}
              </Text>
            ) : null}
            <Button
              isLoading={mutation.isLoading}
              type="submit"
              mt={4}
              colorScheme={"red"}
              w="100%"
            >
              Find Password
            </Button>
          </ModalBody>
        ) : (
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaLock />
                </Box>
              </InputLeftElement>
              <Input readOnly value={newPassword || null} />
            </InputGroup>
          </VStack>
        )}
      </ModalContent>
    </Modal>
  );
}
