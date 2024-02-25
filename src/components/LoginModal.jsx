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
import { FaUserNinja, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { emailLogIn } from "../services/auth";
import { useAuthStore } from "../stores/auth";

export default function LoginModal({ isOpen, onClose }) {
  const { setUser, setToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: emailLogIn,
    onSuccess: (response) => {
      setUser(response);
      setToken(response.access, response.refresh);
      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
      reset();
    },
  });
  const onSubmit = ({ email, password }) => {
    mutation.mutate({ email, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
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
            <InputGroup>
              <InputLeftElement>
                {
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
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
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
