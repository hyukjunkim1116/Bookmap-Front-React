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
  VStack,
} from "@chakra-ui/react";
import { FaRocketchat } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { emailLogIn } from "../services/auth";
import { useEffect } from "react";
export default function ChatModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const mutation = useMutation({
    mutationFn: emailLogIn,
    onSuccess: (response) => {
      reset();
    },
  });
  const onSubmit = () => {
    mutation.mutate();
  };
  useEffect(() => {
    mutation.reset(); // Mutation을 초기 상태로 되돌림
  }, []);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Box p={4} borderWidth="1px" borderRadius="md">
          <ModalHeader>Chat</ModalHeader>
          <Box
            minHeight="200px"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            overflowY="auto"
          >
            <Text>This is a chat message</Text>
          </Box>
          <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup size={"md"}>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaRocketchat />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.chat?.message)}
                {...register("chat", {
                  required: "Please write a chat",
                })}
                variant={"filled"}
                placeholder="Send Your Chat"
              />
            </InputGroup>
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
              Send
            </Button>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
}
