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
  Flex,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { FaRocketchat } from "react-icons/fa";
import { useChatWebSocket } from "../services/chat";
import { useAuthStore } from "../stores/auth";
import { generateDefaultPhotoURL } from "../services";
export default function ChatModal({ isOpen, onClose }) {
  const { getUid } = useAuthStore();
  const uid = getUid();
  const { newMessage, message, setMessage, sendJsonMessage } =
    useChatWebSocket(uid);
  console.log(newMessage, "message");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = ({ message }) => {
    sendJsonMessage({ message });
    reset();
  };

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
            {newMessage.map((message) => (
              <Flex align="center" mt={2} key={message.id}>
                <Avatar
                  size="sm"
                  src={
                    message.sender_image ||
                    generateDefaultPhotoURL(message.sender_id)
                  }
                />

                <Box ml={2}>
                  <Text fontWeight="bold">{message.sender}</Text>
                  <Text fontSize="sm">{message.content}</Text>
                </Box>
                <Spacer />
                <Text fontSize="xs" color="gray.500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </Flex>
            ))}
          </Box>
          <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup size={"md"}>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaRocketchat />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.message?.message)}
                {...register("message", {
                  required: "Please write a message",
                })}
                variant={"filled"}
                placeholder="Send Your Message"
              />
            </InputGroup>

            <Button type="submit" mt={4} colorScheme={"red"} w="100%">
              Send
            </Button>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
}
