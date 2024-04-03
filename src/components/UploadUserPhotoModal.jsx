/* eslint-disable no-unused-vars */
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateUserImage } from "../services";
import { useAuthStore } from "../stores/auth";

export default function UploadUserPhotoModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { updateuser, getUid } = useAuthStore();
  const uid = getUid();
  const toast = useToast();
  const updatePhotoMutation = useMutation({
    mutationFn: updateUserImage,
    onSuccess: (response) => {
      updateuser({ image: response.data.image });
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
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
    updatePhotoMutation.reset(); // Mutation을 초기 상태로 되돌림
  });
  const onSubmit = () => {
    updatePhotoMutation.mutate({ image: watch("image"), uid });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload a Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <FormControl>
                <Input {...register("image")} type="file" accept="image/*" />
              </FormControl>
            </InputGroup>
          </VStack>
          <Button
            isLoading={updatePhotoMutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
          >
            Upload Photo
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
